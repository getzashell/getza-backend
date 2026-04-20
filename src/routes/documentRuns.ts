import Ajv from 'ajv';
import { Prisma, ProductStatus, Role, DocumentStatus } from '@prisma/client';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import prisma from '../db';
import { renderTemplateVersion, validateTemplateVersion, normalizeLegend } from '../services/templateRenderer';
import { requireAuth } from '../middleware/auth';

const router = Router();
const ajv = new Ajv({ allErrors: true, strict: false });

function buildDraftContent(inputPayload: Record<string, any>, templateName: string) {
  const applicantName = inputPayload.fullName || inputPayload.name || 'Applicant';
  return {
    title: `${templateName} draft`,
    summary: `Draft generated for ${applicantName}. Review all fields before finalizing.`,
    sections: [
      { heading: 'Party', content: applicantName },
      { heading: 'Details', content: inputPayload },
    ],
  };
}

router.post('/', requireAuth, async (req, res) => {
  const { templateId, inputPayload } = req.body;
  const userId = req.user?.id;
  if (!templateId || !inputPayload) {
    return res.status(400).json({ error: 'templateId and inputPayload are required' });
  }

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: {
        product: true,
        versions: { where: { isActive: true }, orderBy: { version: 'desc' }, take: 1 },
      },
    });

    const activeVersion = template?.versions?.[0];
    if (!template || !activeVersion || template.product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Template or active version not found' });
    }

    let validate;
    try {
      const schema = activeVersion.inputSchemaJson as Record<string, any>;
      validate = ajv.compile(schema);
    } catch (err) {
      console.error('Invalid input schema for template', err);
      return res.status(500).json({ error: 'Invalid input schema for template' });
    }

    const valid = validate(inputPayload);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid input payload', details: validate.errors });
    }

    const payload = inputPayload as Record<string, any>;
    const draftContent = buildDraftContent(payload, template.name);

    const run = await prisma.documentRun.create({
      data: {
        userId,
        templateVersionId: activeVersion.id,
        inputPayload: payload as Prisma.InputJsonValue,
        draftContent: draftContent as Prisma.InputJsonValue,
      },
      include: {
        templateVersion: {
          select: {
            id: true,
            version: true,
            outputFormat: true,
            promptTemplate: true,
            templateId: true,
          },
        },
      },
    });

    return res.status(201).json(run);
  } catch (err) {
    console.error('Failed to create document run', err);
    return res.status(500).json({ error: 'Failed to create document run' });
  }
});

