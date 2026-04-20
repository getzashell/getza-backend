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

const PARTNERSHIP_UK = `PARTNERSHIP AGREEMENT

Title: Partnership Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.agreementDate}}]

PARTNERSHIP AGREEMENT

made between:

[{{party.partner1.name}}] of [{{party.partner1.address}}]; and

[{{party.partner2.name}}] of [{{party.partner2.address}}]; and

[{{party.partner3.name}}] of [{{party.partner3.address}}]

(collectively referred to as "the Partners")

RECITALS

WHEREAS the Partners have agreed to establish and carry on a business partnership in partnership under the law of England and Wales upon the terms and subject to the conditions contained in this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Business" means the business of [{{business.description}}] carried on by the Partnership from the Premises;

(b) "Commencement Date" means [{{terms.commencementDate}}];

(c) "Disputed Matter" has the meaning given in Clause 22.2;

(d) "Financial Year" means the accounting period of the Partnership commencing on [{{terms.fyStartMonth}}] in each year;

(e) "Goodwill" means the goodwill, reputation, and business connections of the Business;

(f) "Major Decision" means any decision listed in Clause 9.2;

(g) "Net Profits" means the net profits of the Business as determined by the Accounts;

(h) "Partnership" means the partnership hereby constituted;

(i) "Partnership Property" means all property, assets, and premises acquired by or for the Partnership;

(j) "Premises" means [{{business.premisesAddress}}];

(k) "Term" means the duration of the Partnership as specified in Clause 2;

(l) "including" means "including without limitation".

1.2 Headings are for convenience only and do not affect interpretation. Words importing the singular include the plural and vice versa.

2. DURATION

2.1 The Partnership shall commence on the Commencement Date and shall continue until terminated in accordance with Clause 20.

3. BUSINESS AND POWERS

3.1 The Partners shall carry on the Business in partnership for the benefit of all Partners.

3.2 The Partners may change the nature or scope of the Business by unanimous written agreement.

3.3 The Partners may open additional places of business within the United Kingdom or elsewhere only by unanimous written agreement.

3.4 The Partners shall devote such time and attention to the Business as is reasonably necessary for its proper conduct.

4. CAPITAL

4.1 The Partners shall contribute the following capital to the Partnership:

(a) [{{party.partner1.name}}]: GBP [{{capital.partner1Contribution}}];

(b) [{{party.partner2.name}}]: GBP [{{capital.partner2Contribution}}];

(c) [{{party.partner3.name}}]: GBP [{{capital.partner3Contribution}}].

4.2 The Partners may agree from time to time that additional capital contributions are required. Any additional capital shall be contributed by the Partners in their Profit-sharing Ratios unless otherwise agreed in writing.

4.3 No Partner shall have the right to demand or receive repayment of any part of the Partner's capital contribution except on the retirement or expulsion of that Partner or the dissolution of the Partnership.

4.4 Interest shall not be paid on any Partner's capital contribution unless otherwise agreed in writing.

5. PROFIT SHARING AND LOSSES

5.1 The Net Profits of the Business shall be divided between the Partners in the following ratios:

(a) [{{party.partner1.name}}]: [{{profitShare.partner1Percentage}}]%;

(b) [{{party.partner2.name}}]: [{{profitShare.partner2Percentage}}]%;

(c) [{{party.partner3.name}}]: [{{profitShare.partner3Percentage}}]%.

5.2 Losses shall be borne by the Partners in the same ratios as Net Profits are divided.

5.3 Each Partner shall be entitled to draw against the Partner's share of Net Profits at such times and in such amounts as the Partners may agree in writing from time to time (the " drawings").

5.4 The Partners may amend the Profit-sharing Ratios by unanimous written agreement.

6. MANAGEMENT AND DECISION-MAKING

6.1 All Partners shall have equal rights in the management of the Business.

6.2 Each Partner shall have authority to bind the Partnership in the ordinary course of the Business.

6.3 Any Partner entering into any transaction, commitment, or arrangement on behalf of the Partnership that falls outside the ordinary course of the Business shall be acting beyond authority unless such transaction has been approved by a Majority Decision.

6.4 A "Majority Decision" means the affirmative vote of Partners whose Profit-sharing Ratios together exceed 50% of the total Profit-sharing Ratios.

6.5 Each Partner shall have the right to appoint a substitute to attend and vote at any meeting on the Partner's behalf, provided that written notice of such substitution is given to all other Partners not less than [{{management.substituteNoticeDays}}] days before the relevant meeting.

6.6 Partners' meetings shall be held at least [{{management.meetingFrequency}}] times in each calendar year. Partners may also convene extraordinary meetings on [{{management.extraordinaryMeetingDays}}] days' written notice.

7. DUTIES OF PARTNERS

7.1 Each Partner shall:

(a) act in good faith and in the best interests of the Partnership;

(b) promptly notify all other Partners of any matter that may materially affect the Business or the Partnership;

(c) maintain the confidentiality of all Confidential Information;

(d) not carry on any business that competes with or is similar to the Business;

(e) account to the Partnership for any benefit obtained from any transaction affecting the Partnership;

(f) act in accordance with the provisions of this Agreement.

7.2 The Partners shall not, without the prior written consent of all other Partners:

(a) be a director, employee, or consultant of any competing business;

(b) have any financial interest in any competing business;

(c) solicit or endeavour to entice away any client, customer, or employee of the Partnership.

8. BANKING AND FINANCE

8.1 All moneys belonging to the Partnership shall be paid into a bank account in the name of the Partnership.

8.2 The Partners shall agree in writing from time to time as to which Partners are authorised to operate the Partnership's bank accounts and to give instructions in relation to the Partnership's finances.

8.3 No Partner shall, without prior written authority from a Majority Decision: (a) borrow money in the name of the Partnership; (b) give any guarantee or indemnity in the name of the Partnership; (c) create any charge or encumbrance over any Partnership Property.

9. MAJOR DECISIONS REQUIRING UNANIMOUS APPROVAL

9.1 The following decisions require the prior written consent of all Partners:

(a) any change to the Profit-sharing Ratios;

(b) the admission of a new Partner;

(c) the expulsion of any Partner;

(d) any alteration to this Agreement;

(e) the dissolution of the Partnership;

(f) any disposal of all or substantially all of the Partnership's assets;

(g) any acquisition of any business or undertaking;

(h) any change to the nature or scope of the Business;

(i) any decision that would expose the Partnership to a material risk not contemplated by this Agreement.

9.2 [{{management.additionalUnanimousDecisionsText}}]

10. BOOKS, RECORDS, AND ACCOUNTS

10.1 The Partners shall ensure that proper books of account are maintained for the Partnership, recording all receipts, payments, and transactions of the Business.

10.2 The books of account shall be kept at the Premises or at such other place as the Partners may agree in writing.

10.3 Each Partner shall have the right to inspect and copy the Partnership's books and records at any reasonable time upon written notice to the other Partners.

10.4 The Partnership's Accounts shall be prepared as at the end of each Financial Year by [{{accounts.approvalsAccountantName}}] or such other accountant as the Partners may appoint from time to time.

10.5 Within [{{accounts.preparationDays}}] days of the end of each Financial Year, the Accounts shall be circulated to all Partners. Each Partner shall have the right to challenge the Accounts by written notice to the other Partners within [{{accounts.challengePeriodDays}}] days of circulation.

11. TAXATION

11.1 Each Partner shall be responsible for the Partner's own tax liabilities in respect of the Partner's share of the Net Profits.

11.2 The Partnership shall maintain records to enable each Partner to fulfil the Partner's tax obligations.

11.3 The Partners shall cooperate with each other and with any professional tax adviser appointed by the Partnership.

12. PARTNERSHIP PROPERTY

12.1 All Partnership Property shall be held by the Partners on behalf of the Partnership.

12.2 No Partner shall sell, mortgage, charge, or otherwise dispose of or encumber any Partnership Property without the prior written consent of all other Partners.

12.3 Upon the retirement or expulsion of any Partner, the continuing Partners shall have the right to purchase the outgoing Partner's share of the Partnership Property at a fair value to be determined in accordance with Clause 21.

13. EMPLOYEES AND CONTRACTORS

13.1 The Partners may employ such employees and engage such contractors as are reasonably necessary for the Business.

13.2 The terms of employment or engagement of any senior employee or key contractor shall be approved by a Majority Decision.

13.3 Each Partner shall be responsible for the acts and omissions of any employee or contractor that Partner employs or engages, and shall indemnify the Partnership for any loss or liability arising from such acts or omissions.

14. CONFIDENTIALITY

14.1 Each Partner undertakes to the other Partners that the Partner shall keep confidential and shall not, without the prior written consent of all other Partners, disclose to any third party any Confidential Information relating to the Business or the Partnership.

14.2 "Confidential Information" means all non-public information relating to: (a) the Business; (b) the financial position and performance of the Partnership; (c) the Partners' respective interests in the Partnership; (d) any trade secrets, client lists, supplier arrangements, or know-how of the Business; (e) any matter discussed at Partners' meetings that is designated as confidential.

14.3 The obligation of confidentiality shall not apply to information that: (a) is or becomes generally available to the public through no fault of the Partner; (b) was known to the Partner prior to disclosure by the other Partners; (c) is required to be disclosed by law or by a regulatory authority.

14.4 On the retirement or expulsion of any Partner, that Partner shall return to the Partnership all documents and records belonging to the Partnership and shall certify in writing that the Partner has retained no copies.

15. NON-SOLICITATION AND NON-COMPETITION

15.1 If a Partner retires or is expelled, that Partner shall not, for a period of [{{restrictivePeriod.months}}] months after ceasing to be a Partner:

(a) directly or indirectly solicit or endeavour to entice away any client, customer, or supplier of the Partnership with whom that Partner had material contact during the [{{restrictivePeriod.contactPeriodMonths}}] months prior to ceasing to be a Partner;

(b) directly or indirectly carry on or be engaged in any business competitive with the Business within the geographic area of [{{restrictivePeriod.geographicScope}}];

(c) directly or indirectly employ or engage any person who was an employee or contractor of the Partnership during the [{{restrictivePeriod.contactPeriodMonths}}] months prior to the Partner ceasing to be a Partner.

15.2 If any Partner is in breach of Clause 15.1, the other Partners shall be entitled to seek injunctive relief in addition to any other remedy.

16. RETIREMENT OF A PARTNER

16.1 Any Partner may retire from the Partnership by giving not less than [{{retirement.noticeMonths}}] months' written notice to the other Partners.

16.2 Upon retirement, the retiring Partner's interest in the Partnership shall be dealt with in accordance with Clause 21.

16.3 A retiring Partner shall continue to be bound by the obligations of confidentiality and non-competition set out in Clauses 14 and 15, unless the continuing Partners agree in writing to release the retiring Partner from such obligations.

17. EXPULSION OF A PARTNER

17.1 A Partner may be expelled by a Majority Decision if:

(a) that Partner is declared bankrupt or enters into an individual voluntary arrangement with creditors;

(b) that Partner commits a material breach of this Agreement and fails to remedy such breach within [{{expulsion.remedyPeriodDays}}] days of written notice requiring remedy;

(c) that Partner is convicted of a criminal offence involving dishonesty or moral turpitude;

(d) that Partner ceases to have legal capacity to be a partner.

17.2 An expelled Partner shall be treated as having retired on the date of expulsion for the purposes of Clause 21, save that the expelled Partner shall not be entitled to any share of goodwill.

18. DEATH OF A PARTNER

18.1 If a Partner dies, the Partnership shall not be dissolved but shall continue with the remaining Partners. The deceased Partner's interest shall pass to the deceased Partner's personal representatives or estate.

18.2 The deceased Partner's personal representatives or estate shall be entitled to receive the value of the deceased Partner's interest in the Partnership, to be determined in accordance with Clause 21.

18.3 [{{death.survivorBuyoutText}}]

19. NEW PARTNER

19.1 No new Partner shall be admitted to the Partnership without the prior written consent of all existing Partners.

19.2 A new Partner shall execute a deed of adherence to this Agreement and shall contribute capital to the Partnership as agreed between the Partners.

20. DISSOLUTION

20.1 The Partnership shall be dissolved upon the occurrence of any of the following events:

(a) the expiry of any fixed term agreed for the Partnership, if no Partner gives notice of intention to continue;

(b) the service of not less than [{{dissolution.noticeMonths}}] months' written notice by a Partner to all other Partners;

(c) the unanimous written agreement of all Partners;

(d) the happening of any other event that makes it unlawful or impossible for the Business to be continued;

(e) a court order dissolving the Partnership.

20.2 On dissolution, the Partners shall realisation all Partnership Property, pay all Partnership debts and liabilities, and distribute any surplus among the Partners in the Profit-sharing Ratios.

21. VALUATION OF A DEPARTING PARTNER'S INTEREST

21.1 The value of any Partner's interest in the Partnership (whether on retirement, expulsion, or death) shall be determined by a single independent valuer agreed upon by the relevant Parties (or, failing agreement, appointed by the President of the Institute of Chartered Accountants in England and Wales).

21.2 The valuer shall act as an expert and not as an arbitrator, and the valuer's determination shall be final and binding.

21.3 The continuing Partners shall have the right to pay the valuation sum in instalments over a period not exceeding [{{valuation.installmentPeriodMonths}}] months, with interest at [{{valuation.interestRate}}]% per annum above the Bank of England base rate on the outstanding balance.

22. DISPUTES

22.1 Any dispute arising out of or relating to this Agreement (a "Disputed Matter") shall first be referred to a meeting of the Partners to be held within [{{dispute.resolutionDays}}] days of the matter being referred.

22.2 If the Partners are unable to resolve the Disputed Matter at that meeting, the Partners shall attempt to resolve it through mediation in accordance with the CEDR Model Mediation Procedure.

22.3 If the Disputed Matter is not resolved through mediation within [{{dispute.mediationDays}}] days of the commencement of mediation, either Party may refer the Disputed Matter to the courts of England and Wales.

23. GENERAL

23.1 Entire Agreement. This Agreement constitutes the entire agreement between the Partners.

23.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by all Partners.

23.3 Waiver and Severability as standard.

23.4 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Partners submit to the exclusive jurisdiction of the courts of England and Wales.

23.5 Notices. All notices shall be in writing and served by personal delivery, pre-paid post, or email to the relevant Partner's address specified in this Agreement (or as updated in writing).

23.6 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

IN WITNESS WHEREOF the Partners have executed this Agreement on the date first above written.

SIGNED by [{{party.partner1.name}}]
in the presence of:

Witness: _______________________________
Name: [{{witnesses.witness1Name}}]
Address: [{{witnesses.witness1Address}}]
Occupation: [{{witnesses.witness1Occupation}}]

SIGNED by [{{party.partner2.name}}]
in the presence of:

Witness: _______________________________
Name: [{{witnesses.witness2Name}}]
Address: [{{witnesses.witness2Address}}]
Occupation: [{{witnesses.witness2Occupation}}]

SIGNED by [{{party.partner3.name}}]
in the presence of:

Witness: _______________________________
Name: [{{witnesses.witness3Name}}]
Address: [{{witnesses.witness3Address}}]
Occupation: [{{witnesses.witness3Occupation}}]

---
Template document. Not legal advice. Not suitable if: the Partnership is intended to be a limited liability partnership (LLP) — a separate LLP agreement and registration at Companies House would be required; any Partner is not an individual (a corporate Partner would require a different structure); the Partnership is intended to be a "sleeping" or passive investment partnership (tax and management implications differ). This template reflects general UK partnership practice and must be reviewed by a qualified solicitor before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND: LegendItem[] = [
  { path: 'party.partner1.name', label: "Partner 1 legal name", type: 'string', required: true, example: 'William George Harrington' },
  { path: 'party.partner1.address', label: "Partner 1 address", type: 'text', required: true, example: '14 Oakleigh Way, Sevenoaks, Kent, TN13 9XM' },
  { path: 'party.partner2.name', label: "Partner 2 legal name", type: 'string', required: true, example: 'Simon James Thornton' },
  { path: 'party.partner2.address', label: "Partner 2 address", type: 'text', required: true, example: '25 Queen Street, Birmingham, B2 4AJ' },
  { path: 'party.partner3.name', label: "Partner 3 legal name", type: 'string', required: false, example: 'Victoria Rose Ashworth' },
  { path: 'party.partner3.address', label: "Partner 3 address", type: 'text', required: false, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'business.description', label: 'Business description', type: 'string', required: true, example: 'the design, manufacture, and sale of precision engineering components for the aerospace and defence sectors' },
  { path: 'business.premisesAddress', label: 'Business premises address', type: 'text', required: true, example: 'Unit 7, Broadmarsh Business Park, Hounslow, Middlesex, TW4 5AA' },
  { path: 'terms.commencementDate', label: 'Commencement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.fyStartMonth', label: 'Financial year start month', type: 'enum', required: true, rules: { options: ['January', 'April', 'July', 'October'] }, example: 'January' },
  { path: 'capital.partner1Contribution', label: 'Partner 1 capital contribution (GBP)', type: 'number', required: true, example: 75000 },
  { path: 'capital.partner2Contribution', label: 'Partner 2 capital contribution (GBP)', type: 'number', required: true, example: 75000 },
  { path: 'capital.partner3Contribution', label: 'Partner 3 capital contribution (GBP)', type: 'number', required: false, example: 50000 },
  { path: 'profitShare.partner1Percentage', label: 'Partner 1 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner2Percentage', label: 'Partner 2 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner3Percentage', label: 'Partner 3 profit share (%)', type: 'number', required: false, example: 20 },
  { path: 'management.substituteNoticeDays', label: 'Substitute notice period (days)', type: 'number', required: false, example: 3 },
  { path: 'management.meetingFrequency', label: 'Minimum meetings per year', type: 'number', required: false, example: 4 },
  { path: 'management.extraordinaryMeetingDays', label: 'Extraordinary meeting notice (days)', type: 'number', required: false, example: 14 },
  { path: 'management.additionalUnanimousDecisionsText', label: 'Additional unanimous decisions', type: 'text', required: false, example: 'The Partners shall unanimously approve the appointment or removal of any senior employee with a salary exceeding GBP 50,000 per annum.' },
  { path: 'accounts.approvalsAccountantName', label: 'Appointed accountant name', type: 'string', required: true, example: 'Mitchell & Co Chartered Accountants' },
  { path: 'accounts.preparationDays', label: 'Accounts preparation deadline (days)', type: 'number', required: false, example: 60 },
  { path: 'accounts.challengePeriodDays', label: 'Accounts challenge period (days)', type: 'number', required: false, example: 21 },
  { path: 'restrictivePeriod.months', label: 'Restrictive covenant period (months)', type: 'number', required: true, example: 24 },
  { path: 'restrictivePeriod.contactPeriodMonths', label: 'Contact period for non-solicit (months)', type: 'number', required: false, example: 24 },
  { path: 'restrictivePeriod.geographicScope', label: 'Geographic scope of non-compete', type: 'string', required: false, example: 'England and Wales' },
  { path: 'retirement.noticeMonths', label: 'Retirement notice period (months)', type: 'number', required: true, example: 6 },
  { path: 'expulsion.remedyPeriodDays', label: 'Breach remedy period (days)', type: 'number', required: false, example: 30 },
  { path: 'death.survivorBuyoutText', label: 'Survivor buyout text', type: 'text', required: false, example: 'The surviving Partners shall have the right (but not the obligation) to purchase the deceased Partner\'s interest in the Partnership at fair market value, such right to be exercised within 60 days of the date of death.' },
  { path: 'dissolution.noticeMonths', label: 'Dissolution notice period (months)', type: 'number', required: false, example: 12 },
  { path: 'valuation.installmentPeriodMonths', label: 'Valuation installment period (months)', type: 'number', required: false, example: 12 },
  { path: 'valuation.interestRate', label: 'Installment interest rate (%)', type: 'number', required: false, example: 4 },
  { path: 'dispute.resolutionDays', label: 'Dispute resolution meeting deadline (days)', type: 'number', required: false, example: 14 },
  { path: 'dispute.mediationDays', label: 'Mediation deadline (days)', type: 'number', required: false, example: 30 },
  { path: 'witnesses.witness1Name', label: 'Witness 1 name', type: 'string', required: true, example: 'Helena Margaret Forsyth' },
  { path: 'witnesses.witness1Address', label: 'Witness 1 address', type: 'text', required: true, example: '14 Elm Road, Bristol, BS1 5QU' },
  { path: 'witnesses.witness1Occupation', label: 'Witness 1 occupation', type: 'string', required: true, example: 'Legal Executive' },
  { path: 'witnesses.witness2Name', label: 'Witness 2 name', type: 'string', required: true, example: 'Sarah Elizabeth Mitchell' },
  { path: 'witnesses.witness2Address', label: 'Witness 2 address', type: 'text', required: true, example: '50 Queen Street, Birmingham, B2 4AJ' },
  { path: 'witnesses.witness2Occupation', label: 'Witness 2 occupation', type: 'string', required: true, example: 'Solicitor' },
  { path: 'witnesses.witness3Name', label: 'Witness 3 name', type: 'string', required: false, example: 'Jonathan Mark Davies' },
  { path: 'witnesses.witness3Address', label: 'Witness 3 address', type: 'text', required: false, example: '25 Queen Street, Birmingham, B2 4AJ' },
  { path: 'witnesses.witness3Occupation', label: 'Witness 3 occupation', type: 'string', required: false, example: 'Chartered Accountant' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-07-01' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const SLUG = 'partnership-agreement';
  const TITLE = 'Partnership Agreement';
  const CATEGORY = 'Corporate & Commercial';
  const JURISDICTION = 'UK';
  const LABEL = 'United Kingdom (England & Wales)';
  const BODY = PARTNERSHIP_UK;

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
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(LEGEND), bodyTemplate: BODY, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(LEGEND)).issues;
  if (issues.length) console.warn('[WARN]', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + SLUG + ' (UK) — v=' + v.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());