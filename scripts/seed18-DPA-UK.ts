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

// ─── DATA PROCESSING ADDENDUM — UK ───────────────────────────────────────────

const DPA_UK = `DATA PROCESSING ADDENDUM

Title: Data Processing Addendum
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.addendumDate}}]

THIS DATA PROCESSING ADDENDUM (this "Addendum") is entered into as of [{{dates.addendumDate}}] (the "Addendum Effective Date")

BETWEEN:

[{{party.controller.name}}] of [{{party.controller.address}}] ("Controller"); and

[{{party.processor.name}}] of [{{party.processor.address}}] ("Processor").

(collectively referred to as "the Parties")

BACKGROUND

(A) The Parties have entered into a Master Services Agreement dated [{{references.msaDate}}] (the "Principal Agreement").

(B) In connection with the Services provided by the Processor to the Controller under the Principal Agreement, the Processor may process Personal Data on behalf of the Controller.

(C) The Parties wish to set out their respective obligations under the UK GDPR with respect to such Personal Data processing.

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Addendum, unless the context otherwise requires:

(a) "UK GDPR" means the General Data Protection Regulation (EU) 2016/679 as it forms part of the law of England and Wales, Scotland, and Northern Ireland by virtue of section 3 of the European Union (Withdrawal) Act 2018, together with the Data Protection Act 2018;

(b) "Data Subject", "Personal Data", "Personal Data Breach", "processing", and "supervisory authority" have the meanings given in the UK GDPR;

(c) "Data Protection Legislation" means the UK GDPR, the Data Protection Act 2018, and all applicable laws and regulations relating to the processing of personal data and privacy;

(d) "Permitted Purpose" means the processing of Personal Data for the purpose of providing the Services under the Principal Agreement;

(e) "Sub-processor" means any third party appointed by the Processor to process Personal Data on behalf of the Controller;

(f) "including" means "including without limitation".

1.2 This Addendum forms part of the Principal Agreement. In the event of any conflict between this Addendum and the Principal Agreement, this Addendum shall prevail.

2. SCOPE AND PURPOSE OF PROCESSING

2.1 The Controller hereby instructs the Processor to process the Personal Data described in Schedule 1 for the Permitted Purpose.

2.2 The Processor shall process the Personal Data only on the documented instructions of the Controller, including with regard to transfers of Personal Data to a third country or an international organisation, unless required to do so by applicable law.

2.3 The Processor shall promptly notify the Controller if, in the Processor's opinion, any instruction infringes the Data Protection Legislation.

3. PROCESSOR OBLIGATIONS

3.1 The Processor shall:

(a) process the Personal Data only for the Permitted Purpose and in accordance with the Controller's documented instructions;

(b) ensure that persons authorised to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;

(c) implement and maintain appropriate technical and organisational security measures appropriate to the risk presented by the processing, in accordance with Article 32 of the UK GDPR;

(d) not engage any Sub-processor without the prior specific or general written authorisation of the Controller. Where the Controller has given general written authorisation for the engagement of Sub-processors, the Processor shall notify the Controller of any intended changes concerning the addition or replacement of Sub-processors, thereby giving the Controller the opportunity to object;

(e) taking into account the nature of the processing, assist the Controller by appropriate technical and organisational measures, insofar as this is possible, in fulfilling the Controller's obligations to respond to requests from Data Subjects exercising their rights under the Data Protection Legislation;

(f) assist the Controller in ensuring compliance with the Controller's obligations under Articles 32 to 36 of the UK GDPR, taking into account the nature of the processing and the information available to the Processor;

(g) at the Controller's election, delete or return all Personal Data to the Controller upon the termination or expiry of the Principal Agreement, and delete existing copies unless applicable law requires storage of the Personal Data;

(h) make available to the Controller all information necessary to demonstrate compliance with the obligations set out in this Addendum and allow for and contribute to the conduct of audits, including inspections, conducted by the Controller or another auditor mandated by the Controller;

(i) immediately notify the Controller upon becoming aware of a Personal Data Breach.

3.2 The Processor shall designate a point of contact for data protection matters and shall notify the Controller of the name and contact details of such point of contact.

3.3 [{{processor.additionalObligationsText}}]

4. SUB-PROCESSING

4.1 The Processor shall not engage any Sub-processor without the prior written authorisation of the Controller (whether specific or general).

4.2 Where the Processor engages a Sub-processor, the Processor shall impose on that Sub-processor the same data protection obligations as are imposed on the Processor under this Addendum, in particular providing sufficient guarantees to implement appropriate technical and organisational measures.

4.3 The Processor shall remain fully liable to the Controller for the performance of any Sub-processor's obligations.

4.4 [{{subprocessor.additionalSubprocessorText}}]

5. TRANSFERS OF PERSONAL DATA

5.1 The Processor shall not transfer or authorise the transfer of Personal Data to any third country or international organisation outside the United Kingdom without the prior written consent of the Controller, unless required to do so by applicable law.

5.2 Where the Processor transfers Personal Data to a third country pursuant to applicable law, the Processor shall notify the Controller of that legal requirement before processing.

5.3 [{{transfers.additionalTransferText}}]

6. CONFIDENTIALITY

6.1 The Processor shall ensure that any person it authorises to process Personal Data is subject to an obligation of confidentiality.

6.2 The obligations of confidentiality shall survive the termination or expiry of this Addendum and the Principal Agreement.

7. AUDIT RIGHTS

7.1 The Processor shall, upon the Controller's written request, make available to the Controller all information necessary to demonstrate compliance with the obligations set out in this Addendum and shall allow for and contribute to the conduct of audits, including inspections, by the Controller or an auditor mandated by the Controller.

7.2 Audits shall be conducted during normal business hours, with reasonable prior notice of not less than [{{audit.noticeDays}}] days, and shall not unreasonably disrupt the Processor's business operations.

7.3 [{{audit.additionalAuditText}}]

8. ASSISTANCE TO DATA SUBJECTS

8.1 The Processor shall, taking into account the nature of the processing, assist the Controller in ensuring compliance with the Controller's obligations under the UK GDPR to:

(a) respond to requests from Data Subjects exercising their rights of access, rectification, erasure, restriction, portability, and objection;

(b) notify personal data breaches to the relevant supervisory authority and, where applicable, to Data Subjects;

(c) carry out data protection impact assessments where required;

(d) consult with the supervisory authority prior to processing where a data protection impact assessment indicates that the processing would result in a high risk in the absence of measures taken by the Controller.

9. LIABILITIES AND INDEMNIFICATION

9.1 Each Party shall be liable for any breach of its obligations under this Addendum in accordance with the Data Protection Legislation.

9.2 The Processor shall indemnify the Controller from and against any and all claims, damages, losses, costs, and expenses arising out of or relating to the Processor's breach of any of its obligations under this Addendum or the Data Protection Legislation.

10. GENERAL

10.1 This Addendum shall be governed by and construed in accordance with the laws of England and Wales.

10.2 Any dispute arising out of or relating to this Addendum shall be subject to the dispute resolution provisions of the Principal Agreement.

IN WITNESS WHEREOF the Parties have executed this Addendum as a deed on the date first written above.

EXECUTED as a DEED by [{{party.controller.name}}]
by [{{signatures.controllerSignatoryName}}], [{{signatures.controllerSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.addendumDate}}]

EXECUTED as a DEED by [{{party.processor.name}}]
by [{{signatures.processorSignatoryName}}], [{{signatures.processorSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.addendumDate}}]

SCHEDULE 1 — SCOPE AND NATURE OF PROCESSING

Subject matter of processing: [{{schedule.subjectMatter}}]

Nature of processing: [{{schedule.natureOfProcessing}}]

Purpose of processing: [{{schedule.purposeOfProcessing}}]

Categories of Data Subjects: [{{schedule.categoriesOfDataSubjects}}]

Categories of Personal Data: [{{schedule.categoriesOfPersonalData}}]

Special category data (if any): [{{schedule.specialCategoryData}}]

Duration of processing: [{{schedule.durationOfProcessing}}]

---
Template document. Not legal advice. This DPA template reflects standard UK GDPR Article 28 processor arrangements. Not suitable if: the Processor processes special category data under Article 9 UK GDPR without adequate additional safeguards being documented in Schedule 1; the processing involves transfers of personal data to third countries outside the UK for which additional safeguards (Standard Contractual Clauses, adequacy decisions) are required; the Processor acts as a controller in its own right rather than purely as a processor — a different agreement structure would be required. This template must be reviewed by a qualified data protection lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_DPA_UK: LegendItem[] = [
  { path: 'party.controller.name', label: "Data controller legal name", type: 'string', required: true, example: 'Meridian Capital Ltd' },
  { path: 'party.controller.address', label: "Data controller address", type: 'text', required: true, example: '1 London Wall, London, EC2Y 5AA' },
  { path: 'party.processor.name', label: "Data processor legal name", type: 'string', required: true, example: 'Harbour Digital Ltd' },
  { path: 'party.processor.address', label: "Data processor address", type: 'text', required: true, example: 'Unit 4, 12 Sovereign Park, Manchester, M14 6TD' },
  { path: 'references.msaDate', label: 'Master services agreement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'processor.additionalObligationsText', label: 'Additional processor obligations text', type: 'text', required: false, example: 'The Processor shall maintain records of all processing activities carried out on behalf of the Controller in accordance with Article 30 of the UK GDPR.' },
  { path: 'subprocessor.additionalSubprocessorText', label: 'Additional sub-processor text', type: 'text', required: false, example: 'The following Sub-processors are currently authorised: Amazon Web Services EMEA SARL (cloud infrastructure); Microsoft Ireland Operations Ltd (office productivity tools).' },
  { path: 'transfers.additionalTransferText', label: 'Additional transfer text', type: 'text', required: false, example: 'Transfers of Personal Data to the United States are conducted under the UK International Data Transfer Agreement (IDTA) as an appropriate safeguard.' },
  { path: 'audit.noticeDays', label: 'Audit notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'audit.additionalAuditText', label: 'Additional audit text', type: 'text', required: false, example: 'The Processor shall provide the Controller with an annual summary report of its data processing activities upon request.' },
  { path: 'signatures.controllerSignatoryName', label: "Controller signatory name", type: 'string', required: true, example: 'Charles Edward Harrington' },
  { path: 'signatures.controllerSignatoryTitle', label: "Controller signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.processorSignatoryName', label: "Processor signatory name", type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.processorSignatoryTitle', label: "Processor signatory title", type: 'string', required: true, example: 'Managing Director' },
  { path: 'dates.addendumDate', label: 'Addendum execution date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'schedule.subjectMatter', label: 'Subject matter of processing', type: 'text', required: true, example: 'The provision of cloud-based data analytics and reporting services by the Processor to the Controller under the Principal Agreement.' },
  { path: 'schedule.natureOfProcessing', label: 'Nature of processing', type: 'text', required: true, example: 'Collecting, recording, organising, structuring, storing, adapting, altering, retrieving, consulting, using, disclosing by transmission, disseminating, making available, aligning, restricting, erasing, and destroying personal data.' },
  { path: 'schedule.purposeOfProcessing', label: 'Purpose of processing', type: 'text', required: true, example: 'To provide data analytics and business intelligence reporting services to the Controller as described in Statement of Work [X] attached to the Principal Agreement.' },
  { path: 'schedule.categoriesOfDataSubjects', label: 'Categories of data subjects', type: 'text', required: true, example: 'Clients and customers of the Controller; employees of the Controller; business contacts of the Controller.' },
  { path: 'schedule.categoriesOfPersonalData', label: 'Categories of personal data', type: 'text', required: true, example: 'Names; email addresses; job titles; business telephone numbers; business postal addresses; purchase histories; service usage records.' },
  { path: 'schedule.specialCategoryData', label: 'Special category data', type: 'text', required: false, example: 'None. The Processor does not process special category data on behalf of the Controller.' },
  { path: 'schedule.durationOfProcessing', label: 'Duration of processing', type: 'text', required: true, example: 'For the duration of the Principal Agreement and for such further period as is necessary for the resolution of any claims or regulatory investigations.' },
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
  await seedProduct('data-processing-addendum', 'Data Processing Addendum', 'Compliance & Regulatory', 'UK', 'United Kingdom (England & Wales)', DPA_UK, LEGEND_DPA_UK);
}

main().catch(console.error).finally(() => prisma.$disconnect());