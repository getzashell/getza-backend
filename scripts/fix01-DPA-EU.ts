import { ProductStatus, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─── Fix 1: DPA EU (v1 is empty — create v2 with proper EU GDPR content) ───

const DPA_EU = `DATA PROCESSING ADDENDUM

Title: Data Processing Addendum
Version: 2
Jurisdiction: European Union (GDPR)

Date: [{{dates.addendumDate}}]

THIS DATA PROCESSING ADDENDUM (this "Addendum") is entered into as of [{{dates.addendumDate}}] (the "Addendum Effective Date")

BETWEEN:

[{{party.controller.name}}] ("Controller"); and

[{{party.processor.name}}] ("Processor").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Controller wishes to engage the Processor to process Personal Data on its behalf in connection with the services described in the Principal Agreement dated [{{references.msaDate}}] (the "Principal Agreement");

WHEREAS the Processor agrees to process such Personal Data in accordance with the terms of this Addendum and the Applicable Data Protection Law;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Addendum, unless the context otherwise requires:

(a) "Applicable Data Protection Law" means Regulation (EU) 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data (the "EU GDPR") and all applicable national implementing legislation in the Member State in which the Controller is established;

(b) "Data Subject", "Personal Data", "Personal Data Breach", "processing", "controller", "processor", "supervisory authority", and "recipient" have the meanings given in the Applicable Data Protection Law;

(c) "Permitted Purpose" means the processing of Personal Data for the purpose of providing the Services under the Principal Agreement;

(d) "Sub-processor" means any processor engaged by the Processor to process Personal Data on behalf of the Controller;

(e) "including" means "including without limitation".

1.2 This Addendum forms part of the Principal Agreement. In the event of conflict between this Addendum and the Principal Agreement, this Addendum shall prevail. Terms defined in the Principal Agreement have the same meaning herein unless otherwise defined.

1.3 The originallanguages of this Addendum shall be [{{legal.originalLanguage}}]. In the event of any inconsistency between language versions, the version in [{{legal.governingLanguage}}] shall prevail.

2. SCOPE AND PURPOSE OF PROCESSING

2.1 The Controller hereby instructs the Processor to process the Personal Data described in Annex I for the Permitted Purpose only, and for no other purpose whatsoever.

2.2 The Processor shall process the Personal Data only on the documented instructions of the Controller, including with regard to transfers of Personal Data to a third country or international organisation, unless required to do so by the Applicable Data Protection Law. The Processor shall inform the Controller prior to any such required processing, unless applicable law prohibits such information on important public interest grounds.

2.3 The Processor shall promptly notify the Controller if, in the Processor's opinion, any instruction of the Controller infringes the Applicable Data Protection Law.

3. OBLIGATIONS OF THE PROCESSOR

3.1 The Processor shall:

(a) process the Personal Data only for the Permitted Purpose and in accordance with the Controller's documented instructions;

(b) ensure that persons authorised to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;

(c) implement and maintain appropriate technical and organisational security measures appropriate to the risk presented by the processing, in accordance with Article 32 of the EU GDPR, including without limitation: (i) pseudonymisation and encryption of Personal Data; (ii) ability to ensure ongoing confidentiality, integrity, availability, and resilience of processing systems and services; (iii) ability to restore availability and access to Personal Data in a timely manner in the event of a physical or technical incident; (iv) a process for regularly testing, assessing, and evaluating the effectiveness of technical and organisational measures for ensuring the security of processing;

(d) not engage any Sub-processor without the prior specific written authorisation of the Controller. Where the Controller has given general written authorisation for the engagement of Sub-processors, the Processor shall notify the Controller of any intended changes concerning the addition or replacement of Sub-processors, thereby giving the Controller the opportunity to object. The Processor shall impose on each Sub-processor data protection obligations at least as protective as those set out in this Addendum;

(e) taking into account the nature of the processing and the information available to the Processor, assist the Controller in fulfilling the Controller's obligations under Articles 32 to 36 of the EU GDPR, including without limitation: (i) obligations to respond to requests from Data Subjects exercising their rights; (ii) obligations to notify Personal Data Breaches to the supervisory authority and, where applicable, to Data Subjects; (iii) obligations to carry out data protection impact assessments; and (iv) obligations to consult with the supervisory authority prior to processing;

(f) at the Controller's election, delete or return all Personal Data to the Controller upon the termination or expiry of this Addendum, and delete existing copies unless applicable law requires continued storage of the Personal Data;

(g) make available to the Controller all information necessary to demonstrate compliance with the obligations set out in this Addendum and allow for and contribute to the conduct of audits, including inspections, conducted by the Controller or another auditor mandated by the Controller;

(h) immediately notify the Controller upon becoming aware of a Personal Data Breach, and in any event within [{{security.breachNotificationHours}}] hours of becoming aware;

(i) designate a data protection officer if required under Article 37 of the EU GDPR, and notify the Controller of the name and contact details of such officer;

(j) [{{processor.additionalObligationsText}}].

3.2 The Processor shall designate a point of contact for data protection matters accessible to the Controller at [{{processor.contactEmail}}].

4. SUB-PROCESSORS

4.1 The Processor shall not engage any Sub-processor without the prior written authorisation of the Controller (whether specific or general).

4.2 Where the Processor engages an authorised Sub-processor, the Processor shall impose on that Sub-processor the same data protection obligations as are imposed on the Processor under this Addendum, in particular providing sufficient guarantees to implement appropriate technical and organisational measures.

4.3 The Processor shall remain fully liable to the Controller for the performance of any Sub-processor's obligations.

4.4 The Processor shall maintain a register of all Sub-processors engaged in the processing of Personal Data under this Addendum, and shall make such register available to the Controller upon request.

4.5 [{{subprocessor.additionalSubprocessorText}}]

5. TRANSFERS OF PERSONAL DATA

5.1 The Processor shall not transfer Personal Data to a third country or international organisation outside the European Economic Area without the prior written consent of the Controller, unless such transfer is permitted under Chapter V of the EU GDPR.

5.2 Where Personal Data is transferred to a third country pursuant to Article 49 of the EU GDPR, the Processor shall ensure that the transfer is necessary for the establishment, exercise, or defence of legal claims, and shall notify the Controller of such transfer.

5.3 Where the Processor relies on Standard Contractual Clauses approved by the European Commission for a transfer of Personal Data to a third country, the Processor shall comply with the applicable transfer mechanism set out in Annex II.

5.4 [{{transfers.additionalTransferText}}]

6. ASSISTANCE TO DATA SUBJECTS

6.1 Taking into account the nature of the processing, the Processor shall assist the Controller by implementing appropriate technical and organisational measures for the fulfilment of the Controller's obligation to respond to requests from Data Subjects exercising their rights under Chapter III of the EU GDPR.

6.2 The Processor shall not respond to requests from Data Subjects directly except with the Controller's prior written authorisation.

7. DATA PROTECTION IMPACT ASSESSMENT AND PRIOR CONSULTATION

7.1 The Processor shall, taking into account the nature of the processing and the information available to the Processor, assist the Controller in complying with the Controller's obligations under Articles 35 and 36 of the EU GDPR to conduct data protection impact assessments and to consult with the supervisory authority prior to processing.

8. CONFIDENTIALITY

8.1 The Processor shall ensure that any person it authorises to process Personal Data under this Addendum is subject to an obligation of confidentiality.

8.2 The obligations of confidentiality shall survive the termination or expiry of this Addendum and the Principal Agreement.

9. AUDIT

9.1 The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations set out in this Addendum and shall allow for and contribute to the conduct of audits, including inspections, in accordance with this Clause 9.

9.2 Audits shall be conducted: (a) during normal business hours; (b) with reasonable prior notice of not less than [{{audit.noticeDays}}] Business Days; (c) in a manner that does not unreasonably disrupt the Processor's business operations.

9.3 [{{audit.additionalAuditText}}]

10. LIABILITIES AND INDEMNIFICATION

10.1 Each Party shall be liable for any breach of its obligations under the Applicable Data Protection Law.

10.2 The Processor shall indemnify the Controller from and against any and all claims, damages, losses, costs, fines, and expenses arising out of or relating to the Processor's breach of any of its obligations under this Addendum or the Applicable Data Protection Law.

11. GENERAL

11.1 This Addendum shall be governed by and construed in accordance with the laws of [{{legal.governingLaw}}].

11.2 Any dispute arising out of or relating to this Addendum shall be subject to the dispute resolution provisions of the Principal Agreement.

IN WITNESS WHEREOF the Parties have executed this Addendum as of the date first written above.

For and on behalf of [{{party.controller.name}}]:

Signature: _______________________________
Name: [{{signatures.controllerSignatoryName}}]
Title: [{{signatures.controllerSignatoryTitle}}]
Date: [{{dates.addendumDate}}]

For and on behalf of [{{party.processor.name}}]:

Signature: _______________________________
Name: [{{signatures.processorSignatoryName}}]
Title: [{{signatures.processorSignatoryTitle}}]
Date: [{{dates.addendumDate}}]

ANNEX I — SCOPE AND NATURE OF PROCESSING

Subject matter of processing: [{{schedule.subjectMatter}}]

Nature of processing: [{{schedule.natureOfProcessing}}]

Purpose of processing: [{{schedule.purposeOfProcessing}}]

Categories of Data Subjects: [{{schedule.categoriesOfDataSubjects}}]

Categories of Personal Data: [{{schedule.categoriesOfPersonalData}}]

Special category data (if any): [{{schedule.specialCategoryData}}]

Duration of processing: [{{schedule.durationOfProcessing}}]

ANNEX II — TRANSFER MECHANISM

[{{annex.transferMechanism}}]

---
Template document. Not legal advice. Not suitable if: the Processor processes special category data under Article 9 EU GDPR without adequate additional appropriate safeguards documented in this Addendum and Annex I; the processing involves regular transfers of personal data to third countries for which Standard Contractual Clauses or other appropriate safeguards under Chapter V EU GDPR are required — a transfer impact assessment may also be required; the Processor acts as a controller in its own right for any processing beyond the strict instructions of the Controller — a joint controller arrangement under Article 26 EU GDPR would be required. This template must be reviewed by a qualified data protection lawyer before use, particularly in relation to the applicable Member State law. Jurisdiction: European Union (GDPR / Member State: [{{legal.memberState}}]).`;

const LEGEND_DPA_EU = [
  { path: 'party.controller.name', label: 'Data controller legal name', type: 'string', required: true, example: 'Meridian Capital GmbH' },
  { path: 'party.processor.name', label: 'Data processor legal name', type: 'string', required: true, example: 'Harbour Digital OÜ' },
  { path: 'references.msaDate', label: 'Principal agreement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'security.breachNotificationHours', label: 'Breach notification deadline (hours)', type: 'number', required: false, example: 24 },
  { path: 'processor.additionalObligationsText', label: 'Additional processor obligations', type: 'text', required: false, example: 'The Processor shall maintain records of all processing activities carried out on behalf of the Controller in accordance with Article 30 of the EU GDPR.' },
  { path: 'processor.contactEmail', label: 'Processor data protection contact email', type: 'string', required: false, example: 'dataprotection@harourdigital.eu' },
  { path: 'subprocessor.additionalSubprocessorText', label: 'Additional sub-processor text', type: 'text', required: false, example: 'The following Sub-processors are currently authorised: Amazon Web Services EMEA SARL (cloud infrastructure); Microsoft Ireland Operations Ltd (office productivity tools).' },
  { path: 'transfers.additionalTransferText', label: 'Additional transfer text', type: 'text', required: false, example: 'Transfers of Personal Data to the United States are conducted under EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) as the appropriate transfer mechanism.' },
  { path: 'audit.noticeDays', label: 'Audit notice period (Business Days)', type: 'number', required: false, example: 15 },
  { path: 'audit.additionalAuditText', label: 'Additional audit text', type: 'text', required: false, example: 'The Processor shall provide the Controller with an annual summary report of its data processing activities upon request.' },
  { path: 'signatures.controllerSignatoryName', label: 'Controller signatory name', type: 'string', required: true, example: 'Franz Wilhelm Hartmann' },
  { path: 'signatures.controllerSignatoryTitle', label: 'Controller signatory title', type: 'string', required: true, example: 'Geschäftsführer (Managing Director)' },
  { path: 'signatures.processorSignatoryName', label: 'Processor signatory name', type: 'string', required: true, example: 'Anna Liisa Korhonen' },
  { path: 'signatures.processorSignatoryTitle', label: 'Processor signatory title', type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.addendumDate', label: 'Addendum execution date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'legal.originalLanguage', label: 'Original language of this Addendum', type: 'string', required: true, example: 'English' },
  { path: 'legal.governingLanguage', label: 'Governing language for inconsistencies', type: 'string', required: true, example: 'English' },
  { path: 'legal.governingLaw', label: 'Governing law (Member State)', type: 'string', required: true, example: 'Germany' },
  { path: 'legal.memberState', label: 'Relevant EU Member State', type: 'string', required: true, example: 'Germany' },
  { path: 'schedule.subjectMatter', label: 'Subject matter of processing', type: 'text', required: true, example: 'The provision of cloud-based data analytics and reporting services by the Processor to the Controller under the Principal Agreement.' },
  { path: 'schedule.natureOfProcessing', label: 'Nature of processing', type: 'text', required: true, example: 'Collecting, recording, organising, structuring, storing, adapting, altering, retrieving, consulting, using, disclosing by transmission, disseminating, making available, aligning, restricting, erasing, and destroying personal data.' },
  { path: 'schedule.purposeOfProcessing', label: 'Purpose of processing', type: 'text', required: true, example: 'To provide data analytics and business intelligence reporting services to the Controller as described in Statement of Work [X] attached to the Principal Agreement.' },
  { path: 'schedule.categoriesOfDataSubjects', label: 'Categories of Data Subjects', type: 'text', required: true, example: 'Clients and customers of the Controller; employees of the Controller; business contacts of the Controller.' },
  { path: 'schedule.categoriesOfPersonalData', label: 'Categories of Personal Data', type: 'text', required: true, example: 'Names; email addresses; job titles; business telephone numbers; business postal addresses; purchase histories; service usage records.' },
  { path: 'schedule.specialCategoryData', label: 'Special category data', type: 'text', required: false, example: 'None. The Processor does not process special category data on behalf of the Controller.' },
  { path: 'schedule.durationOfProcessing', label: 'Duration of processing', type: 'text', required: true, example: 'For the duration of the Principal Agreement and for such further period as is necessary for the resolution of any claims or regulatory investigations.' },
  { path: 'annex.transferMechanism', label: 'Transfer mechanism for third country transfers', type: 'text', required: false, example: 'Transfers to the United States of America are conducted under EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914, Module 2 (Controller-to-Processor)), entered into between the Controller and the Processor as the data exporter and the sub-processor as the data importer.' },
];

async function main() {
  const PRODUCT = await prisma.product.findUnique({ where: { slug: 'data-processing-addendum' } });
  const TEMPLATE = await prisma.template.findFirst({ where: { productId: PRODUCT.id, jurisdiction: 'EU' } });

  // Check if DPA EU already has content we seeded
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: TEMPLATE.id }, orderBy: { version: 'desc' } });
  if (existing && existing.isActive && existing.bodyTemplate && existing.bodyTemplate.length > 100) {
    console.log('[SKIP] data-processing-addendum (EU) already has content');
    return;
  }

  // Create v2 (v1 exists but is empty)
  const v2 = await prisma.templateVersion.create({
    data: {
      templateId: TEMPLATE.id,
      version: 2,
      isActive: true,
      rendererType: 'HANDLEBARS',
      outputFormat: 'PDF',
      inputSchemaJson: {},
      placeholderLegend: { version: 1, items: LEGEND_DPA_EU },
      bodyTemplate: DPA_EU,
      promptTemplate: '',
      lastValidatedAt: new Date(),
      lastValidationErrors: [],
    },
  });
  // Deactivate v1
  if (existing) await prisma.templateVersion.update({ where: { id: existing.id }, data: { isActive: false } });
  console.log('[OK] data-processing-addendum (EU) v2 — ' + v2.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());