router.post('/start', requireAuth, async (req, res) => {
  const { templateId } = req.body as { templateId?: string };
  const userId = req.user?.id;
  if (!templateId) return res.status(400).json({ error: 'templateId is required' });
  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { product: true, versions: { where: { isActive: true }, orderBy: { version: 'desc' }, take: 1 } },
    });
    const activeVersion = template?.versions?.[0];
    if (!template || !activeVersion || template.product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Template or active version not found' });
    }

    const run = await prisma.documentRun.create({
      data: {
        userId,
        templateVersionId: activeVersion.id,
        inputPayload: {} as Prisma.InputJsonValue,
        draftContent: Prisma.JsonNull,
        status: DocumentStatus.DRAFT,
      },
      include: {
        templateVersion: {
          include: { template: { include: { product: true } } },
        },
      },
    });
    return res.status(201).json(run);
  } catch (err) {
    console.error('Failed to start run', err);
    return res.status(500).json({ error: 'Failed to start run' });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const runs = await prisma.documentRun.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        templateVersion: {
          include: {
            template: {
              include: { product: true },
            },
          },
        },
      },
    });

    const filtered = runs
      .filter((run) => run.templateVersion.template.product.status === ProductStatus.PUBLISHED)
      .map((run) => ({
        ...run,
        templateVersion: {
          ...run.templateVersion,
          placeholderLegend: normalizeLegend(run.templateVersion.placeholderLegend),
        },
      }));
    return res.json(filtered);
  } catch (err) {
    console.error('Failed to list document runs', err);
    return res.status(500).json({ error: 'Failed to fetch document runs' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const run = await prisma.documentRun.findUnique({
      where: { id: req.params.id },
      include: {
        templateVersion: {
          include: { template: { include: { product: true } } },
        },
      },
    });

    if (!run) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (run.templateVersion.template.product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (run.userId && run.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json({
      ...run,
      templateVersion: {
        ...run.templateVersion,
        placeholderLegend: normalizeLegend(run.templateVersion.placeholderLegend),
      },
    });
  } catch (err) {
    console.error('Failed to fetch document run', err);
    return res.status(500).json({ error: 'Failed to fetch document run' });
  }
});

router.post('/:id/render-draft', requireAuth, async (req, res) => {
  const runId = req.params.id;
  const { inputPayload } = req.body as { inputPayload?: any };
  try {
    const run = await prisma.documentRun.findUnique({
      where: { id: runId },
      include: {
        templateVersion: true,
      },
    });
    if (!run) return res.status(404).json({ error: 'Not found' });
    if (run.userId !== req.user?.id && req.user?.role !== Role.ADMIN) return res.status(403).json({ error: 'Forbidden' });

    const payloadToUse = inputPayload ?? run.inputPayload;
    const validation = validateTemplateVersion(run.templateVersion, payloadToUse as any);
    if (validation.issues.length) {
      return res.status(400).json({ error: 'Validation failed', validation });
    }

    const { rendered } = renderTemplateVersion(run.templateVersion, payloadToUse as any);
    const draftContent = {
      renderedText: rendered,
      payload: payloadToUse,
    } as Prisma.InputJsonValue;

    const updated = await prisma.documentRun.update({
      where: { id: runId },
      data: { inputPayload: payloadToUse as Prisma.InputJsonValue, draftContent },
    });

    return res.json(updated);
  } catch (err: any) {
    console.error('Render draft failed', err?.message || err);
    return res.status(500).json({ error: 'Failed to render draft' });
  }
});

router.post('/:id/finalize', requireAuth, async (req, res) => {
  const runId = req.params.id;
  const { inputPayload } = req.body as { inputPayload?: any };
  try {
    const run = await prisma.documentRun.findUnique({
      where: { id: runId },
      include: {
        templateVersion: true,
      },
    });
    if (!run) return res.status(404).json({ error: 'Not found' });
    if (run.userId !== req.user?.id && req.user?.role !== Role.ADMIN) return res.status(403).json({ error: 'Forbidden' });

    const payloadToUse = inputPayload ?? run.inputPayload;
    const validation = validateTemplateVersion(run.templateVersion, payloadToUse as any);
    if (validation.issues.length) {
      return res.status(400).json({ error: 'Validation failed', validation });
    }

    const { rendered } = renderTemplateVersion(run.templateVersion, payloadToUse as any);
    const finalContent = {
      renderedText: rendered,
      payload: payloadToUse,
    } as Prisma.InputJsonValue;

    // Stub export: write text file to local temp dir
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });
    const filePath = path.join(exportDir, `${runId}.txt`);
    fs.writeFileSync(filePath, rendered || '');

    const updated = await prisma.documentRun.update({
      where: { id: runId },
      data: { inputPayload: payloadToUse as Prisma.InputJsonValue, finalContent, status: DocumentStatus.FINALIZED },
    });

    return res.json({ ...updated, exportPath: filePath });
  } catch (err: any) {
    console.error('Finalize run failed', err?.message || err);
    return res.status(500).json({ error: 'Failed to finalize document' });
  }
});

router.put('/:id/input', requireAuth, async (req, res) => {
  const runId = req.params.id;
  const { inputPayload } = req.body as { inputPayload?: any };
  if (!inputPayload) return res.status(400).json({ error: 'inputPayload required' });
  try {
    const run = await prisma.documentRun.findUnique({ where: { id: runId } });
    if (!run) return res.status(404).json({ error: 'Not found' });
    if (run.userId !== req.user?.id && req.user?.role !== Role.ADMIN) return res.status(403).json({ error: 'Forbidden' });

    const updated = await prisma.documentRun.update({
      where: { id: runId },
      data: { inputPayload: inputPayload as Prisma.InputJsonValue },
    });
    return res.json(updated);
  } catch (err) {
    console.error('Failed to save input', err);
    return res.status(500).json({ error: 'Failed to save input' });
  }
});

router.get('/:id/download', requireAuth, async (req, res) => {
  const runId = req.params.id;
  const type = (req.query.type as string | undefined) || 'TXT';
  try {
    const run = await prisma.documentRun.findUnique({
      where: { id: runId },
      include: { templateVersion: { include: { template: true } } },
    });
    if (!run) return res.status(404).json({ error: 'Not found' });
    if (run.userId !== req.user?.id && req.user?.role !== Role.ADMIN) return res.status(403).json({ error: 'Forbidden' });

    if (type !== 'TXT') return res.status(400).json({ error: 'Only TXT download supported' });
    const exportDir = path.join(process.cwd(), 'exports');
    const filePath = path.join(exportDir, `${runId}.txt`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
    const filename = `getza_${run.templateVersion.template.name}_${run.templateVersion.template.jurisdiction}_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`.replace(/\s+/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'text/plain');
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    console.error('Download failed', err);
    return res.status(500).json({ error: 'Failed to download' });
  }
});

export default router;
