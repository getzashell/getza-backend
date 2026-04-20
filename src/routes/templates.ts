import { ProductStatus } from '@prisma/client';
import { Router } from 'express';
import prisma from '../db';
import { normalizeLegend } from '../services/templateRenderer';

const router = Router();

router.get('/:templateId/active-version', async (req, res) => {
  const { templateId } = req.params;
  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: {
        product: true,
        versions: {
          where: { isActive: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });
    if (!template || template.product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Not found' });
    }
    const activeVersion = template.versions[0];
    if (!activeVersion) return res.status(404).json({ error: 'No active version' });

    return res.json({
      templateId: template.id,
      name: template.name,
      jurisdiction: template.jurisdiction,
      productId: template.productId,
      productTitle: template.product.title,
      activeVersion: {
        id: activeVersion.id,
        version: activeVersion.version,
        inputSchemaJson: activeVersion.inputSchemaJson,
        placeholderLegend: normalizeLegend(activeVersion.placeholderLegend),
        rendererType: activeVersion.rendererType,
        outputFormat: activeVersion.outputFormat,
      },
    });
  } catch (err) {
    console.error('Failed to fetch active version', err);
    return res.status(500).json({ error: 'Failed to fetch template version' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const templates = await prisma.template.findMany({
      where: { product: { status: ProductStatus.PUBLISHED } },
      include: {
        product: true,
        versions: {
          where: { isActive: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const withActive = templates
      .map((template) => ({
        id: template.id,
        name: template.name,
        jurisdiction: template.jurisdiction,
        description: template.description,
        productId: template.productId,
        productTitle: template.product.title,
        activeVersion: template.versions[0],
      }))
      .filter((t) => !!t.activeVersion);

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json(withActive);
  } catch (err) {
    console.error('Failed to list templates', err);
    return res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

router.get('/:templateId', async (req, res) => {
  const { templateId } = req.params;

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: {
        product: {
          include: { stripePrices: { where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 1 } },
        },
        versions: {
          where: { isActive: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    if (!template || template.product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Not found' });
    }

    const activeVersion = template.versions[0];
    if (!activeVersion) {
      return res.status(404).json({ error: 'No active version available for this template' });
    }

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({
      id: template.id,
      name: template.name,
      jurisdiction: template.jurisdiction,
      description: template.description,
      productId: template.productId,
      product: {
        id: template.product.id,
        slug: template.product.slug,
        title: template.product.title,
        category: template.product.category,
        price: template.product.stripePrices[0]
          ? {
              currency: template.product.stripePrices[0].currency,
              unitAmount: template.product.stripePrices[0].unitAmount,
              recurringInterval: template.product.stripePrices[0].recurringInterval,
              stripePriceId: template.product.stripePrices[0].stripePriceId,
            }
          : null,
      },
      activeVersion,
    });
  } catch (err) {
    console.error('Failed to fetch template', err);
    return res.status(500).json({ error: 'Failed to fetch template' });
  }
});

export default router;
