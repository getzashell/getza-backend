import { OutputFormat, PrismaClient, ProductStatus, ProductType } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

type LegendItem = {
  path: string;
  label: string;
  type: string;
  required?: boolean;
  example?: any;
  description?: string;
  rules?: { options?: string[] };
};

const legendItems: LegendItem[] = [
  { path: 'party.employer.name', label: 'Employer name', type: 'string', required: true, example: 'Acme Ltd' },
  { path: 'party.employer.address', label: 'Employer address', type: 'text', example: '12 High St, London' },
  { path: 'party.candidate.name', label: 'Candidate name', type: 'string', required: true, example: 'Jane Doe' },
  { path: 'party.candidate.address', label: 'Candidate address', type: 'text', example: '200 Main St, Boston' },
  { path: 'role.title', label: 'Job title', type: 'string', required: true, example: 'Product Manager' },
  { path: 'role.department', label: 'Department', type: 'string', example: 'Product' },
  { path: 'role.location', label: 'Location', type: 'string', required: true, example: 'Hybrid (London / Remote)' },
  { path: 'dates.startDate', label: 'Start date', type: 'date', required: true, example: '2025-02-01' },
  { path: 'dates.offerExpiryDate', label: 'Offer expiry date', type: 'date', example: '2025-02-10' },
  { path: 'compensation.baseSalary', label: 'Base salary', type: 'money', required: true, example: 60000 },
  {
    path: 'compensation.payPeriod',
    label: 'Pay period',
    type: 'enum',
    required: true,
    rules: { options: ['year', 'month', 'week', 'hour'] },
    example: 'year',
  },
  { path: 'compensation.bonus', label: 'Bonus', type: 'text', example: 'Up to 10% annual performance bonus' },
  { path: 'compensation.equity', label: 'Equity', type: 'text', example: 'Options subject to plan terms' },
  { path: 'hours.weeklyHours', label: 'Weekly hours', type: 'number', required: true, example: 40 },
  { path: 'hours.scheduleNotes', label: 'Schedule notes', type: 'text', example: 'Core hours 10am-4pm' },
  { path: 'benefits.ptoDays', label: 'Paid leave days', type: 'number', example: 28 },
  { path: 'benefits.sickPolicy', label: 'Sick leave policy', type: 'text', example: 'Per company policy and local law' },
  { path: 'benefits.healthcare', label: 'Healthcare', type: 'text', example: 'Medical, dental, vision coverage' },
  { path: 'probation.lengthMonths', label: 'Probation length (months)', type: 'number', example: 3 },
  { path: 'termination.noticeEmployerWeeks', label: 'Employer notice (weeks)', type: 'number', example: 4 },
  { path: 'termination.noticeEmployeeWeeks', label: 'Employee notice (weeks)', type: 'number', example: 4 },
  { path: 'termination.atWill', label: 'At-will employment (US)', type: 'boolean', example: true },
  { path: 'confidentiality.enabled', label: 'Confidentiality clause', type: 'boolean', example: true },
  { path: 'ipAssignment.enabled', label: 'IP assignment clause', type: 'boolean', example: true },
  { path: 'backgroundChecks.enabled', label: 'Background check contingency', type: 'boolean', example: false },
  {
    path: 'governingLaw.jurisdiction',
    label: 'Governing law',
    type: 'string',
    required: true,
    example: 'England & Wales',
  },
  { path: 'signatures.employerSignerName', label: 'Employer signer name', type: 'string', required: true, example: 'Alice Smith' },
  { path: 'signatures.employerSignerTitle', label: 'Employer signer title', type: 'string', example: 'HR Director' },
  { path: 'signatures.candidateSignerName', label: 'Candidate signer name', type: 'string', required: true, example: 'Jane Doe' },
];

