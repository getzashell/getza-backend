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

// ─── MASTER SERVICES AGREEMENT — EU ───────────────────────────────────────────

const MSA_EU = `MASTER SERVICES AGREEMENT

Title: Master Services Agreement
Version: 1
Jurisdiction: European Union (General — for use across EU member states)

Date: [{{dates.agreementDate}}]

THIS AGREEMENT is made between:

(1) [{{party.client.name}}], [{{party.client.legalForm}}], registered in [{{party.client.country}}] with registration number [{{party.client.registrationNumber}}] and having its registered office at [{{party.client.registeredAddress}}] ("Client"); and

(2) [{{party.supplier.name}}], [{{party.supplier.legalForm}}], registered in [{{party.supplier.country}}] with registration number [{{party.supplier.registrationNumber}}] and having its registered office at [{{party.supplier.registeredAddress}}] ("Supplier").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Client wishes to engage the Supplier to provide the Services described herein and in any Statement of Work entered into pursuant to this Agreement;

WHEREAS the Supplier has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliate" means, in relation to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Business Day" means a day other than a Saturday, Sunday, or public holiday in the jurisdiction of [{{definitions.referenceJurisdiction}}];

(c) "Change Control Procedure" means the procedure for requesting and agreeing changes to a Statement of Work or the Services, as set out in Annex [{{definitions.changeControlAnnex}}];

(d) "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, in any form, that is designated as confidential or would reasonably be understood to be confidential;

(e) "Documentation" means all manuals, specifications, guides, and other documents supplied by the Supplier in connection with the Services;

(f) "Effective Date" means [{{terms.effectiveDate}}];

(g) "EU GDPR" means Regulation (EU) 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data and on the free movement of such data;

(h) "Fees" means the fees payable by the Client to the Supplier for the Services as specified in the applicable Statement of Work;

(i) "Force Majeure Event" has the meaning given in Clause 17.6;

(j) "Intellectual Property Rights" means all patents, supplementary protection certificates, registered trade marks, registered designs, copyright, rights in designs, database rights, rights in Confidential Information, and all other intellectual property rights throughout the world;

(k) "Personal Data" means any information relating to an identified or identifiable natural person as defined in Article 4(1) of the EU GDPR;

(l) "Services" means the services to be provided by the Supplier under this Agreement, as described in any Statement of Work;

(m) "Service Levels" means the service levels to be achieved by the Supplier in the performance of the Services, as specified in Annex [{{terms.serviceLevelsAnnex}}];

(n) "Statement of Work" means each statement of work entered into by the Parties pursuant to this Agreement in the form set out in Annex [{{terms.statementOfWorkAnnex}}];

(o) "Sub-processor" means any third party appointed by the Supplier to process Personal Data on behalf of the Client;

(p) "Term" means the period specified in Clause 2;

(q) "VAT" means value added tax chargeable under the applicable law of the relevant EU member state;

(r) "including" means "including without limitation".

1.2 References to Clauses and Annexes are to clauses of and annexes to this Agreement. Headings are for convenience only.

1.3 This Agreement shall be governed by the law of [{{definitions.governingLaw}}]. The provisions of the EU GDPR and the national data protection laws of [{{definitions.referenceJurisdiction}}] are incorporated into this Agreement to the extent applicable.

2. TERM

2.1 This Agreement shall commence on the Effective Date and shall continue for an initial term of [{{terms.initialTermMonths}}] months, unless earlier terminated in accordance with Clause 19.

2.2 This Agreement shall automatically renew for successive periods of [{{terms.renewalPeriodMonths}}] months unless either Party gives not less than [{{terms.renewalNoticeDays}}] days' written notice to the other Party prior to the end of the then-current term.

3. SERVICES

3.1 The Supplier shall provide the Services in accordance with: (a) this Agreement; (b) the applicable Statement of Work; (c) any applicable Service Levels; (d) all applicable laws and regulations in force in [{{definitions.referenceJurisdiction}}] and the European Union.

3.2 Each Statement of Work shall be substantially in the form set out in the Statement of Work Annex and shall be deemed incorporated into and governed by this Agreement.

3.3 The Supplier shall: (a) perform the Services with reasonable care and skill; (b) allocate sufficient resources to perform the Services; (c) comply with all reasonable directions of the Client; (d) promptly notify the Client of any circumstances that may affect the timely or proper performance of the Services; (e) maintain appropriate quality management systems.

3.4 The Client shall: (a) provide the Supplier with access to such information, premises, and systems as are reasonably necessary for the performance of the Services; (b) provide timely decisions and approvals; (c) comply with its obligations under this Agreement and any Statement of Work.

4. SERVICE LEVELS

4.1 The Supplier shall perform the Services to the Service Levels specified in the applicable Annex.

4.2 In the event of failure to meet the Service Levels, the Client shall be entitled to [{{terms.serviceCreditsText}}].

4.3 [{{terms.serviceLevelReviewText}}]

5. FEES AND PAYMENT

5.1 The Client shall pay the Fees to the Supplier as specified in the applicable Statement of Work.

5.2 Unless otherwise specified: (a) fees are stated exclusive of VAT, which shall be charged at the prevailing rate applicable in [{{payment.vatJurisdiction}}]; (b) the Supplier shall invoice the Client monthly in arrears; (c) each invoice shall be payable within [{{payment.paymentDays}}] days of receipt; (d) late payments shall bear interest at the rate of [{{payment.interestRate}}]% per annum above the base rate of the European Central Bank.

5.3 All Fees and other sums due under this Agreement are non-cancellable and non-refundable, except as expressly stated herein.

5.4 The Client may dispute any invoice in good faith by written notice within [{{payment.disputeDays}}] days of receipt, specifying the reasons. The Parties shall resolve any undisputed amount in accordance with Clause 5.2.

6. INTELLECTUAL PROPERTY

6.1 Client Intellectual Property. Each Party retains all rights in its own pre-existing Intellectual Property ("Background IP"). Nothing in this Agreement transfers or assigns any Background IP from one Party to the other.

6.2 New Materials. All materials, deliverables, and work product created by the Supplier in the performance of the Services that incorporate or are derived from Client Background IP ("New Materials") shall be owned by the Client. The Supplier hereby assigns to the Client all right, title, and interest in and to the New Materials, to the fullest extent permitted by applicable law.

6.3 Supplier Tools. The Supplier's pre-existing tools, methodologies, frameworks, and know-how ("Supplier Tools") shall remain the exclusive property of the Supplier. To the extent any Supplier Tools are incorporated in the New Materials, the Supplier hereby grants to the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Supplier Tools solely to the extent necessary to use the New Materials.

6.4 Feedback. The Client grants to the Supplier a royalty-free, non-exclusive licence to use any feedback, suggestions, or ideas provided by the Client in connection with the Services for the purpose of improving the Supplier's services.

7. CONFIDENTIALITY

7.1 Each Party shall: (a) keep the other Party's Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the purposes of this Agreement; (d) protect it with at least the same degree of care as it applies to its own confidential information, and in any event no less than reasonable care; (e) on termination of this Agreement, return or destroy (at the other Party's election) all Confidential Information and certify such return or destruction in writing.

7.2 The obligations of confidentiality shall not apply to information that: (a) is or becomes generally available to the public through no act of the Receiving Party; (b) was known to the Receiving Party prior to disclosure; (c) is received from a third party without breach of confidentiality; (d) is required to be disclosed by law (provided notice is given where permitted).

7.3 Each Party shall ensure that its employees, agents, and subcontractors are bound by equivalent confidentiality obligations.

8. DATA PROTECTION

8.1 The Parties acknowledge that, in connection with the Services, the Supplier may process Personal Data on behalf of the Client. The Supplier shall process Personal Data only as a data processor (or sub-processor, as applicable) on the documented instructions of the Client, in accordance with Article 28 of the EU GDPR.

8.2 The Parties shall execute and comply with the Data Processing Agreement set out in Annex [{{data.dpAnnex}}] (the "DPA"), which forms part of this Agreement.

8.3 The Supplier shall implement and maintain appropriate technical and organisational security measures appropriate to the risk presented by the processing of Personal Data, in accordance with Article 32 of the EU GDPR.

8.4 The Supplier shall notify the Client without undue delay upon becoming aware of a personal data breach affecting the Client's Personal Data.

9. WARRANTIES

9.1 Mutual Warranties. Each Party warrants that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes valid and binding obligations; (c) the execution of this Agreement will not breach any other agreement to which it is a party; (d) it complies with all applicable laws and regulations relevant to its performance of this Agreement.

9.2 Supplier Warranties. The Supplier warrants that: (a) the Services will be performed with reasonable care and skill; (b) the Services and deliverables will not infringe the Intellectual Property Rights of any third party; (c) the Supplier has and will maintain all necessary resources, licences, and permissions to perform the Services; (d) the Supplier's personnel are appropriately skilled and experienced.

9.3 The Supplier warrants that it is not aware of any circumstances that are likely to give rise to a Force Majeure Event.

9.4 EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, ALL WARRANTIES, CONDITIONS, AND REPRESENTATIONS, WHETHER EXPRESS OR IMPLIED BY STATUTE, COMMON LAW, OR OTHERWISE, ARE EXCLUDED TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

10. LIABILITY

10.1 Neither Party shall be liable to the other for indirect, consequential, incidental, special, or exemplary damages, including loss of profits, loss of revenue, loss of savings, or loss of data, even if advised of the possibility of such damages.

10.2 Each Party's total aggregate liability under or in connection with this Agreement shall not exceed [{{liability.capEUR}}] EUR (or the equivalent in [{{payment.feeCurrency}}]).

10.3 The limitations in this Clause 10 shall not apply to: (a) death or personal injury caused by negligence; (b) fraud; (c) any other liability that cannot be limited or excluded by applicable law, including without limitation under the EU GDPR.

11. INDEMNITIES

11.1 Supplier Indemnity. The Supplier shall indemnify and hold harmless the Client from and against any and all claims, damages, losses, costs, and expenses (including reasonable legal costs) arising out of or relating to: (a) the Supplier's breach of any warranty, obligation, or representation under this Agreement; (b) any claim that the Services or deliverables infringe the Intellectual Property Rights of a third party; (c) any negligent or wrongful act or omission of the Supplier or its personnel.

11.2 Client Indemnity. The Client shall indemnify and hold harmless the Supplier from and against any and all claims, damages, losses, costs, and expenses arising out of or relating to: (a) the Client's breach of this Agreement; (b) any negligent or wrongful act or omission of the Client or its personnel.

12. INSURANCE

12.1 The Supplier shall maintain at its own cost throughout the Term: (a) professional indemnity insurance with a limit of not less than [{{insurance.professionalIndemnityLimit}}] EUR per claim; (b) public liability insurance with a limit of not less than [{{insurance.publicLiabilityLimit}}] EUR per claim; (c) [{{insurance.additionalInsurances}}].

12.2 The Supplier shall provide evidence of current insurance coverage upon the Client's written request.

13. PERSONNEL AND SUB-CONTRACTORS

13.1 The Supplier shall assign personnel with appropriate skills and experience to perform the Services. The Supplier shall notify the Client of any change in the key personnel assigned to the Services.

13.2 The Client may, for good cause, request the removal of any Supplier personnel. The Supplier shall promptly arrange a suitable replacement.

13.3 The Supplier shall not engage any Sub-processor to process Personal Data without the Client's prior written general authorisation. The Supplier shall impose on each Sub-processor data protection obligations equivalent to those imposed on the Supplier under this Agreement and the DPA.

14. SUSPENSION

14.1 The Supplier may suspend the Services: (a) in whole or in part, if the Client fails to pay any sum due and payable under this Agreement; (b) in whole or in part, if the Client fails to provide necessary cooperation or information required for the performance of the Services, where such failure continues for more than [{{suspension.clientFailureDays}}] days after written notice; (c) in whole, if the Supplier reasonably believes that the continuation of the Services would result in a breach of applicable EU or national law.

14.2 Suspension under Clause 14.1(a) shall not relieve the Client of its obligation to pay the Fees during the period of suspension. The Term shall be extended by the period of any suspension caused by the Client's failure.

15. CONSEQUENCES OF TERMINATION

15.1 On termination of this Agreement for any reason:

(a) the Client shall pay the Supplier all Fees properly due for Services performed up to the date of termination;

(b) each Party shall return to the other all Confidential Information and other materials belonging to the other Party;

(c) the Supplier shall deliver to the Client all completed and in-progress deliverables;

(d) each Party shall cease all use of the other Party's Background IP and trade marks;

(e) any moneys held by one Party for the other shall be settled.

15.2 Clauses 6 (IP), 7 (Confidentiality), 10 (Liability), 11 (Indemnities), 18 (General), and this Clause 15 shall survive termination.

16. TERMINATION FOR BREACH

16.1 Either Party may terminate this Agreement immediately by written notice to the other Party if: (a) the other Party commits a material breach of this Agreement and fails to remedy such breach within [{{termination.breachRemedyDays}}] days of written notice requiring remedy; or (b) the other Party becomes insolvent, enters into administration or liquidation, or ceases to carry on business.

16.2 Either Party may terminate this Agreement immediately by written notice if the other Party is added to any sanctions list under EU or UN law, or if the continuation of the Agreement would expose the terminating Party to a risk of violation of applicable sanctions law.

17. GENERAL

17.1 Entire Agreement. This Agreement, together with the Annexes, constitutes the entire agreement between the Parties.

17.2 Amendment. No amendment unless agreed in writing signed by authorised representatives of both Parties.

17.3 Waiver and Severability as standard.

17.4 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party. Either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets, provided that the assigning Party ensures the other Party is notified of such assignment.

17.5 Notices. All notices shall be in writing and delivered by personal delivery, pre-paid post, or email to the addresses set out above (or as updated in writing).

17.6 Force Majeure. Neither Party shall be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay results from a Force Majeure Event, being circumstances beyond the reasonable control of that Party, including without limitation acts of God, fire, flood, earthquake, pandemic (within the meaning of the World Health Organisation), war, terrorism, government action, or failure of third-party telecommunications. The affected Party shall give prompt written notice and shall use reasonable endeavours to mitigate the effects of the Force Majeure Event. If a Force Majeure Event continues for more than [{{forceMajeure.continuationDays}}] days, either Party may terminate this Agreement on written notice.

17.7 Relationship. Nothing in this Agreement shall be construed as creating a partnership, joint venture, agency, or employment relationship between the Parties. The Supplier is an independent contractor.

17.8 No Third-Party Rights. This Agreement is intended for the benefit of the Parties and their respective successors and permitted assigns, and nothing in this Agreement shall confer any rights on any third party.

17.9 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of [{{definitions.governingLaw}}]. The Parties irrevocably submit to the exclusive jurisdiction of the courts of [{{definitions.referenceJurisdictionCapitalised}}] to settle any dispute or claim arising out of or in connection with this Agreement.

17.10 Dispute Resolution. Any dispute arising out of or relating to this Agreement shall first be referred to the authorised senior representatives of both Parties for resolution within [{{dispute.escalationDays}}] days. If not resolved, either Party may refer the dispute to the courts or to arbitration as provided herein.

17.11 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

17.12 Language. This Agreement is drafted in the English language. If this Agreement is translated into another language, the English language version shall prevail.

IN WITNESS WHEREOF the Parties have executed this Agreement on the date first above written.

SIGNED by [{{party.client.name}}]
by [{{signatures.clientSignatoryName}}], [{{signatures.clientSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SIGNED by [{{party.supplier.name}}]
by [{{signatures.supplierSignatoryName}}], [{{signatures.supplierSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Services include the provision of regulated services (legal, financial, medical, or other regulated professional advice — additional licensing or registration requirements may apply in the relevant EU member state); the Supplier is established in a non-EU jurisdiction and the arrangement triggers requirements under Chapter V of the EU GDPR; the arrangement involves the processing of special category data under Article 9 of the EU GDPR. This template reflects general EU commercial practice and must be reviewed by a qualified lawyer in the relevant EU member state before use. Jurisdiction: European Union (general template — adapt for specific member state law as required).`;

