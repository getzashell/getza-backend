import { Router } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../db';
import { requireAdmin } from '../middleware/auth';
import { parseLegend, extractPlaceholders, normalizeLegend } from '../services/templateRenderer';

const router = Router();

const buildTemplateList = async () => {
  const products = await prisma.product.findMany({
    include: {
      templates: {
        include: {
          versions: {
            where: { isActive: true },
            orderBy: { version: 'desc' },
            take: 1,
          },
        },
      },
    },
    orderBy: { title: 'asc' },
  });

  return products.map((product) => ({
    product: {
      id: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      subcategory: product.subcategory,
      status: product.status,
    },
    templates: product.templates.map((t) => ({
      template: { id: t.id, name: t.name, jurisdiction: t.jurisdiction, productId: t.productId },
      activeVersion: t.versions[0]
        ? {
            id: t.versions[0].id,
            version: t.versions[0].version,
            lastValidatedAt: t.versions[0].lastValidatedAt,
            lastValidationErrors: t.versions[0].lastValidationErrors,
          }
        : null,
    })),
  }));
};

router.get('/templates', requireAdmin, async (_req, res) => {
  try {
    const list = await buildTemplateList();
    return res.json(list);
  } catch (err) {
    console.error('Failed to list templates', err);
    return res.status(500).json({ error: 'Failed to list templates' });
  }
});

router.get('/template-versions/:id', requireAdmin, async (req, res) => {
  try {
    const version = await prisma.templateVersion.findUnique({
      where: { id: req.params.id },
      include: {
        template: { include: { product: true } },
      },
    });
    if (!version) return res.status(404).json({ error: 'Not found' });
    return res.json({
      ...version,
      placeholderLegend: normalizeLegend(version.placeholderLegend),
    });
  } catch (err) {
    console.error('Failed to fetch template version', err);
    return res.status(500).json({ error: 'Failed to fetch template version' });
  }
});

router.put('/template-versions/:id', requireAdmin, async (req, res) => {
  const { bodyTemplate, placeholderLegend, inputSchemaJson, outputFormat } = req.body;
  try {
    const version = await prisma.templateVersion.findUnique({ where: { id: req.params.id } });
    if (!version) return res.status(404).json({ error: 'Not found' });

    if (placeholderLegend) {
      parseLegend(placeholderLegend);
    }
    const legendToUse = placeholderLegend ?? version.placeholderLegend;
    const placeholders = extractPlaceholders(bodyTemplate ?? version.bodyTemplate);
    const legendPaths = new Set(parseLegend(legendToUse).items.map((i) => i.path));
    const invalid = placeholders.filter((p) => !legendPaths.has(p));
    if (invalid.length) {
      return res.status(400).json({
        error: 'Unknown placeholders in bodyTemplate',
        details: invalid.map((p) => ({ path: p, message: 'Not present in legend' })),
      });
    }

    const updated = await prisma.templateVersion.update({
      where: { id: req.params.id },
      data: {
        ...(bodyTemplate !== undefined ? { bodyTemplate } : {}),
        ...(placeholderLegend !== undefined
          ? {
              placeholderLegend:
                placeholderLegend === null ? Prisma.JsonNull : (placeholderLegend as Prisma.InputJsonValue),
            }
          : {}),
        ...(inputSchemaJson !== undefined
          ? { inputSchemaJson: inputSchemaJson === null ? Prisma.JsonNull : (inputSchemaJson as Prisma.InputJsonValue) }
          : {}),
        ...(outputFormat !== undefined ? { outputFormat } : {}),
      },
    });

    return res.json(updated);
  } catch (err: any) {
    console.error('Failed to update template version', err);
    return res.status(400).json({ error: err?.message || 'Failed to update template version' });
  }
});

router.post('/templates/:templateId/versions', requireAdmin, async (req, res) => {
  const { templateId } = req.params;
  try {
    const latest = await prisma.templateVersion.findFirst({
      where: { templateId },
      orderBy: { version: 'desc' },
    });
    if (!latest) return res.status(404).json({ error: 'No versions to clone' });

    const newVersion = await prisma.templateVersion.create({
      data: {
        templateId,
        version: latest.version + 1,
        isActive: false,
        inputSchemaJson: latest.inputSchemaJson as Prisma.InputJsonValue,
        placeholderLegend: latest.placeholderLegend as Prisma.InputJsonValue,
        bodyTemplate: latest.bodyTemplate,
        rendererType: latest.rendererType,
        outputFormat: latest.outputFormat,
        promptTemplate: latest.promptTemplate,
      },
    });
    return res.status(201).json(newVersion);
  } catch (err) {
    console.error('Failed to create new version', err);
    return res.status(500).json({ error: 'Failed to create version' });
  }
});

router.post('/template-versions/:id/set-active', requireAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const version = await prisma.templateVersion.findUnique({ where: { id } });
    if (!version) return res.status(404).json({ error: 'Not found' });
    const legend = normalizeLegend(version.placeholderLegend);
    if (!legend.items.length || !version.bodyTemplate) {
      return res.status(400).json({
        error: 'Template not fully configured',
        details: 'Legend/items or bodyTemplate missing',
        code: 'LEGEND_MISSING',
      });
    }

    await prisma.templateVersion.updateMany({
      where: { templateId: version.templateId },
      data: { isActive: false },
    });
    const updated = await prisma.templateVersion.update({
      where: { id },
      data: { isActive: true },
    });
    return res.json(updated);
  } catch (err) {
    console.error('Failed to set active version', err);
    return res.status(500).json({ error: 'Failed to set active version' });
  }
});

router.post('/templates', requireAdmin, async (req, res) => {
  const { productId, name, jurisdiction, description } = req.body;
  if (!productId || !name || !jurisdiction) return res.status(400).json({ error: 'productId, name, jurisdiction required' });
  try {
    const template = await prisma.template.create({
      data: {
        productId,
        name,
        jurisdiction,
        description,
        versions: {
          create: {
            version: 1,
            isActive: true,
            inputSchemaJson: {} as Prisma.InputJsonValue,
            placeholderLegend: { version: 1, items: [] } as Prisma.InputJsonValue,
            bodyTemplate: '',
            promptTemplate: '',
            outputFormat: 'PDF',
            rendererType: 'HANDLEBARS',
          },
        },
      },
      include: { versions: true },
    });
    return res.status(201).json(template);
  } catch (err) {
    console.error('Failed to create template', err);
    return res.status(500).json({ error: 'Failed to create template' });
  }
});

export default router;