const bodyUk = `
Job Offer & Employment Terms (UK)
Employer: {{party.employer.name}}
Candidate: {{party.candidate.name}}
Role: {{role.title}}{{#if role.department}}, {{role.department}}{{/if}}
Location: {{role.location}}
Start date: {{dates.startDate}}
Offer valid until: {{#if dates.offerExpiryDate}}{{dates.offerExpiryDate}}{{else}}please confirm promptly{{/if}}

Compensation:
- Base pay: {{compensation.baseSalary}} per {{compensation.payPeriod}}
{{#if compensation.bonus}}- Bonus: {{compensation.bonus}}{{/if}}
{{#if compensation.equity}}- Equity: {{compensation.equity}}{{/if}}

Working time:
- Weekly hours: {{hours.weeklyHours}}
{{#if hours.scheduleNotes}}- Schedule: {{hours.scheduleNotes}}{{/if}}

Holiday and leave:
{{#if benefits.ptoDays}}- Annual paid leave: {{benefits.ptoDays}} days (at least statutory).{{else}}- Holiday entitlement will follow statutory minimums and company policy.{{/if}}
{{#if benefits.sickPolicy}}- Sickness: {{benefits.sickPolicy}}{{/if}}

Probation:
{{#if probation.lengthMonths}}- Probation: {{probation.lengthMonths}} months, with statutory notice minimums.{{else}}- No probation period specified.{{/if}}

Notice:
{{#if termination.noticeEmployerWeeks}}- Employer notice: {{termination.noticeEmployerWeeks}} weeks.{{/if}}
{{#if termination.noticeEmployeeWeeks}}- Employee notice: {{termination.noticeEmployeeWeeks}} weeks.{{/if}}
If not specified above, statutory notice rules apply.

Policies and compliance:
- You must follow applicable workplace policies referenced separately.
{{#if confidentiality.enabled}}- Confidentiality: You must keep proprietary information confidential.{{/if}}
{{#if ipAssignment.enabled}}- Intellectual property created in your duties is assigned to the employer.{{/if}}

Governing law: {{governingLaw.jurisdiction}}

Please sign to accept:
Employer: {{signatures.employerSignerName}}{{#if signatures.employerSignerTitle}} ({{signatures.employerSignerTitle}}){{/if}}
Candidate: {{signatures.candidateSignerName}}

Notes: Template document. Not legal advice. No at-will language included for UK. Local law may require additional steps.
`.trim();

const bodyUs = `
Job Offer & Employment Terms (US)
Employer: {{party.employer.name}}
Candidate: {{party.candidate.name}}
Role: {{role.title}}{{#if role.department}}, {{role.department}}{{/if}}
Location: {{role.location}}
Start date: {{dates.startDate}}
Offer valid until: {{#if dates.offerExpiryDate}}{{dates.offerExpiryDate}}{{else}}please confirm promptly{{/if}}

Compensation:
- Base pay: {{compensation.baseSalary}} per {{compensation.payPeriod}}
{{#if compensation.bonus}}- Bonus: {{compensation.bonus}}{{/if}}
{{#if compensation.equity}}- Equity: {{compensation.equity}}{{/if}}

Working time:
- Weekly hours: {{hours.weeklyHours}}
{{#if hours.scheduleNotes}}- Schedule: {{hours.scheduleNotes}}{{/if}}

Benefits:
{{#if benefits.healthcare}}- Healthcare: {{benefits.healthcare}}{{/if}}
{{#if benefits.ptoDays}}- Paid time off: {{benefits.ptoDays}} days (company policy applies).{{/if}}
{{#if benefits.sickPolicy}}- Sick leave: {{benefits.sickPolicy}}{{/if}}

Employment status:
{{#if termination.atWill}}
- Employment is at will where lawful. Either party may end employment at any time, with or without cause or notice, subject to applicable law.
{{else}}
- Employment is not guaranteed for a fixed term; termination will follow applicable policies and law.
{{/if}}
{{#if backgroundChecks.enabled}}- Offer contingent on background/reference checks if permitted by law.{{/if}}

Policies and compliance:
{{#if confidentiality.enabled}}- Confidentiality: protect employer proprietary information.{{/if}}
{{#if ipAssignment.enabled}}- IP created in your duties is assigned to the employer.{{/if}}

Governing law: {{governingLaw.jurisdiction}}

Please sign to accept:
Employer: {{signatures.employerSignerName}}{{#if signatures.employerSignerTitle}} ({{signatures.employerSignerTitle}}){{/if}}
Candidate: {{signatures.candidateSignerName}}

Notes: Template document. Not legal advice. Avoids state-specific promises; at-will language included when enabled.
`.trim();