const LEGEND_MSA_EU: LegendItem[] = [
  { path: 'party.client.name', label: "Client's legal name", type: 'string', required: true, example: 'Meridian Capital GmbH' },
  { path: 'party.client.legalForm', label: "Client's legal form", type: 'string', required: true, example: 'a company with limited liability (Gesellschaft mit beschränkter Haftung)' },
  { path: 'party.client.country', label: "Client's country of registration", type: 'string', required: true, example: 'Germany' },
  { path: 'party.client.registrationNumber', label: "Client's registration number", type: 'string', required: false, example: 'HRB 123456' },
  { path: 'party.client.registeredAddress', label: "Client's registered address", type: 'text', required: true, example: 'Friedrichstraße 123, 10117 Berlin, Germany' },
  { path: 'party.supplier.name', label: "Supplier's legal name", type: 'string', required: true, example: 'Harbour Digital OÜ' },
  { path: 'party.supplier.legalForm', label: "Supplier's legal form", type: 'string', required: true, example: 'a private limited company (osaühing)' },
  { path: 'party.supplier.country', label: "Supplier's country of registration", type: 'string', required: true, example: 'Estonia' },
  { path: 'party.supplier.registrationNumber', label: "Supplier's registration number", type: 'string', required: false, example: '12345678' },
  { path: 'party.supplier.registeredAddress', label: "Supplier's registered address", type: 'text', required: true, example: 'Viru Väljak 2, Tallinn 10111, Estonia' },
  { path: 'definitions.referenceJurisdiction', label: 'Reference jurisdiction (EU member state)', type: 'string', required: true, example: 'Germany' },
  { path: 'definitions.changeControlAnnex', label: 'Change control annex reference', type: 'string', required: false, example: '3' },
  { path: 'definitions.governingLaw', label: 'Governing law (EU member state)', type: 'string', required: true, example: 'Germany' },
  { path: 'definitions.referenceJurisdictionCapitalised', label: 'Reference jurisdiction (capitalised)', type: 'string', required: true, example: 'Germany' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.initialTermMonths', label: 'Initial term (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.renewalPeriodMonths', label: 'Auto-renewal period (months)', type: 'number', required: false, example: 12 },
  { path: 'terms.renewalNoticeDays', label: 'Renewal notice period (days)', type: 'number', required: false, example: 60 },
  { path: 'terms.serviceCreditsText', label: 'Service credits text', type: 'text', required: false, example: 'service credits as set out in Annex 2, which shall be applied against the next invoice, and which shall be the Client\'s sole remedy for failure to meet Service Levels' },
  { path: 'terms.serviceLevelReviewText', label: 'Service level review text', type: 'text', required: false, example: 'The Service Levels shall be reviewed by the Parties every 6 months. Either Party may propose amendments to the Service Levels by serving written notice on the other Party, and any amendments shall be agreed in writing.' },
  { path: 'terms.serviceLevelsAnnex', label: 'Service levels annex reference', type: 'string', required: false, example: '1' },
  { path: 'terms.statementOfWorkAnnex', label: 'Statement of work annex reference', type: 'string', required: false, example: '4' },
  { path: 'data.dpAnnex', label: 'Data processing annex reference', type: 'string', required: false, example: '5' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.interestRate', label: 'Late payment interest rate (%)', type: 'number', required: false, example: 3 },
  { path: 'payment.disputeDays', label: 'Invoice dispute period (days)', type: 'number', required: false, example: 10 },
  { path: 'payment.vatJurisdiction', label: 'VAT jurisdiction (EU member state)', type: 'string', required: false, example: 'Germany' },
  { path: 'payment.feeCurrency', label: 'Fee currency', type: 'string', required: false, example: 'EUR' },
  { path: 'liability.capEUR', label: 'Liability cap (EUR)', type: 'number', required: true, example: 500000 },
  { path: 'insurance.professionalIndemnityLimit', label: 'PI insurance limit (EUR)', type: 'number', required: true, example: 2000000 },
  { path: 'insurance.publicLiabilityLimit', label: 'Public liability limit (EUR)', type: 'number', required: true, example: 1000000 },
  { path: 'insurance.additionalInsurances', label: 'Additional insurance requirements', type: 'text', required: false, example: 'employers\' liability insurance as required by applicable law; cyber liability insurance with a limit of EUR 1,000,000 per claim' },
  { path: 'suspension.clientFailureDays', label: 'Client failure grace period (days)', type: 'number', required: false, example: 14 },
  { path: 'termination.breachRemedyDays', label: 'Breach remedy period (days)', type: 'number', required: false, example: 30 },
  { path: 'forceMajeure.continuationDays', label: 'Force majeure continuation period (days)', type: 'number', required: false, example: 60 },
  { path: 'dispute.escalationDays', label: 'Dispute escalation period (days)', type: 'number', required: false, example: 14 },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Hans Müller' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Geschäftsführer (Managing Director)' },
  { path: 'signatures.supplierSignatoryName', label: "Supplier signatory name", type: 'string', required: true, example: 'Kaja Lepp' },
  { path: 'signatures.supplierSignatoryTitle', label: "Supplier signatory title", type: 'string', required: true, example: 'Juhatuse liige (Board Member)' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-07-01' },
];

// ─── PARTNERSHIP AGREEMENT — EU ───────────────────────────────────────────────

const PARTNERSHIP_EU = `PARTNERSHIP AGREEMENT

Title: Partnership Agreement
Version: 1
Jurisdiction: European Union (General — for use across EU member states)

Date: [{{dates.agreementDate}}]

PARTNERSHIP AGREEMENT

made between:

[{{party.partner1.name}}], [{{party.partner1.nationality}}], residing at [{{party.partner1.address}}]; and

[{{party.partner2.name}}], [{{party.partner2.nationality}}], residing at [{{party.partner2.address}}]; and

[{{party.partner3.name}}], [{{party.partner3.nationality}}], residing at [{{party.partner3.address}}]

(collectively referred to as "the Partners")

RECITALS

WHEREAS the Partners have agreed to establish and carry on a business partnership in partnership under the law of [{{terms.governingLaw}}] upon the terms and subject to the conditions contained in this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Business" means the business of [{{business.description}}] carried on by the Partnership from the Premises;

(b) "Commencement Date" means [{{terms.commencementDate}}];

(c) "Financial Year" means the accounting period of the Partnership;

(d) "Goodwill" means the goodwill, reputation, and business connections of the Business;

(e) "Net Profits" means the net profits of the Business as determined by the Accounts;

(f) "Partnership" means the partnership hereby constituted;

(g) "Partnership Property" means all property, assets, and premises acquired by or for the Partnership;

(h) "Premises" means [{{business.premisesAddress}}];

(i) "Term" means the duration of the Partnership as specified in Clause 2;

(j) "including" means "including without limitation".

1.2 Headings are for convenience only and do not affect interpretation.

2. DURATION

2.1 The Partnership shall commence on the Commencement Date and shall continue until terminated in accordance with Clause 19.

3. BUSINESS AND POWERS

3.1 The Partners shall carry on the Business in partnership for the benefit of all Partners.

3.2 The Partners may change the nature or scope of the Business by unanimous written agreement.

3.3 The Partners may open additional places of business within [{{terms.governingLaw}}] or elsewhere in the European Union only by unanimous written agreement.

3.4 Each Partner shall devote such time and attention to the Business as is reasonably necessary for its proper conduct.

4. CAPITAL

4.1 The Partners shall contribute the following capital to the Partnership:

(a) [{{party.partner1.name}}]: EUR [{{capital.partner1Contribution}}];

(b) [{{party.partner2.name}}]: EUR [{{capital.partner2Contribution}}];

(c) [{{party.partner3.name}}]: EUR [{{capital.partner3Contribution}}].

4.2 The Partners may agree from time to time that additional capital contributions are required. Any additional capital shall be contributed by the Partners in their Profit-sharing Ratios unless otherwise agreed in writing.

4.3 No Partner shall have the right to demand or receive repayment of any part of the Partner's capital contribution except on the retirement or expulsion of that Partner or the dissolution of the Partnership.

5. PROFIT SHARING AND LOSSES

5.1 The Net Profits of the Business shall be divided between the Partners in the following ratios:

(a) [{{party.partner1.name}}]: [{{profitShare.partner1Percentage}}]%;

(b) [{{party.partner2.name}}]: [{{profitShare.partner2Percentage}}]%;

(c) [{{party.partner3.name}}]: [{{profitShare.partner3Percentage}}]%.

5.2 Losses shall be borne by the Partners in the same ratios as Net Profits are divided.

5.3 Each Partner shall be entitled to draw against the Partner's share of Net Profits at such times and in such amounts as the Partners may agree in writing from time to time.

6. MANAGEMENT AND DECISION-MAKING

6.1 All Partners shall have equal rights in the management of the Business, unless otherwise agreed in writing between the Partners.

6.2 Any Partner entering into any transaction, commitment, or arrangement on behalf of the Partnership that falls outside the ordinary course of the Business shall be acting beyond authority unless such transaction has been approved by a Majority Decision.

6.3 A "Majority Decision" means the affirmative vote of Partners whose Profit-sharing Ratios together exceed 50% of the total Profit-sharing Ratios.

7. DUTIES OF PARTNERS

7.1 Each Partner shall:

(a) act in good faith and in the best interests of the Partnership;

(b) promptly notify all other Partners of any matter that may materially affect the Business or the Partnership;

(c) maintain the confidentiality of all Confidential Information;

(d) not carry on any business that competes with or is similar to the Business within the European Union;

(e) account to the Partnership for any benefit obtained from any transaction affecting the Partnership;

(f) act in accordance with the provisions of this Agreement.

7.2 The Partners shall not, without the prior written consent of all other Partners, solicit or endeavour to entice away any client, customer, or employee of the Partnership.

8. BOOKS, RECORDS, AND ACCOUNTS

8.1 The Partners shall ensure that proper books of account are maintained for the Partnership, recording all receipts, payments, and transactions of the Business.

8.2 The Partnership's Accounts shall be prepared as at the end of each Financial Year by [{{accounts.appointedAccountant}}] or such other accountant as the Partners may appoint from time to time.

9. PARTNERSHIP PROPERTY

9.1 All Partnership Property shall be held by the Partners on behalf of the Partnership.

9.2 No Partner shall sell, mortgage, charge, or otherwise dispose of or encumber any Partnership Property without the prior written consent of all other Partners.

10. CONFIDENTIALITY

10.1 Each Partner undertakes to the other Partners that the Partner shall keep confidential and shall not, without the prior written consent of all other Partners, disclose to any third party any Confidential Information relating to the Business or the Partnership.

10.2 On the retirement or expulsion of any Partner, that Partner shall return to the Partnership all documents and records belonging to the Partnership.

11. NON-SOLICITATION

11.1 If a Partner retires or is expelled, that Partner shall not, for a period of [{{restrictivePeriod.months}}] months after ceasing to be a Partner, directly or indirectly solicit or endeavour to entice away any client, customer, or supplier of the Partnership with whom that Partner had material contact.

12. RETIREMENT, EXPULSION, AND DEATH

12.1 Any Partner may retire from the Partnership by giving not less than [{{retirement.noticeMonths}}] months' written notice to the other Partners.

12.2 A Partner may be expelled by a Majority Decision if that Partner commits a material breach of this Agreement and fails to remedy such breach within [{{expulsion.remedyPeriodDays}}] days of written notice.

12.3 If a Partner dies, the Partnership shall not be dissolved but shall continue with the remaining Partners, unless the Partners unanimously decide otherwise. The deceased Partner's interest shall pass to the deceased Partner's heirs.

13. NEW PARTNER

13.1 No new Partner shall be admitted to the Partnership without the prior written consent of all existing Partners.

14. DISSOLUTION

14.1 The Partnership shall be dissolved upon the occurrence of any of the following events:

(a) the expiry of any fixed term agreed for the Partnership;

(b) the service of not less than [{{dissolution.noticeMonths}}] months' written notice by a Partner to all other Partners;

(c) the unanimous written agreement of all Partners;

(d) a court order dissolving the Partnership.

14.2 On dissolution, the Partners shall realise all Partnership Property, pay all Partnership debts and liabilities, and distribute any surplus among the Partners in the Profit-sharing Ratios.

15. VALUATION

15.1 The value of any Partner's interest in the Partnership (whether on retirement, expulsion, or death) shall be determined by a single independent valuer agreed upon by the relevant Parties.

16. DISPUTES

16.1 Any dispute arising out of or relating to this Agreement shall first be referred to the authorised senior representatives of both Parties for resolution within [{{dispute.resolutionDays}}] days. If not resolved, either Party may refer the dispute to the courts of [{{terms.governingLawCapitalised}}].

17. GENERAL

17.1 Entire Agreement. This Agreement constitutes the entire agreement between the Partners.

17.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by all Partners.

17.3 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of [{{terms.governingLaw}}], and the Partners submit to the exclusive jurisdiction of the courts of [{{terms.governingLawCapitalised}}].

17.4 Notices. All notices shall be in writing and served by personal delivery, pre-paid post, or email to the relevant Partner's address specified in this Agreement.

17.5 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

IN WITNESS WHEREOF the Partners have executed this Agreement on the date first above written.

SIGNED by [{{party.partner1.name}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SIGNED by [{{party.partner2.name}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SIGNED by [{{party.partner3.name}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Partnership is intended to be a commercial company (GmbH, SARL, SL, BV, etc.) — partnership law in most EU member states distinguishes between partnerships and companies with limited liability; the Partnership has partners that are legal entities rather than individuals (national law may restrict this); the Partnership is intended to be a European Economic Interest Grouping (EEIG) — a separate regulation applies. This template reflects general EU practice and must be reviewed by a qualified lawyer in the relevant EU member state before use. Jurisdiction: European Union (general template — adapt for specific member state law as required).`;

const LEGEND_PARTNERSHIP_EU: LegendItem[] = [
  { path: 'party.partner1.name', label: "Partner 1 legal name", type: 'string', required: true, example: 'Jean-Pierre Dubois' },
  { path: 'party.partner1.nationality', label: "Partner 1 nationality", type: 'string', required: true, example: 'French' },
  { path: 'party.partner1.address', label: "Partner 1 address", type: 'text', required: true, example: '15 Rue de la Paix, 75001 Paris, France' },
  { path: 'party.partner2.name', label: "Partner 2 legal name", type: 'string', required: true, example: 'Marco Rossi' },
  { path: 'party.partner2.nationality', label: "Partner 2 nationality", type: 'string', required: true, example: 'Italian' },
  { path: 'party.partner2.address', label: "Partner 2 address", type: 'text', required: true, example: 'Via Roma 123, 00100 Roma, Italy' },
  { path: 'party.partner3.name', label: "Partner 3 legal name", type: 'string', required: false, example: 'Anna Schneider' },
  { path: 'party.partner3.nationality', label: "Partner 3 nationality", type: 'string', required: false, example: 'German' },
  { path: 'party.partner3.address', label: "Partner 3 address", type: 'text', required: false, example: 'Hauptstraße 45, 10115 Berlin, Germany' },
  { path: 'business.description', label: 'Business description', type: 'string', required: true, example: 'the provision of digital consulting and software development services to clients throughout the European Union' },
  { path: 'business.premisesAddress', label: 'Business premises address', type: 'text', required: true, example: '25 Avenue des Champs-Élysées, 75008 Paris, France' },
  { path: 'terms.governingLaw', label: 'Governing law (EU member state)', type: 'string', required: true, example: 'France' },
  { path: 'terms.governingLawCapitalised', label: 'Governing law (capitalised)', type: 'string', required: true, example: 'France' },
  { path: 'terms.commencementDate', label: 'Commencement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'capital.partner1Contribution', label: 'Partner 1 capital contribution (EUR)', type: 'number', required: true, example: 75000 },
  { path: 'capital.partner2Contribution', label: 'Partner 2 capital contribution (EUR)', type: 'number', required: true, example: 75000 },
  { path: 'capital.partner3Contribution', label: 'Partner 3 capital contribution (EUR)', type: 'number', required: false, example: 50000 },
  { path: 'profitShare.partner1Percentage', label: 'Partner 1 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner2Percentage', label: 'Partner 2 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner3Percentage', label: 'Partner 3 profit share (%)', type: 'number', required: false, example: 20 },
  { path: 'accounts.appointedAccountant', label: 'Appointed accountant firm', type: 'string', required: true, example: 'Deloitte France' },
  { path: 'restrictivePeriod.months', label: 'Restrictive covenant period (months)', type: 'number', required: true, example: 24 },
  { path: 'retirement.noticeMonths', label: 'Retirement notice period (months)', type: 'number', required: true, example: 6 },
  { path: 'expulsion.remedyPeriodDays', label: 'Breach remedy period (days)', type: 'number', required: false, example: 30 },
  { path: 'dissolution.noticeMonths', label: 'Dissolution notice period (months)', type: 'number', required: false, example: 12 },
  { path: 'dispute.resolutionDays', label: 'Dispute resolution period (days)', type: 'number', required: false, example: 14 },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-07-01' },
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
    where: { slug },
    update: { status: ProductStatus.PUBLISHED, title, category },
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
  await seedProduct('master-services-agreement', 'Master Services Agreement', 'Corporate & Commercial', 'EU', 'European Union (general template)', MSA_EU, LEGEND_MSA_EU);
  await seedProduct('partnership-agreement', 'Partnership Agreement', 'Corporate & Commercial', 'EU', 'European Union (general template)', PARTNERSHIP_EU, LEGEND_PARTNERSHIP_EU);
}

main().catch(console.error).finally(() => prisma.$disconnect());