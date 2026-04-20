import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';
const prisma = new PrismaClient();

type LegendItem = { path: string; label: string; type: string; required?: boolean; example?: any; rules?: { options?: string[] } };
const buildLegend = (items: LegendItem[]) => ({ version: 1, items });
const payload = (items: LegendItem[]): Record<string, any> => {
  const p: Record<string, any> = {};
  items.forEach(i => { (p as any)[i.path] = i.example ?? (i.type === 'number' ? 1 : 'Example'); });
  return p;
};

// ─── DATA PROCESSING ADDENDUM — US ───────────────────────────────────────────

const DPA_US = `DATA PROCESSING ADDENDUM

Title: Data Processing Agreement
Version: 1
Jurisdiction: United States of America

Date: [{{dates.addendumDate}}]

THIS DATA PROCESSING ADDENDUM (this "Addendum") is entered into as of [{{dates.addendumDate}}] (the "Effective Date")

BETWEEN:

[{{party.controller.name}}] ("Controller"); and

[{{party.processor.name}}] ("Processor").

RECITALS

WHEREAS the Parties have entered into a Master Services Agreement dated [{{references.msaDate}}] (the "Services Agreement");

WHEREAS in connection with the Services, the Processor may process Personal Data on behalf of the Controller;

WHEREAS the Parties wish to set out their respective obligations with respect to such processing;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. DEFINITIONS

1.1 In this Addendum, unless the context otherwise requires:

(a) "CCPA" means the California Consumer Privacy Act of 2018, as amended by the California Privacy Rights Act of 2020, and their implementing regulations;

(b) "Personal Data" means any information that is defined as "personal information," "personally identifiable information," or equivalent under the Privacy Laws, that is Processed by the Processor on behalf of the Controller in connection with the Services;

(c) "Privacy Laws" means all applicable federal, state, and local laws, rules, and regulations of the United States of America relating to privacy, data protection, and data security, including without limitation the CCPA, applicable state data breach notification laws, and any applicable data security statutes;

(d) "Process" or "Processing" means any operation or set of operations performed on Personal Data, whether by manual or automated means, including without limitation collection, recording, organisation, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure, dissemination, making available, alignment, combination, restriction, erasure, and destruction;

(e) "Security Incident" means any actual or suspected unauthorized access, use, or disclosure of Personal Data;

(f) "Sub-processor" means any third party engaged by the Processor to Process Personal Data on behalf of the Controller.

1.2 References to "Controller" and "Processor" include their respective successors and permitted assigns.

2. SCOPE AND PURPOSE

2.1 The Controller hereby instructs the Processor to Process the Personal Data described in Exhibit A for the purpose of providing the Services under the Services Agreement (the "Permitted Purpose").

2.2 The Processor shall Process the Personal Data only for the Permitted Purpose and in accordance with the Controller's documented instructions, unless required to do otherwise by applicable law.

3. PROCESSOR OBLIGATIONS

3.1 The Processor shall:

(a) Process the Personal Data only for the Permitted Purpose and in accordance with the Controller's documented instructions;

(b) not disclose or make available the Personal Data to any third party except to Sub-processors engaged in accordance with Section 5 or as required by applicable law;

(c) implement and maintain reasonable and appropriate technical and organisational security measures designed to: (i) protect the security and confidentiality of the Personal Data; (ii) protect against anticipated threats or hazards to the security or integrity of the Personal Data; and (iii) protect against unauthorized access to or use of the Personal Data;

(d) ensure that its employees, contractors, and agents who have access to the Personal Data are subject to binding obligations of confidentiality;

(e) assist the Controller in responding to any request from a consumer exercising rights under the Privacy Laws, including without limitation rights of access, correction, deletion, and opt-out, to the extent reasonably practicable and within the time periods prescribed by the Privacy Laws;

(f) notify the Controller promptly, and in any event within [{{security.breachNotificationHours}}] hours, after becoming aware of any Security Incident;

(g) at the Controller's election, delete or return the Personal Data upon the termination or expiry of the Services Agreement, and delete existing copies unless applicable law requires retention;

(h) make available to the Controller all information reasonably necessary to demonstrate compliance with the obligations set forth in this Addendum and permit audits and inspections in accordance with Section 7;

(i) [{{processor.additionalObligationsText}}].

3.2 The Processor shall not: (a) sell, share, or otherwise disclose the Personal Data to any third party for monetary or other valuable consideration, in violation of the CCPA or any other applicable Privacy Law; (b) retain, use, or disclose the Personal Data for any purpose other than the Permitted Purpose or as required by applicable law.

3.3 The Processor acknowledges that, to the extent it processes Personal Data on behalf of the Controller, it is acting as a "service provider" (as defined under the CCPA) and is subject to the restrictions set forth in the CCPA.

4. CONTROLLER OBLIGATIONS

4.1 The Controller shall: (a) provide complete and accurate instructions to the Processor regarding the Processing of Personal Data; (b) ensure that it has all necessary rights, consents, and permissions to disclose Personal Data to the Processor for Processing in connection with the Services; (c) ensure that the Processing of Personal Data by the Controller does not violate any applicable Privacy Law; (d) notify the Processor promptly of any changes to applicable Privacy Laws that may affect the Processor.

5. SUB-PROCESSORS

5.1 The Processor shall not engage any Sub-processor without the prior written authorisation of the Controller.

5.2 Where the Processor engages a Sub-processor, the Processor shall impose on that Sub-processor data protection obligations at least as protective as those set forth in this Addendum.

5.3 The Processor shall remain fully liable to the Controller for the performance of any Sub-processor's obligations.

5.4 [{{subprocessor.additionalText}}]

6. SECURITY

6.1 The Processor shall implement and maintain security measures appropriate to the nature and scope of the Processing and the risks presented, including without limitation: (a) encryption of Personal Data in transit and at rest; (b) access controls and authentication measures; (c) regular testing and assessment of security controls; (d) incident response procedures.

6.2 The Processor shall maintain documentation of its security practices and make such documentation available to the Controller upon reasonable request.

7. AUDITS

7.1 Upon the Controller's written request, the Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations set forth in this Addendum.

7.2 The Controller may, at its own expense, audit the Processor's data processing facilities and practices, provided that: (a) the Controller gives the Processor not less than [{{audit.noticeDays}}] days' prior written notice; (b) the audit is conducted during normal business hours; (c) the audit does not unreasonably disrupt the Processor's business operations.

8. DATA INCIDENT RESPONSE

8.1 Upon becoming aware of a Security Incident, the Processor shall: (a) promptly notify the Controller; (b) investigate the cause of the Security Incident; (c) take reasonable steps to mitigate the effects and prevent future Security Incidents.

8.2 The Processor shall cooperate with the Controller in connection with any regulatory investigation or notification obligations arising from a Security Incident.

9. RETURN AND DELETION OF PERSONAL DATA

9.1 Upon the termination or expiry of the Services Agreement, or upon the Controller's written request, the Processor shall, at the Controller's election: (a) return to the Controller all Personal Data in the Processor's possession or control; or (b) certify in writing to the Controller that the Processor has securely deleted all copies of the Personal Data in its possession or control, including any copies held by Sub-processors.

9.2 The Processor shall comply with the Controller's election within [{{data.returnDays}}] days of the triggering event.

10. GENERAL

10.1 This Addendum shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}].

10.2 Any dispute arising out of or relating to this Addendum shall be subject to the dispute resolution provisions of the Services Agreement.

IN WITNESS WHEREOF the Parties have executed this Addendum as of the date first written above.

[{{party.controller.name}}]

By: _______________________________
Name: [{{signatures.controllerSignatoryName}}]
Title: [{{signatures.controllerSignatoryTitle}}]
Date: [{{dates.addendumDate}}]

[{{party.processor.name}}]

By: _______________________________
Name: [{{signatures.processorSignatoryName}}]
Title: [{{signatures.processorSignatoryTitle}}]
Date: [{{dates.addendumDate}}]

EXHIBIT A — PERSONAL DATA PROCESSING DETAILS

Subject Matter: [{{exhibit.subjectMatter}}]

Nature and Purpose of Processing: [{{exhibit.natureAndPurpose}}]

Duration of Processing: [{{exhibit.duration}}]

Categories of Personal Data: [{{exhibit.categoriesOfPersonalData}}]

Categories of Data Subjects: [{{exhibit.categoriesOfDataSubjects}}]

---
Template document. Not legal advice. Not suitable if: the Processor handles protected health information (PHI) subject to HIPAA (a separate Business Associate Agreement is required under HIPAA); the Processor handles financial account information subject to the Gramm-Leach-Bliley Act (GLBA) Safeguards Rule (additional security requirements apply); the Controller or Processor is subject to specific state privacy laws with stricter requirements than described herein (e.g., Nevada, Virginia, Colorado, Connecticut, Utah, Iowa, Indiana, Tennessee, Montana, Texas — each has distinct requirements). This template reflects general U.S. practice for service provider processing arrangements and must be reviewed by a qualified privacy attorney before use. Jurisdiction: United States of America (adapt for specific state law as applicable).`;

