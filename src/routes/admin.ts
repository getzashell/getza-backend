import { Router } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../db';
import { getOrCreateAppSettings } from '../services/settings';
import { requireAdmin } from '../middleware/auth';
import { renderTemplateVersion, validateTemplateVersion } from '../services/templateRenderer';

const router = Router();

router.get('/settings', requireAdmin, async (_req, res) => {
  try {
    const settings = await getOrCreateAppSettings();
    return res.json({ developerMode: settings.developerMode });
  } catch (err) {
    console.error('Failed to fetch settings', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', requireAdmin, async (req, res) => {
  const { developerMode } = req.body as { developerMode?: boolean };
  if (developerMode === undefined) return res.status(400).json({ error: 'developerMode is required' });

  try {
    const current = await getOrCreateAppSettings();
    const updated = await prisma.appSetting.update({
      where: { id: current.id },
      data: { developerMode: !!developerMode },
    });
    return res.json({ developerMode: updated.developerMode });
  } catch (err) {
    console.error('Failed to update settings', err);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

router.post('/templates/validate', requireAdmin, async (req, res) => {
  const { templateVersionId } = req.body as { templateVersionId?: string };
  if (!templateVersionId) return res.status(400).json({ error: 'templateVersionId is required' });

  try {
    const version = await prisma.templateVersion.findUnique({ where: { id: templateVersionId } });
    if (!version) return res.status(404).json({ error: 'TemplateVersion not found' });

    const validation = validateTemplateVersion(version, {});
    const hasErrors = validation.issues.length > 0;

    await prisma.templateVersion.update({
      where: { id: templateVersionId },
      data: {
        lastValidatedAt: new Date(),
        lastValidationErrors: hasErrors ? (validation as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });

    return res.json({ valid: !hasErrors, validation });
  } catch (err) {
    console.error('Template validation failed', err);
    return res.status(500).json({ error: 'Validation failed' });
  }
});

router.post('/templates/preview', requireAdmin, async (req, res) => {
  const { templateVersionId, inputPayload } = req.body as { templateVersionId?: string; inputPayload?: any };
  if (!templateVersionId) return res.status(400).json({ error: 'templateVersionId is required' });

  try {
    const version = await prisma.templateVersion.findUnique({ where: { id: templateVersionId } });
    if (!version) return res.status(404).json({ error: 'TemplateVersion not found' });

    const { rendered, validation } = renderTemplateVersion(version, inputPayload || {});
    return res.json({ renderedText: rendered, validation });
  } catch (err: any) {
    console.error('Template preview failed', err?.message);
    return res.status(400).json({ error: err?.message || 'Preview failed', validation: err?.validation });
  }
});

export default router;
