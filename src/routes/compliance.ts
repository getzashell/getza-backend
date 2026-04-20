import { Router } from 'express';
import {
  getGlobalCompliance,
  getTemplateComplianceByNumber,
  loadCompliance,
  getComplianceForProductOrTemplate,
} from '../compliance/complianceLoader';
import prisma from '../db';

const router = Router();

router.get('/global', (_req, res) => {
  return res.json(getGlobalCompliance());
});

router.get('/templates', (_req, res) => {
  const data = loadCompliance();
  return res.json(data.templates.map((t) => ({ id: t.id, templateName: t.templateName })));
});

router.get('/templates/:id', (req, res) => {
  const id = Number(req.params.id);
  const jurisdiction = (req.query.jurisdiction as string | undefined)?.toUpperCase();
  const template = getTemplateComplianceByNumber(id);
  if (!template) return res.status(404).json({ error: 'Not found' });
  if (!jurisdiction || !['UK', 'US', 'EU'].includes(jurisdiction)) {
    return res.json(template);
  }
  const block = template.jurisdictions[jurisdiction as 'UK' | 'US' | 'EU'];
  return res.json({
    id: template.id,
    templateName: template.templateName,
    jurisdiction,
    mustInclude: block?.mustInclude || [],
    mustNotInclude: block?.mustNotInclude || [],
    notes: block?.notes,
  });
});

router.get('/templates-by-product/:templateId', async (req, res) => {
  const { templateId } = req.params;
  const jurisdiction = (req.query.jurisdiction as string | undefined)?.toUpperCase() as 'UK' | 'US' | 'EU' | undefined;

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { product: true },
    });
    if (!template) return res.status(404).json({ error: 'Not found' });

    const match = getComplianceForProductOrTemplate({
      productTitle: template.product.title,
      templateName: template.name,
      jurisdiction,
    });
    return res.json({ templateId, productTitle: template.product.title, templateName: template.name, ...match });
  } catch (err) {
    console.error('Compliance lookup failed', err);
    return res.status(500).json({ error: 'Failed to fetch compliance' });
  }
});

export default router;