const LEGEND_DPA_US: LegendItem[] = [
  { path: 'party.controller.name', label: "Data controller legal name", type: 'string', required: true, example: 'Apex Financial Services LLC' },
  { path: 'party.processor.name', label: "Data processor legal name", type: 'string', required: true, example: 'TechBridge Solutions Inc.' },
  { path: 'references.msaDate', label: 'Master services agreement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'security.breachNotificationHours', label: 'Security incident notification deadline (hours)', type: 'number', required: false, example: 72 },
  { path: 'processor.additionalObligationsText', label: 'Additional processor obligations text', type: 'text', required: false, example: 'The Processor shall maintain records of all Processing activities in accordance with the requirements of the Privacy Laws.' },
  { path: 'subprocessor.additionalText', label: 'Additional sub-processor text', type: 'text', required: false, example: 'The following Sub-processors are currently authorised under this Addendum: Amazon Web Services Inc. (cloud infrastructure); Salesforce.com Inc. (CRM platform).' },
  { path: 'audit.noticeDays', label: 'Audit notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'data.returnDays', label: 'Data return/deletion period (days)', type: 'number', required: false, example: 30 },
  { path: 'signatures.controllerSignatoryName', label: "Controller signatory name", type: 'string', required: true, example: 'Michael David Thornton' },
  { path: 'signatures.controllerSignatoryTitle', label: "Controller signatory title", type: 'string', required: true, example: 'Chief Operating Officer' },
  { path: 'signatures.processorSignatoryName', label: "Processor signatory name", type: 'string', required: true, example: 'Rachel Ann Mitchell' },
  { path: 'signatures.processorSignatoryTitle', label: "Processor signatory title", type: 'string', required: true, example: 'President and CEO' },
  { path: 'dates.addendumDate', label: 'Addendum execution date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'Delaware' },
  { path: 'exhibit.subjectMatter', label: 'Subject matter of processing', type: 'text', required: true, example: 'The provision of cloud-based data analytics and reporting services by the Processor to the Controller under the Services Agreement.' },
  { path: 'exhibit.natureAndPurpose', label: 'Nature and purpose of processing', type: 'text', required: true, example: 'Collecting, recording, storing, analysing, and reporting on personal information provided by the Controller for the purpose of delivering business intelligence and analytics services as described in the applicable Statement of Work.' },
  { path: 'exhibit.duration', label: 'Duration of processing', type: 'text', required: true, example: 'For the duration of the Services Agreement and for such further period as is necessary for the resolution of any claims or regulatory investigations.' },
  { path: 'exhibit.categoriesOfPersonalData', label: 'Categories of personal data', type: 'text', required: true, example: 'Names; email addresses; job titles; business telephone numbers; business postal addresses; purchase histories; service usage records; device identifiers.' },
  { path: 'exhibit.categoriesOfDataSubjects', label: 'Categories of data subjects', type: 'text', required: true, example: 'Consumers and customers of the Controller; business contacts of the Controller.' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seedProduct(slug: string, title: string, category: string, jurisdiction: string, label: string, body: string, legend: LegendItem[]) {
  const product = await prisma.product.upsert({
    where: { slug }, update: { status: ProductStatus.PUBLISHED, title, category },
    create: { slug, title, category, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction } });
  if (!template) template = await prisma.template.create({ data: { productId: product.id, jurisdiction, name: title, description: label } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] ' + slug + ' (' + jurisdiction + ')'); return; }
  const v = await prisma.templateVersion.create({
    data: { version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(legend), bodyTemplate: body, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(legend)).issues;
  if (issues.length) console.warn('[WARN] ' + slug + ' (' + jurisdiction + '):', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + slug + ' (' + jurisdiction + ') — v=' + v.id);
}

async function main() {
  await seedProduct('data-processing-addendum', 'Data Processing Addendum', 'Compliance & Regulatory', 'US', 'United States of America', DPA_US, LEGEND_DPA_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());