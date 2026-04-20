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

// ─── MASTER SERVICES AGREEMENT — US ─────────────────────────────────────────

const MSA_US = `MASTER SERVICES AGREEMENT

Title: Master Services Agreement
Version: 1
Jurisdiction: United States of America

Date: [{{dates.agreementDate}}]

THIS AGREEMENT is made between [{{party.client.name}}] ("Client") and [{{party.supplier.name}}] ("Supplier").

RECITALS

WHEREAS Client wishes to engage Supplier to provide the Services described herein and in any Statement of Work entered into pursuant to this Agreement; and

WHEREAS Supplier has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. DEFINITIONS

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliate" means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Change Order" means a written change order executed by both Parties in accordance with the Change Order Procedure;

(c) "Change Order Procedure" means the procedure for requesting and approving changes to the Services or any Statement of Work, as set forth in Section [{{definitions.changeOrderSection}}];

(d) "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, in any form, that is designated as confidential or would reasonably be understood to be confidential;

(e) "Deliverables" means all work product, deliverables, and materials created by Supplier in the performance of the Services;

(f) "Effective Date" means [{{terms.effectiveDate}}];

(g) "Fees" means the fees payable by Client to Supplier for the Services as specified in the applicable Statement of Work;

(h) "Force Majeure Event" has the meaning given in Section 17.8;

(i) "Intellectual Property Rights" means all patents, copyrights, trade secrets, trade marks, service marks, design rights, database rights, rights in Confidential Information, and all other intellectual property rights throughout the world;

(j) "Losses" means all losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees);

(k) "Services" means the services to be provided by Supplier under this Agreement, as described in any Statement of Work;

(l) "Statement of Work" means each statement of work entered into by the Parties pursuant to this Agreement;

(m) "Subcontractor" means any third-party subcontractor engaged by Supplier to perform any portion of the Services;

(n) "Term" means the period specified in Section 2.

1.2 References to Sections are to sections of this Agreement. Headings are for convenience only.

2. TERM

2.1 This Agreement shall commence on the Effective Date and shall continue for an initial term of [{{terms.initialTermMonths}}] months, unless earlier terminated in accordance with Section 19.

2.2 This Agreement shall automatically renew for successive periods of [{{terms.renewalPeriodMonths}}] months unless either Party gives not less than [{{terms.renewalNoticeDays}}] days' written notice to the other Party prior to the end of the then-current term.

3. SERVICES

3.1 Supplier shall provide the Services in accordance with: (a) this Agreement; (b) the applicable Statement of Work; (c) the standard of care set forth in Section 9; (d) all applicable federal, state, and local laws and regulations.

3.2 Each Statement of Work shall be in the form prescribed by Exhibit [{{terms.sowExhibit}}] and shall be deemed incorporated into and governed by this Agreement.

3.3 Supplier shall: (a) perform the Services in a professional and workmanlike manner, with the degree of skill and judgment normally exercised by reputable suppliers of similar services; (b) allocate sufficient resources to perform the Services; (c) comply with all reasonable directions of Client; (d) promptly notify Client of any circumstances that may affect the timely or proper performance of the Services; (e) maintain appropriate quality management systems.

3.4 Client shall: (a) provide Supplier with timely access to such information, premises, systems, and personnel as are reasonably necessary for the performance of the Services; (b) provide timely decisions and approvals; (c) designate a representative with authority to make decisions on behalf of Client.

4. CHANGE ORDERS

4.1 Either Party may request changes to the Services or any Statement of Work by submitting a written change request to the other Party.

4.2 No change shall be effective unless and until a Change Order is executed by authorised representatives of both Parties.

4.3 If any change requested by Client affects the Fees, the scope of the Services, or the delivery schedule, Supplier shall, prior to performing any changed Services, provide Client with a written estimate of the impact of such change on the Fees, scope, and schedule.

5. FEES AND PAYMENT

5.1 Client shall pay Supplier the Fees as specified in the applicable Statement of Work.

5.2 Unless otherwise specified: (a) all Fees are exclusive of all taxes, levies, and duties; (b) Supplier shall invoice Client monthly in arrears; (c) each invoice shall be payable within [{{payment.paymentDays}}] days of receipt; (d) all payments shall be made in USD by wire transfer or ACH to the account specified in Exhibit [{{payment.accountExhibit}}]; (e) late payments shall bear interest at the rate of [{{payment.interestRate}}]% per month or the maximum rate permitted by applicable law, whichever is less.

5.3 All Fees are non-cancellable and non-refundable except as expressly stated in this Agreement.

5.4 Client may dispute any invoice in good faith by written notice within [{{payment.disputeDays}}] days of receipt, specifying the reasons. The Parties shall resolve any undisputed portion in accordance with Section 5.2. Supplier shall not suspend performance of the Services solely because of a disputed invoice.

5.5 Client shall be responsible for all taxes, levies, and duties imposed on the Services or the Fees, excluding only taxes based on Supplier's net income.

6. INTELLECTUAL PROPERTY

6.1 Pre-existing Intellectual Property. Each Party retains all rights in its own pre-existing Intellectual Property ("Background IP"). Nothing in this Agreement transfers or assigns any Background IP from one Party to the other.

6.2 Client Materials. All materials, data, and information provided by Client to Supplier in connection with this Agreement ("Client Materials") shall remain the exclusive property of Client. Client hereby grants to Supplier a limited, non-exclusive, revocable licence to use the Client Materials solely for the purpose of performing the Services.

6.3 Deliverables. All Deliverables created by Supplier in the performance of the Services that do not incorporate or are not derived from Client Materials ("Independent Deliverables") shall be owned by Supplier, and Supplier hereby grants to Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Independent Deliverables. All Deliverables that incorporate or are derived from Client Materials ("Client Deliverables") shall be owned by Client. Supplier hereby assigns to Client all right, title, and interest in and to the Client Deliverables.

6.4 Feedback. Client grants to Supplier a royalty-free, non-exclusive licence to use any feedback, suggestions, or ideas provided by Client in connection with the Services for the purpose of improving Supplier's services.

6.5 No Implied Licences. Except as expressly set forth in this Agreement, neither Party grants to the other any licence or other right under any Intellectual Property Rights.

7. CONFIDENTIALITY

7.1 Each Party shall: (a) keep the other Party's Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the purposes of this Agreement; (d) protect it with at least the same degree of care as it applies to its own confidential information, and in any event no less than reasonable care; (e) limit disclosure of Confidential Information to those employees, agents, and subcontractors who have a need to know and who are bound by confidentiality obligations at least as protective as those set forth herein.

7.2 The obligations of confidentiality shall not apply to information that: (a) is or becomes generally available to the public through no act of the Receiving Party; (b) was known to the Receiving Party prior to disclosure by the Disclosing Party; (c) is received from a third party without breach of confidentiality; (d) is required to be disclosed by federal or state law, regulation, or court order (provided the Receiving Party gives the Disclosing Party prompt written notice to allow the Disclosing Party to seek a protective order).

7.3 The Parties acknowledge that Confidential Information is proprietary and that unauthorised disclosure would cause irreparable harm. Accordingly, in addition to any other remedy available at law or in equity, the Disclosing Party shall be entitled to seek injunctive relief without the necessity of posting a bond.

7.4 Upon termination of this Agreement, each Party shall, at the Disclosing Party's election, return or certify the destruction of all Confidential Information of the Disclosing Party.

8. DATA PRIVACY

8.1 If the Services involve the processing of personal data (as defined under applicable U.S. state privacy laws, including without limitation the California Consumer Privacy Act (CCPA) and any successor legislation), Supplier shall process such personal data only on the documented instructions of Client and in accordance with all applicable U.S. federal and state privacy laws.

8.2 Supplier shall implement and maintain appropriate technical and organizational security measures to protect personal data against unauthorized access, use, or disclosure.

8.3 Supplier shall notify Client promptly, and in any event within [{{data.breachNotificationHours}}] hours, upon becoming aware of any actual or suspected personal data breach affecting Client's data.

8.4 The Parties shall execute a Data Processing Addendum in the form attached as Exhibit [{{data.dpaExhibit}}] if required by applicable privacy law.

9. WARRANTIES

9.1 Mutual Warranties. Each Party warrants that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes valid and binding obligations; (c) the execution of this Agreement will not breach any other agreement to which it is a party.

9.2 Supplier Warranties. Supplier warrants that: (a) the Services will be performed in a professional and workmanlike manner, with the degree of skill and judgment normally exercised by reputable suppliers of similar services; (b) the Services and Deliverables will not infringe the Intellectual Property Rights of any third party; (c) Supplier has and will maintain all necessary resources, licences, and permissions to perform the Services; (d) the Supplier's personnel are appropriately skilled and experienced; (e) to Supplier's knowledge, there is no pending or threatened claim that the Services or Deliverables infringe the Intellectual Property Rights of any third party.

9.3 Warranty Disclaimer. EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, ALL WARRANTIES, CONDITIONS, AND REPRESENTATIONS, WHETHER EXPRESS OR IMPLIED BY STATUTE, COMMON LAW, OR OTHERWISE, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, ARE HEREBY DISCLAIMED TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

10. LIMITATION OF LIABILITY

10.1 Exclusion of Consequential Damages. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF GOODWILL, LOSS OF DATA, OR COST OF SUBSTITUTE SERVICES, ARISING OUT OF OR RELATING TO THIS AGREEMENT, REGARDLESS OF WHETHER SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

10.2 Cap on Direct Damages. EXCEPT FOR BREACHES OF SECTION 7 (CONFIDENTIALITY), EITHER PARTY'S TOTAL AGGREGATE LIABILITY UNDER OR IN CONNECTION WITH THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF: (a) USD $[{{liability.capUSD}}]; OR (b) THE TOTAL FEES PAID OR PAYABLE UNDER THE APPLICABLE STATEMENT OF WORK IN THE [{{liability.capPeriodMonths}}] MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.

10.3 Exceptions. The limitations set forth in Sections 10.1 and 10.2 shall not apply to: (a) death or personal injury caused by negligence; (b) fraud; (c) breach of Section 7 (Confidentiality), where the remedy of injunctive relief shall remain available without limitation; (d) any other liability that cannot be limited or excluded by applicable law.

11. INDEMNIFICATION

11.1 Supplier Indemnification. Supplier shall indemnify, defend, and hold harmless Client and its Affiliates and their respective officers, directors, employees, and agents from and against any and all Losses arising out of or relating to: (a) Supplier's breach of any warranty, representation, or obligation under this Agreement; (b) any third-party claim that the Services or Deliverables infringe the Intellectual Property Rights of such third party; (c) any negligent or wrongful act or omission of Supplier or its personnel or Subcontractors.

11.2 Client Indemnification. Client shall indemnify, defend, and hold harmless Supplier and its Affiliates and their respective officers, directors, employees, and agents from and against any and all Losses arising out of or relating to: (a) Client's breach of this Agreement; (b) any negligent or wrongful act or omission of Client or its personnel.

11.3 Indemnification Procedure. The indemnified Party shall: (a) promptly notify the indemnifying Party of any claim for which indemnification is sought; (b) allow the indemnifying Party to control the defence and settlement of such claim; (c) cooperate fully with the indemnifying Party in the defence of such claim. The indemnifying Party shall not settle any claim in a manner that imposes any obligation or liability on the indemnified Party without the indemnified Party's prior written consent.

12. INSURANCE

12.1 Supplier Insurance. Supplier shall maintain at its own cost throughout the Term: (a) commercial general liability insurance with limits of not less than USD $[{{insurance.generalLiabilityLimit}}] per occurrence and USD $[{{insurance.generalLiabilityAggregate}}] in the aggregate; (b) professional liability (errors and omissions) insurance with limits of not less than USD $[{{insurance.professionalLiabilityLimit}}] per claim and in the aggregate; (c) workers' compensation insurance as required by applicable law; (d) [{{insurance.additionalInsuranceText}}].

12.2 Evidence of Insurance. Supplier shall provide certificates of insurance to Client upon request and at least [{{insurance.certificateRenewalDays}}] days prior to the expiration of any policy.

13. SUBCONTRACTORS

13.1 Supplier may engage Subcontractors to perform any portion of the Services without Client's prior written consent, provided that: (a) Supplier remains fully responsible for the performance of each Subcontractor; (b) each Subcontractor is bound by obligations at least as protective as those set forth in this Agreement; (c) Supplier notifies Client of any Subcontractor that will have access to Client's Confidential Information or personal data.

14. SUSPENSION

14.1 Supplier may suspend the Services: (a) in whole or in part, if Client fails to pay any sum due and payable under this Agreement, where such failure continues for more than [{{suspension.failureDays}}] days after written notice from Supplier; (b) in whole, if Supplier reasonably believes that the continuation of the Services would result in a violation of applicable law. Suspension under clause (a) shall not relieve Client of its obligation to pay the Fees during the period of suspension. The Term shall be extended by the period of any suspension caused by Client's failure.

15. TERMINATION

15.1 Termination for Convenience. Either Party may terminate this Agreement for convenience upon [{{termination.convenienceNoticeDays}}] days' written notice to the other Party.

15.2 Termination for Cause. Either Party may terminate this Agreement immediately by written notice to the other Party if: (a) the other Party commits a material breach of this Agreement and fails to remedy such breach within [{{termination.breachCureDays}}] days after written notice specifying the breach; or (b) the other Party becomes insolvent, makes an assignment for the benefit of creditors, or becomes subject to any bankruptcy, reorganization, or insolvency proceeding.

15.3 Termination for Force Majeure. If a Force Majeure Event continues for more than [{{termination.forceMajeureDays}}] days, either Party may terminate this Agreement on written notice to the other Party.

16. CONSEQUENCES OF TERMINATION

16.1 Upon termination of this Agreement for any reason:

(a) Client shall pay Supplier all Fees properly due for Services performed up to the date of termination, and for any non-cancellable commitments made by Supplier prior to receipt of notice of termination;

(b) each Party shall return to the other all Confidential Information and other materials belonging to the other Party;

(c) Supplier shall deliver to Client all completed and in-progress Deliverables;

(d) each Party shall cease all use of the other Party's Background IP and trade marks;

(e) the provisions of Sections 6 (Intellectual Property), 7 (Confidentiality), 9 (Warranties Disclaimer), 10 (Limitation of Liability), 11 (Indemnification), and 18 (General) shall survive termination.

17. GENERAL

17.1 Independent Contractor. Supplier is an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, agency, employment, or franchise relationship between the Parties.

17.2 Entire Agreement. This Agreement, together with all Exhibits and Statements of Work incorporated herein, constitutes the entire agreement between the Parties.

17.3 Amendment. No amendment or modification of this Agreement shall be effective unless in writing and signed by both Parties.

17.4 Waiver and Severability. No waiver by either Party of any breach shall be construed as a waiver of any subsequent breach. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

17.5 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party, except that either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets. Any purported assignment in violation of this Section shall be void.

17.6 Notices. All notices shall be in writing and shall be deemed delivered: (a) upon personal delivery; (b) upon receipt if sent by certified or registered mail, return receipt requested; (c) upon confirmation of transmission if sent by email (with a copy sent by another method in this Section). Notices shall be sent to the addresses set forth above or as updated by written notice.

17.7 No Third-Party Beneficiaries. This Agreement is for the sole benefit of the Parties and their respective successors and permitted assigns. Nothing in this Agreement shall confer any rights on any third party.

17.8 Force Majeure. Neither Party shall be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay results from circumstances beyond the reasonable control of that Party, including without limitation acts of God, fire, flood, earthquake, pandemic, war, terrorism, government action, or failure of third-party telecommunications. The affected Party shall give prompt written notice and shall use reasonable efforts to mitigate the effects of the force majeure event.

17.9 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}], without regard to its conflict of laws principles.

17.10 Jurisdiction and Venue. Each Party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in [{{legal.jurisdictionCity}}], [{{legal.governingState}}] for any action or proceeding arising out of or relating to this Agreement. Each Party waives any objection to the laying of venue in such courts and any claim that such courts are an inconvenient forum.

17.11 Waiver of Jury Trial. EACH PARTY HEREBY WAIVES ITS RIGHT TO A JURY TRIAL IN ANY ACTION OR PROCEEDING ARISING OUT OF OR RELATING TO THIS AGREEMENT.

17.12 Attorneys' Fees. In any action to enforce this Agreement, the prevailing Party shall be entitled to recover from the non-prevailing Party its reasonable attorneys' fees and costs.

17.13 Counterparts. This Agreement may be executed in counterparts, each of which shall constitute an original. Electronic signatures shall be deemed original signatures for all purposes.

17.14 Construction. The Parties have had the opportunity to review and negotiate the terms of this Agreement. In the event of any ambiguity, this Agreement shall not be construed for or against either Party.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

CLIENT:

[{{party.client.name}}]

By: _______________________________
Name: [{{signatures.clientSignatoryName}}]
Title: [{{signatures.clientSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

SUPPLIER:

[{{party.supplier.name}}]

By: _______________________________
Name: [{{signatures.supplierSignatoryName}}]
Title: [{{signatures.supplierSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Services are for a government client with specific FAR/DFAR compliance requirements; the arrangement involves the processing of protected health information (PHI) under HIPAA; the Services involve the handling of consumer financial data subject to GLBA; the Supplier is a contingent worker agency with specific compliance obligations under applicable state and federal employment laws. This template reflects general U.S. commercial practice and must be reviewed by a qualified attorney before use. Jurisdiction: United States of America (adapt for specific state law).`;

