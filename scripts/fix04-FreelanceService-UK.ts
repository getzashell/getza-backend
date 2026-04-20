import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─── Fix 4: Freelance Service Agreement UK (pre-existing, no body) ─────────────

const BODY = `FREELANCE SERVICE AGREEMENT

Title: Freelance Service Agreement
Version: 2
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.agreementDate}}]

THIS AGREEMENT is made between:

[{{party.client.name}}] of [{{party.client.address}}] (the "Client"); and

[{{party.contractor.name}}] of [{{party.contractor.address}}] (the "Contractor").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Client wishes to engage the Contractor to provide the Services (as defined below); and

WHEREAS the Contractor agrees to provide the Services to the Client on the terms and conditions set out in this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Agreement" means this Freelance Service Agreement, including the Schedules;

(b) "Business Day" means a day other than a Saturday, Sunday, or public holiday in England and Wales;

(c) "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, including without limitation information relating to the Client's business, finances, clients, suppliers, and employees;

(d) "Intellectual Property Rights" means all patents, registered and unregistered trade marks, design rights, copyright, database rights, rights in Confidential Information, and all other intellectual property rights;

(e) "Services" means the services to be provided by the Contractor to the Client as described in Schedule 1;

(f) "including" means "including without limitation".

1.2 The headings in this Agreement are for convenience only and shall not affect its interpretation.

2. ENGAGEMENT AND SCOPE OF SERVICES

2.1 The Client hereby engages the Contractor, and the Contractor agrees to provide the Services to the Client, on the terms and conditions of this Agreement.

2.2 The Contractor shall provide the Services:

(a) with reasonable care and skill;

(b) in accordance with the specifications described in Schedule 1;

(c) in accordance with any reasonable instructions of the Client;

(d) in compliance with all applicable laws, regulations, and codes of practice.

2.3 The Contractor shall provide the Services as an independent contractor and not as an employee, worker, agent, or partner of the Client. The Contractor shall be responsible for the Contractor's own tax, National Insurance, and social security contributions arising from payments made under this Agreement.

3. TERM AND TERMINATION

3.1 This Agreement shall commence on [{{dates.startDate}}] and, subject to Clause 3.2, shall continue until [{{terms.endDate}}] or until terminated in accordance with this Clause 3.

3.2 Either Party may terminate this Agreement:

(a) upon [{{terms.terminationNoticeDays}}] days' written notice to the other Party;

(b) immediately by written notice if the other Party commits a material breach of this Agreement and fails to remedy such breach (if capable of remedy) within [{{terms.remedyPeriodDays}}] days of receiving written notice specifying the breach;

(c) immediately by written notice if the other Party becomes insolvent, has a receiver or administrator appointed, or makes any arrangement with creditors.

3.3 Upon the termination of this Agreement for any reason:

(a) the Contractor shall promptly deliver to the Client all work in progress, deliverables, and other materials produced by the Contractor in connection with the Services;

(b) the Client shall pay the Contractor all fees due for Services provided up to the date of termination;

(c) Clauses 1 (Definitions), 5 (Confidentiality), 6 (Intellectual Property), 7 (Liability), and 8 (General) shall survive the termination of this Agreement.

4. FEES AND PAYMENT

4.1 The Client shall pay the Contractor fees at the rate of [{{fees.rate}}] per [{{fees.unit}}] (the "Fees"), exclusive of any applicable value added tax.

4.2 The Contractor shall submit invoices to the Client [{{fees.invoiceFrequency}}], itemising the Services performed and the Fees due.

4.3 The Client shall pay each invoice within [{{fees.paymentDays}}] days of receipt. Interest shall accrue on overdue amounts at [{{fees.interestRate}}]% per annum above the Bank of England base rate from time to time.

4.4 [{{fees.expensesText}}]

4.5 If the Client disputes any invoice, the Client shall notify the Contractor in writing within [{{fees.disputeDays}}] days of receipt, specifying the reasons for the dispute. The Parties shall endeavour to resolve any dispute in good faith. Undisputed amounts shall be paid in accordance with this Clause 4.

5. CONFIDENTIALITY

5.1 Each Party shall:

(a) keep the other Party's Confidential Information in strict confidence;

(b) not disclose the other Party's Confidential Information to any third party without the prior written consent of the disclosing Party;

(c) use the other Party's Confidential Information solely for the purposes of this Agreement;

(d) protect the other Party's Confidential Information with at least the same degree of care as it applies to its own confidential information, and in any event no less than reasonable care.

5.2 The obligations in Clause 5.1 shall not apply to information that:

(a) is or becomes generally available to the public through no act or omission of the Receiving Party;

(b) was known to the Receiving Party prior to disclosure;

(c) is received from a third party without breach of any confidentiality obligation;

(d) is required to be disclosed by applicable law, regulation, or court order, provided that the Receiving Party gives the disclosing Party prompt written notice (where permitted) and cooperates in seeking a protective order.

5.3 The Contractor acknowledges that the Client's Confidential Information is and shall remain the exclusive property of the Client.

6. INTELLECTUAL PROPERTY

6.1 All Intellectual Property Rights in any work product, deliverables, materials, and other works created by the Contractor in connection with the Services ("Contractor Works") shall vest in and belong to the Client absolutely.

6.2 The Contractor hereby assigns to the Client all right, title, and interest in and to the Contractor Works, including without limitation all Intellectual Property Rights therein, by way of present assignment of future rights.

6.3 The Contractor shall execute any documents and do any acts necessary to perfect the assignment of Intellectual Property Rights under Clause 6.1 and 6.2.

6.4 The Contractor warrants that the Contractor Works will not infringe any Intellectual Property Rights of any third party.

7. LIABILITY

7.1 Nothing in this Agreement shall limit or exclude either Party's liability for: (a) death or personal injury caused by negligence; (b) fraud; or (c) any other liability that cannot be limited or excluded by law.

7.2 Subject to Clause 7.1, neither Party shall be liable to the other for any indirect, consequential, incidental, or special losses or damages, including without limitation loss of profits, loss of revenue, loss of data, or loss of business opportunity.

7.3 Subject to Clause 7.1, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed [{{liability.capAmount}}].

8. GENERAL

8.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements, negotiations, and representations.

8.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by both Parties.

8.3 Waiver and Severability. No waiver by either Party of any breach shall constitute a waiver of any subsequent breach. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

8.4 Assignment. The Contractor may not assign or subcontract any of its rights or obligations under this Agreement without the prior written consent of the Client. The Client may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets.

8.5 Notices. All notices shall be in writing and served by personal delivery, pre-paid post, or email to the addresses specified in this Agreement.

8.6 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties submit to the exclusive jurisdiction of the courts of England and Wales.

8.7 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

IN WITNESS WHEREOF the Parties have executed this Agreement as a deed on the date first written above.

EXECUTED as a DEED by [{{party.client.name}}]
by [{{signatures.clientSignatoryName}}], [{{signatures.clientSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED as a DEED by [{{party.contractor.name}}]
by [{{signatures.contractorSignatoryName}}], [{{signatures.contractorSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SCHEDULE 1 — SERVICES AND SPECIFICATIONS

Description of Services: [{{schedule.servicesDescription}}]

Deliverables: [{{schedule.deliverables}}]

Timetable: [{{schedule.timetable}}]

Acceptance Criteria: [{{schedule.acceptanceCriteria}}]

---
Template document. Not legal advice. Not suitable if: the Contractor is genuinely an employee or worker within the meaning of the Employment Rights Act 1996 and the Income Tax (Earnings and Pensions) Act 2003 — HM Revenue & Customs may reclassify the engagement as employment for tax and National Insurance purposes (IR35/Off-Payroll Working Rules); the Services involve regulated activities requiring specific qualifications or licences; the Contractor will have access to personal data subject to the UK GDPR — a separate data processing agreement may be required. This template reflects general UK commercial practice for freelance service engagements and must be reviewed by a qualified solicitor before use, particularly in relation to IR35 status. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND = [
  { path: 'party.client.name', label: 'Client legal name', type: 'string', required: true, example: 'Apex Financial Services Ltd' },
  { path: 'party.client.address', label: 'Client address', type: 'text', required: true, example: '1 Canada Square, London, E14 5AB' },
  { path: 'party.contractor.name', label: 'Contractor legal name', type: 'string', required: true, example: 'Harbour Digital Ltd' },
  { path: 'party.contractor.address', label: 'Contractor address', type: 'text', required: true, example: 'Unit 4, 12 Sovereign Park, Manchester, M14 6TD' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'dates.startDate', label: 'Services commencement date', type: 'date', required: true, example: '2025-07-15' },
  { path: 'terms.endDate', label: 'Agreement end date', type: 'string', required: false, example: 'on completion of the Services (estimated 3 months from the Start Date)' },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'terms.remedyPeriodDays', label: 'Remedy period for breach (days)', type: 'number', required: false, example: 14 },
  { path: 'fees.rate', label: 'Fee rate', type: 'string', required: true, example: '£850' },
  { path: 'fees.unit', label: 'Fee unit', type: 'string', required: true, example: 'day' },
  { path: 'fees.invoiceFrequency', label: 'Invoice frequency', type: 'string', required: false, example: 'monthly in arrears' },
  { path: 'fees.paymentDays', label: 'Payment term (days)', type: 'number', required: false, example: 30 },
  { path: 'fees.interestRate', label: 'Late payment interest rate (%)', type: 'number', required: false, example: 2 },
  { path: 'fees.expensesText', label: 'Expenses text', type: 'text', required: false, example: 'The Client shall reimburse the Contractor for pre-approved, reasonably incurred travel and accommodation expenses, subject to the submission of receipts.' },
  { path: 'fees.disputeDays', label: 'Invoice dispute period (days)', type: 'number', required: false, example: 7 },
  { path: 'liability.capAmount', label: 'Liability cap', type: 'string', required: false, example: '£500,000' },
  { path: 'signatures.clientSignatoryName', label: 'Client signatory name', type: 'string', required: true, example: 'Charles Edward Harrington' },
  { path: 'signatures.clientSignatoryTitle', label: 'Client signatory title', type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.contractorSignatoryName', label: 'Contractor signatory name', type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.contractorSignatoryTitle', label: 'Contractor signatory title', type: 'string', required: true, example: 'Managing Director' },
  { path: 'schedule.servicesDescription', label: 'Description of Services', type: 'text', required: true, example: 'Provision of digital marketing strategy consultancy services, including without limitation the development of a comprehensive digital marketing plan, social media strategy, and content calendar for launch of the Client\'s new product line.' },
  { path: 'schedule.deliverables', label: 'Deliverables', type: 'text', required: true, example: 'A comprehensive digital marketing strategy document; a 12-month social media content calendar; a report on recommended digital advertising spend allocation across channels.' },
  { path: 'schedule.timetable', label: 'Project timetable', type: 'text', required: false, example: 'Kick-off meeting within 5 Business Days of the Start Date; draft strategy document within 20 Business Days; final deliverables within 30 Business Days.' },
  { path: 'schedule.acceptanceCriteria', label: 'Acceptance criteria', type: 'text', required: false, example: 'Deliverables will be reviewed by the Client within 10 Business Days of receipt. Acceptance will not be unreasonably withheld or delayed.' },
];

async function main() {
  const slug = 'freelance-service-agreement';
  const PRODUCT = await prisma.product.findUnique({ where: { slug } });
  if (!PRODUCT) { console.log('Product not found:', slug); return; }
  const TEMPLATE = await prisma.template.findFirst({ where: { productId: PRODUCT.id } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: TEMPLATE.id, isActive: true } });
  const maxVersion = await prisma.templateVersion.findFirst({
    where: { templateId: TEMPLATE.id },
    orderBy: { version: 'desc' },
  });
  const next = (maxVersion?.version ?? 0) + 1;
  const v = await prisma.templateVersion.create({
    data: {
      templateId: TEMPLATE.id, version: next, isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: 'PDF', inputSchemaJson: {},
      placeholderLegend: { version: 1, items: LEGEND },
      bodyTemplate: BODY, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });
  if (existing) await prisma.templateVersion.update({ where: { id: existing.id }, data: { isActive: false } });
  console.log('[OK] freelance-service-agreement (UK) v' + next + ' — ' + v.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());