const bodyEu = `
Job Offer & Employment Terms (EU)
Employer: {{party.employer.name}}
Candidate: {{party.candidate.name}}
Role: {{role.title}}{{#if role.department}}, {{role.department}}{{/if}}
Location: {{role.location}}
Start date: {{dates.startDate}}
Offer valid until: {{#if dates.offerExpiryDate}}{{dates.offerExpiryDate}}{{else}}please confirm promptly{{/if}}

Compensation:
- Base pay: {{compensation.baseSalary}} per {{compensation.payPeriod}}
{{#if compensation.bonus}}- Bonus: {{compensation.bonus}}{{/if}}
{{#if compensation.equity}}- Equity: {{compensation.equity}}{{/if}}

Working time:
- Weekly hours: {{hours.weeklyHours}}
{{#if hours.scheduleNotes}}- Schedule: {{hours.scheduleNotes}}{{/if}}

Leave and benefits:
{{#if benefits.ptoDays}}- Paid leave: {{benefits.ptoDays}} days (ensure at least statutory minimums).{{else}}- Paid leave will follow statutory minimums and company policy.{{/if}}
{{#if benefits.sickPolicy}}- Sick leave: {{benefits.sickPolicy}}{{/if}}

Probation:
{{#if probation.lengthMonths}}- Probation: {{probation.lengthMonths}} months, applied only where lawful.{{else}}- No probation period specified.{{/if}}

Notice:
{{#if termination.noticeEmployerWeeks}}- Employer notice: {{termination.noticeEmployerWeeks}} weeks (or statutory if greater).{{/if}}
{{#if termination.noticeEmployeeWeeks}}- Employee notice: {{termination.noticeEmployeeWeeks}} weeks (or statutory if greater).{{/if}}

Data and policies:
- Employee data will be processed per company policy and applicable data protection law.
{{#if confidentiality.enabled}}- Confidentiality: protect business and customer information.{{/if}}
{{#if ipAssignment.enabled}}- IP created in your duties is assigned to the employer.{{/if}}

Governing law: {{governingLaw.jurisdiction}}

Please sign to accept:
Employer: {{signatures.employerSignerName}}{{#if signatures.employerSignerTitle}} ({{signatures.employerSignerTitle}}){{/if}}
Candidate: {{signatures.candidateSignerName}}

Notes: Template document. Not legal advice. No at-will language included. Local law may require additional terms.
`.trim();

const bodies: Record<'UK' | 'US' | 'EU', string> = { UK: bodyUk, US: bodyUs, EU: bodyEu };

function buildSamplePayload() {
  const payload: Record<string, any> = {};
  legendItems.forEach((item) => {
    let val = item.example;
    if (val === undefined || val === null || val === '') {
      switch (item.type) {
        case 'number':
        case 'money':
          val = 1;
          break;
        case 'boolean':
          val = false;
          break;
        case 'date':
          val = '2025-01-01';
          break;
        case 'enum':
          val = item.rules?.options?.[0] || 'year';
          break;
        default:
          val = 'Example';
      }
    }
    payload[item.path] = val;
  });
  return payload;
}

async function upsertTemplate(productId: string, name: string, jurisdiction: 'UK' | 'US' | 'EU') {
  let template = await prisma.template.findFirst({
    where: { productId, jurisdiction, name },
  });
  if (!template) {
    template = await prisma.template.create({
      data: {
        productId,
        jurisdiction,
        name,
        description: `${name} terms for ${jurisdiction}`,
      },
    });
  }
  return template;
}


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const product = await prisma.product.upsert({
    where: { slug: 'job-offer-fast-track' },
    update: { title: 'Job Offer & Employment Terms (Fast-Track)', status: ProductStatus.PUBLISHED },
    create: {
      slug: 'job-offer-fast-track',
      title: 'Job Offer & Employment Terms (Fast-Track)',
      category: 'Career',
      type: ProductType.SINGLE,
      status: ProductStatus.PUBLISHED,
    },
  });

  const payload = buildSamplePayload();
  const jurisdictions: Array<'UK' | 'US' | 'EU'> = ['UK', 'US', 'EU'];

  for (const jurisdiction of jurisdictions) {
    const templateName = jurisdiction === 'UK' ? 'Job Offer (UK)' : jurisdiction === 'US' ? 'Job Offer (US)' : 'Job Offer (EU)';
    const template = await upsertTemplate(product.id, templateName, jurisdiction);

    const existingActive = await prisma.templateVersion.findFirst({
      where: { templateId: template.id, isActive: true },
      orderBy: { version: 'desc' },
    });

    if (existingActive) {
      console.log(`Template ${template.id} (${jurisdiction}) already has active version ${existingActive.id}, skipping.`);
      continue;
    }

    const bodyTemplate = bodies[jurisdiction];
    const placeholderLegend = { version: 1, items: legendItems };

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

    const validation = validateTemplateVersion(version, payload);
    if (validation.issues.length) {
      throw new Error(`Validation failed for ${jurisdiction}: ${JSON.stringify(validation.issues)}`);
    }

    await prisma.templateVersion.update({
      where: { id: version.id },
      data: { lastValidatedAt: new Date(), lastValidationErrors: [] },
    });

    console.log(
      `Seeded ${jurisdiction}: product=${product.id}, template=${template.id}, version=${version.id}, legendItems=${legendItems.length}`
    );
  }

  console.log('Seed job offer done.');
}

seed()
  .catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