const LEGEND: LegendItem[] = [
  { path: 'party.client.name', label: "Client legal name", type: 'string', required: true, example: 'Apex Financial Services LLC' },
  { path: 'party.supplier.name', label: "Supplier legal name", type: 'string', required: true, example: 'TechBridge Solutions Inc.' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.initialTermMonths', label: 'Initial term (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.renewalPeriodMonths', label: 'Auto-renewal period (months)', type: 'number', required: false, example: 12 },
  { path: 'terms.renewalNoticeDays', label: 'Renewal notice period (days)', type: 'number', required: false, example: 60 },
  { path: 'terms.sowExhibit', label: 'Statement of Work exhibit reference', type: 'string', required: false, example: 'A' },
  { path: 'definitions.changeOrderSection', label: 'Change order procedure section reference', type: 'string', required: false, example: '4.1' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.interestRate', label: 'Monthly interest rate on late payments (%)', type: 'number', required: false, example: 1.5 },
  { path: 'payment.disputeDays', label: 'Invoice dispute period (days)', type: 'number', required: false, example: 15 },
  { path: 'payment.accountExhibit', label: 'Payment account exhibit reference', type: 'string', required: false, example: 'B' },
  { path: 'data.breachNotificationHours', label: 'Breach notification period (hours)', type: 'number', required: false, example: 72 },
  { path: 'data.dpaExhibit', label: 'Data processing addendum exhibit reference', type: 'string', required: false, example: 'C' },
  { path: 'liability.capUSD', label: 'Liability cap (USD)', type: 'number', required: true, example: 1000000 },
  { path: 'liability.capPeriodMonths', label: 'Liability cap period (months)', type: 'number', required: false, example: 12 },
  { path: 'insurance.generalLiabilityLimit', label: 'GL per occurrence limit (USD)', type: 'number', required: true, example: 2000000 },
  { path: 'insurance.generalLiabilityAggregate', label: 'GL aggregate limit (USD)', type: 'number', required: true, example: 5000000 },
  { path: 'insurance.professionalLiabilityLimit', label: 'PL limit (USD)', type: 'number', required: true, example: 3000000 },
  { path: 'insurance.additionalInsuranceText', label: 'Additional insurance text', type: 'text', required: false, example: 'cyber liability insurance with limits of not less than USD 2,000,000 per occurrence and in the aggregate' },
  { path: 'insurance.certificateRenewalDays', label: 'Insurance certificate renewal notice (days)', type: 'number', required: false, example: 30 },
  { path: 'suspension.failureDays', label: 'Payment failure grace period (days)', type: 'number', required: false, example: 15 },
  { path: 'termination.convenienceNoticeDays', label: 'Convenience termination notice (days)', type: 'number', required: false, example: 30 },
  { path: 'termination.breachCureDays', label: 'Breach cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'termination.forceMajeureDays', label: 'Force majeure termination period (days)', type: 'number', required: false, example: 60 },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Michael David Thornton' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Chief Operating Officer' },
  { path: 'signatures.supplierSignatoryName', label: "Supplier signatory name", type: 'string', required: true, example: 'Rachel Ann Mitchell' },
  { path: 'signatures.supplierSignatoryTitle', label: "Supplier signatory title", type: 'string', required: true, example: 'President and CEO' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'Delaware' },
  { path: 'legal.jurisdictionCity', label: 'Jurisdiction city', type: 'string', required: false, example: 'Wilmington, New Castle County' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const SLUG = 'master-services-agreement';
  const TITLE = 'Master Services Agreement';
  const CATEGORY = 'Corporate & Commercial';
  const JURISDICTION = 'US';
  const LABEL = 'United States of America (general template)';

  const product = await prisma.product.upsert({
    where: { slug: SLUG },
    update: { status: ProductStatus.PUBLISHED, title: TITLE, category: CATEGORY },
    create: { slug: SLUG, title: TITLE, category: CATEGORY, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction: JURISDICTION } });
  if (!template) template = await prisma.template.create({ data: { productId: product.id, jurisdiction: JURISDICTION, name: TITLE, description: LABEL } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] ' + SLUG); return; }
  const v = await prisma.templateVersion.create({
    data: { version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(LEGEND), bodyTemplate: MSA_US, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(LEGEND)).issues;
  if (issues.length) console.warn('[WARN]', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + SLUG + ' (US) — v=' + v.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());