import { PrismaClient, ProductStatus, ProductType, OutputFormat } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

const legendBase = [
  { path: 'party.discloser.name', label: 'Discloser name', type: 'string', required: true, example: 'Acme Ltd' },
  { path: 'party.discloser.address', label: 'Discloser address', type: 'text', required: false, example: '12 High St, London' },
  { path: 'party.recipient.name', label: 'Recipient name', type: 'string', required: true, example: 'Beta LLC' },
  { path: 'party.recipient.address', label: 'Recipient address', type: 'text', required: false, example: '100 Main St, New York' },
  { path: 'purpose.description', label: 'Purpose of disclosure', type: 'text', required: true, example: 'Evaluate a potential partnership' },
  { path: 'terms.termYears', label: 'Confidentiality term (years)', type: 'number', required: true, example: 3 },
  { path: 'dates.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2024-01-01' },
  { path: 'governingLaw.jurisdiction', label: 'Governing law', type: 'string', required: true, example: 'England & Wales' },
  { path: 'signatures.discloserSignerName', label: 'Discloser signer name', type: 'string', required: true, example: 'Alice Smith' },
  { path: 'signatures.recipientSignerName', label: 'Recipient signer name', type: 'string', required: true, example: 'Bob Jones' },
] as const;

const bodyTemplateCommon = `
{{!-- Mutual NDA Template --}}

Title: Mutual Non-Disclosure Agreement
Version: 1
Jurisdiction: {{governingLaw.jurisdiction}}
Effective Date: {{dates.effectiveDate}}

1. Parties and Purpose
This Mutual Non-Disclosure Agreement (the "Agreement") is between {{party.discloser.name}} ("Discloser") and {{party.recipient.name}} ("Recipient"). The parties intend to share confidential information solely to: {{purpose.description}}.

2. Definition of Confidential Information
"Confidential Information" means non-public information disclosed by either party that is designated as confidential or would reasonably be understood as confidential given its nature and the circumstances of disclosure.

3. Exclusions
Confidential Information does not include information that: (a) is or becomes public without breach; (b) was known to the receiving party without restriction before disclosure; (c) is received lawfully from a third party without restriction; or (d) is independently developed without use of the other party's Confidential Information.

4. Permitted Use and Disclosure
The receiving party may use Confidential Information only for the Purpose and may disclose it only to its employees and advisors who need to know for that Purpose and are bound by confidentiality obligations at least as protective as this Agreement.

5. Protection and Return
The receiving party must protect Confidential Information using reasonable care. Upon request, the receiving party will return or securely destroy Confidential Information and confirm destruction, subject to routine backup retention and legal requirements.

6. Term and Duration of Obligations
This Agreement starts on the Effective Date. Confidentiality obligations continue for {{terms.termYears}} years after disclosure, except for trade secrets which remain protected as long as they qualify as trade secrets under applicable law.

7. Remedies
Unauthorized disclosure or use may cause irreparable harm. The disclosing party is entitled to seek injunctive relief and any other remedies available at law or in equity.

8. Governing Law and Disputes
This Agreement is governed by the laws of {{governingLaw.jurisdiction}}. The parties will seek to resolve disputes in good faith discussions before resorting to formal proceedings.

9. Notices
Notices must be in writing and sent to the addresses below or updated addresses provided in writing.
Discloser address: {{party.discloser.address}}
Recipient address: {{party.recipient.address}}

10. Signatures

Discloser: {{party.discloser.name}}
By: {{signatures.discloserSignerName}}
Date: {{dates.effectiveDate}}

Recipient: {{party.recipient.name}}
By: {{signatures.recipientSignerName}}
Date: {{dates.effectiveDate}}

Notes: Template document. Not legal advice. Local law may require additional steps; no liquidated damages or non-compete terms are included by default.
`.trim();

const jurisdictionBody = {
  UK: bodyTemplateCommon.replace('{{governingLaw.jurisdiction}}', 'England & Wales'),
  US: bodyTemplateCommon.replace('{{governingLaw.jurisdiction}}', 'New York'),
  EU: bodyTemplateCommon.replace('{{governingLaw.jurisdiction}}', 'Ireland'),
};


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const product = await prisma.product.upsert({
    where: { slug: 'mutual-nda' },
    update: { status: ProductStatus.PUBLISHED },
    create: {
      slug: 'mutual-nda',
      title: 'Mutual NDA / Confidentiality Agreement',
      category: 'Business',
      type: ProductType.SINGLE,
      status: ProductStatus.PUBLISHED,
    },
  });

  const jurisdictions: Array<'UK' | 'US' | 'EU'> = ['UK', 'US', 'EU'];

  for (const jurisdiction of jurisdictions) {
    let template = await prisma.template.findFirst({
      where: { productId: product.id, jurisdiction, name: 'Mutual NDA' },
    });
    if (!template) {
      template = await prisma.template.create({
        data: {
          productId: product.id,
          jurisdiction,
          name: 'Mutual NDA',
          description: 'Balanced confidentiality terms for ' + jurisdiction,
        },
      });
    }

    const existingActive = await prisma.templateVersion.findFirst({
      where: { templateId: template.id, isActive: true },
      orderBy: { version: 'desc' },
    });
    if (existingActive) {
      console.log(`Template ${template.id} (${jurisdiction}) already has active version ${existingActive.id}, skipping.`);
      continue;
    }

    const bodyTemplate = jurisdictionBody[jurisdiction] || bodyTemplateCommon;
    const placeholderLegend = { version: 1, items: legendBase as unknown as any[] };

    const version = await prisma.templateVersion.create({
      data: {
        version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
        rendererType: 'HANDLEBARS',
        outputFormat: OutputFormat.PDF,
        inputSchemaJson: {},
        placeholderLegend,
        bodyTemplate,
        promptTemplate: '',
      },
    });

    const buildSamplePayload = () => {
      const payload: Record<string, any> = {};
      (placeholderLegend.items as any[]).forEach((item: any) => {
        let val = (item as any).example;
        if (val === undefined || val === null || val === '') {
          switch ((item as any).type) {
            case 'number':
            case 'money':
              val = 1;
              break;
            case 'boolean':
              val = true;
              break;
            case 'date':
              val = '2025-01-01';
              break;
            case 'enum':
              val = (item as any).rules?.options?.[0] || 'OPTION';
              break;
            default:
              val = 'Example';
          }
        }
        payload[(item as any).path] = val;
      });
      return payload;
    };

    const samplePayload = buildSamplePayload();
    const validation = validateTemplateVersion(version, samplePayload);
    if (validation.issues.length) {
      throw new Error(`Validation failed for ${jurisdiction}: ${JSON.stringify(validation.issues)}`);
    }

    await prisma.templateVersion.update({
      where: { id: version.id },
      data: { lastValidatedAt: new Date(), lastValidationErrors: [] },
    });

    console.log(
      `Seeded ${jurisdiction}: template=${template.id}, version=${version.id}, legendItems=${legendBase.length}`
    );
  }

  console.log(`Product seeded: ${product.id} (${product.slug})`);
}

seed()
  .catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
