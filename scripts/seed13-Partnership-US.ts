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

const PARTNERSHIP_US = `PARTNERSHIP AGREEMENT

Title: General Partnership Agreement
Version: 1
Jurisdiction: United States of America

Date: [{{dates.agreementDate}}]

PARTNERSHIP AGREEMENT

THIS PARTNERSHIP AGREEMENT (this "Agreement") is entered into as of [{{dates.agreementDate}}] (the "Effective Date"), by and between:

[{{party.partner1.name}}], an individual residing at [{{party.partner1.address}}];

[{{party.partner2.name}}], an individual residing at [{{party.partner2.address}}]; and

[{{party.partner3.name}}], an individual residing at [{{party.partner3.address}}].

(collectively referred to as "the Partners").

RECITALS

WHEREAS the Partners wish to form a general partnership under the laws of the State of [{{terms.governingState}}] for the purpose of conducting the Business described herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Partners agree as follows:

1. FORMATION AND NAME

1.1 Formation. The Partners hereby form a general partnership (the "Partnership") under the laws of the State of [{{terms.governingState}}] pursuant to the [{{terms.governingState}}] Revised Uniform Partnership Act or successor statute.

1.2 Name. The Partnership shall conduct business under the name [{{business.businessName}}] or such other name as the Partners may agree upon in writing from time to time.

1.3 Principal Place of Business. The principal place of business of the Partnership shall be [{{business.principalAddress}}], or such other place as the Partners may agree upon in writing from time to time.

1.4 Purpose. The purpose of the Partnership shall be to engage in the Business of [{{business.businessDescription}}].

2. TERM

2.1 The Partnership shall commence on the Effective Date and shall continue until dissolved in accordance with Section 20.

3. CAPITAL CONTRIBUTIONS

3.1 Initial Contributions. The Partners shall contribute the following capital to the Partnership:

(a) [{{party.partner1.name}}]: USD $[{{capital.partner1Contribution}}];

(b) [{{party.partner2.name}}]: USD $[{{capital.partner2Contribution}}];

(c) [{{party.partner3.name}}]: USD $[{{capital.partner3Contribution}}].

3.2 Additional Contributions. The Partners may agree from time to time that additional capital contributions are required. Any such additional contributions shall be contributed in the Profit-sharing Ratios unless otherwise agreed in writing by all Partners.

3.3 No Interest on Capital. No Partner shall be entitled to receive interest on the Partner's capital contributions unless otherwise agreed in writing.

3.4 No Return of Capital. No Partner shall have the right to demand or receive the return of any part of the Partner's capital contribution except upon the dissolution of the Partnership or as otherwise expressly provided in this Agreement.

4. PROFIT AND LOSS SHARING

4.1 Net Profits. The Net Profits of the Partnership shall be divided between the Partners in the following percentages:

(a) [{{party.partner1.name}}]: [{{profitShare.partner1Percent}}]%;

(b) [{{party.partner2.name}}]: [{{profitShare.partner2Percent}}]%;

(c) [{{party.partner3.name}}]: [{{profitShare.partner3Percent}}]%.

4.2 Net Losses. Net Losses shall be borne by the Partners in the same percentages as Net Profits are divided.

4.3 Distributions. The Partners may make distributions of available Partnership cash at such times and in such amounts as the Partners may agree upon in writing from time to time, in the Profit-sharing Ratios.

5. MANAGEMENT

5.1 Management by Partners. Each Partner shall have equal rights in the management and conduct of the Partnership Business. Each Partner shall be an agent of the Partnership for the purpose of its business.

5.2 Major Decisions. The following decisions shall require the written consent of all Partners: (a) any change to the Profit-sharing Ratios; (b) the admission of a new Partner; (c) the expulsion of any Partner; (d) any alteration to this Agreement; (e) the dissolution of the Partnership; (f) any sale, lease, or other disposition of all or substantially all of the assets of the Partnership; (g) any acquisition of any business or undertaking; (h) any borrowing or lending of money in the name of the Partnership; (i) any guarantee of the obligations of any third party.

5.3 Day-to-Day Management. The Partners may agree that certain Partners shall have primary responsibility for the day-to-day management of the Partnership, as set forth in Exhibit [{{management.dayToDayExhibit}}].

5.4 Meetings. The Partners shall hold meetings at least [{{management.meetingFrequency}}] times per calendar year. Partners may vote by written consent in lieu of a meeting.

6. DUTIES OF PARTNERS

6.1 Each Partner shall:

(a) act in good faith and in the best interests of the Partnership;

(b) devote such time and attention to the Partnership Business as is reasonably necessary;

(c) promptly notify the other Partners of any matter that may materially affect the Partnership;

(d) maintain the confidentiality of all Confidential Information;

(e) account to the Partnership for any benefit obtained from any transaction affecting the Partnership.

6.2 Non-Competition. During the term of the Partnership, no Partner shall, without the prior written consent of all other Partners: (a) be a partner, member, shareholder, employee, or consultant of any business that competes with the Business; (b) solicit or endeavour to entice away any client, customer, or employee of the Partnership.

6.3 No Exclusive Dealing. Unless otherwise agreed in writing, no Partner shall be required to devote all of the Partner's time or efforts to the Partnership.

7. BOOKS AND RECORDS

7.1 Books of Account. The Partners shall maintain complete and accurate books of account for the Partnership, recording all receipts, payments, and transactions of the Business.

7.2 Bank Accounts. All moneys belonging to the Partnership shall be deposited in the name of the Partnership in such bank or banks as the Partners may designate in writing.

7.3 Access. Each Partner shall have the right to inspect and copy the Partnership's books and records at any reasonable time upon written notice to the other Partners.

7.4 Annual Statements. Within [{{accounts.statementDays}}] days after the end of each fiscal year, the Partners shall cause to be prepared and delivered to each Partner annual financial statements of the Partnership, including without limitation a balance sheet, an income statement, and a statement of cash flows.

8. TAX MATTERS

8.1 Tax Returns. The Partners shall cause to be prepared and filed all required federal, state, and local tax returns for the Partnership.

8.2 Tax Elections. The Partners may make such elections for tax purposes as they may agree upon in writing.

8.3 Entity Not Treated as Corporation. The Partners intend that the Partnership be treated as a partnership for federal and state tax purposes, and neither the Partnership nor any Partner shall take any action inconsistent with such treatment.

9. PARTNERSHIP PROPERTY

9.1 All property, real or personal, acquired by or for the Partnership shall be owned by the Partnership as an entity, and no Partner shall have any individual ownership interest in any Partnership property.

9.2 No Partner shall sell, mortgage, pledge, hypothecate, or otherwise dispose of or encumber any Partnership property without the prior written consent of all Partners.

10. DEATH OR INCAPACITY OF A PARTNER

10.1 Continuation. If a Partner dies or becomes legally incapacitated, the Partnership shall not be dissolved but shall continue with the remaining Partners. The deceased or incapacitated Partner's interest in the Partnership shall be dealt with in accordance with Section 21.

10.2 Deceased Partner's Estate. The personal representative of the estate of a deceased Partner shall have all the rights of a Partner for the purpose of settling the estate, but shall not have any voting rights or management authority.

11. RETIREMENT

11.1 Any Partner may retire from the Partnership upon not less than [{{retirement.noticeDays}}] months' prior written notice to all other Partners.

11.2 Upon retirement, the retiring Partner's interest in the Partnership shall be dealt with in accordance with Section 21.

12. EXPULSION

12.1 A Partner may be expelled by the affirmative vote of Partners whose Percentage Interests together exceed 50% of the total Percentage Interests if:

(a) such Partner commits a material breach of this Agreement and fails to remedy such breach within [{{expulsion.curePeriodDays}}] days after written notice specifying the breach;

(b) such Partner is declared bankrupt or makes an assignment for the benefit of creditors;

(c) such Partner is convicted of a felony or any crime involving moral turpitude.

12.2 An expelled Partner's interest shall be dealt with in accordance with Section 21.

13. NEW PARTNER

13.1 No new Partner shall be admitted to the Partnership without the prior written consent of all existing Partners.

14. VOLUNTARY TRANSFER

14.1 No Partner shall sell, assign, transfer, pledge, hypothecate, or otherwise dispose of all or any part of such Partner's interest in the Partnership without the prior written consent of all other Partners.

15. CONFIDENTIALITY

15.1 Each Partner shall keep confidential all Confidential Information of the Partnership and shall not, without the prior written consent of all other Partners, disclose such information to any third party.

15.2 Upon the retirement or expulsion of any Partner, such Partner shall return to the Partnership all books, records, and other documents and materials belonging to the Partnership.

16. INDEMNIFICATION

16.1 The Partnership shall indemnify and hold harmless each Partner from and against any Losses incurred by such Partner in connection with the Partnership Business, provided that such Losses are not the result of such Partner's fraud, wilful misconduct, or breach of this Agreement.

17. NON-SOLICITATION

17.1 Upon the retirement, expulsion, or death of any Partner, such Partner shall not, for a period of [{{restrictivePeriod.months}}] months after ceasing to be a Partner: (a) solicit or endeavour to entice away any client, customer, or supplier of the Partnership with whom such Partner had material contact; (b) solicit for employment any person who was an employee of the Partnership during the [{{restrictivePeriod.employeeContactMonths}}] months preceding such Partner's cessation.

18. BUY-SELL PROVISIONS

18.1 Valuation. The value of any Partner's interest in the Partnership (whether on retirement, expulsion, death, or otherwise) shall be determined as set forth in Exhibit [{{buysell.valuationExhibit}}].

18.2 Buyout. The continuing Partners shall have the right, but not the obligation, to purchase the departing Partner's interest in the Partnership for the agreed valuation, payable in cash or on such terms as the Partners may agree.

19. DISSOLUTION AND WINDING UP

19.1 The Partnership shall be dissolved upon the first to occur of the following:

(a) the unanimous written agreement of all Partners to dissolve;

(b) the expiration of any fixed term agreed for the Partnership;

(c) the retirement, expulsion, or death of a Partner, unless the remaining Partners unanimously agree to continue the Partnership within [{{dissolution.continuationDays}}] days;

(d) a court order dissolving the Partnership;

(e) any event that makes it unlawful or impossible for the Business to be continued.

19.2 Winding Up. Upon dissolution, the Partners shall: (a) wind up the affairs of the Partnership; (b) collect all Partnership receivables; (c) sell all Partnership assets at the best available price; (d) pay all Partnership debts and liabilities; (e) distribute any remaining assets to the Partners in the Profit-sharing Ratios.

20. MISCELLANEOUS

20.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{terms.governingState}}].

20.2 Entire Agreement. This Agreement, together with any Exhibits attached hereto, constitutes the entire agreement between the Partners.

20.3 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by all Partners.

20.4 Severability. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

20.5 Notices. All notices shall be in writing and shall be deemed delivered upon personal delivery, certified mail return receipt requested, or email with confirmation of receipt, to the addresses set forth above or as updated in writing.

20.6 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

20.7 Further Assurances. Each Partner shall execute such additional documents and take such additional actions as may be reasonably necessary to effect the purposes of this Agreement.

20.8 Dispute Resolution. Any dispute arising out of or relating to this Agreement shall first be submitted to mediation in accordance with the rules of the American Arbitration Association. If not resolved through mediation within [{{dispute.mediationDays}}] days, either Party may submit the dispute to the state or federal courts of [{{terms.governingState}}].

IN WITNESS WHEREOF, the Partners have executed this Agreement as of the date first written above.

PARTNER:

Signature: _______________________________
Name: [{{party.partner1.name}}]
Date: [{{dates.agreementDate}}]

PARTNER:

Signature: _______________________________
Name: [{{party.partner2.name}}]
Date: [{{dates.agreementDate}}]

PARTNER:

Signature: _______________________________
Name: [{{party.partner3.name}}]]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Partners intend to form a limited liability partnership (LLP) or limited partnership (LP) — separate filings with the relevant Secretary of State are required and the applicable Uniform Limited Partnership Act or Limited Liability Partnership Act applies; any Partner is a corporation, LLC, or other business entity rather than an individual; the Partners are seeking to form a tax-opaque entity (e.g., a corporation) — additional entity formation steps and formalities are required. This template reflects general U.S. general partnership practice and must be reviewed by a qualified attorney before use. Jurisdiction: United States of America (adapt for specific state law).`;

const LEGEND: LegendItem[] = [
  { path: 'party.partner1.name', label: "Partner 1 full name", type: 'string', required: true, example: 'William George Harrington' },
  { path: 'party.partner1.address', label: "Partner 1 address", type: 'text', required: true, example: '450 Park Avenue, Apt 12A, New York, NY 10022' },
  { path: 'party.partner2.name', label: "Partner 2 full name", type: 'string', required: true, example: 'James Robert Thornton' },
  { path: 'party.partner2.address', label: "Partner 2 address", type: 'text', required: true, example: '200 Clarendon Street, Unit 4, Boston, MA 02116' },
  { path: 'party.partner3.name', label: "Partner 3 full name", type: 'string', required: false, example: 'Victoria Rose Ashworth' },
  { path: 'party.partner3.address', label: "Partner 3 address", type: 'text', required: false, example: '100 First Street, Suite 500, San Francisco, CA 94105' },
  { path: 'business.businessName', label: 'Partnership business name', type: 'string', required: true, example: 'Harrington & Thornton Ventures LLC' },
  { path: 'business.businessDescription', label: 'Business description', type: 'string', required: true, example: 'the acquisition, development, and management of commercial real estate properties in the northeastern United States' },
  { path: 'business.principalAddress', label: 'Principal place of business', type: 'text', required: true, example: '450 Park Avenue, Suite 2400, New York, NY 10022' },
  { path: 'terms.governingState', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'capital.partner1Contribution', label: 'Partner 1 contribution (USD)', type: 'number', required: true, example: 100000 },
  { path: 'capital.partner2Contribution', label: 'Partner 2 contribution (USD)', type: 'number', required: true, example: 100000 },
  { path: 'capital.partner3Contribution', label: 'Partner 3 contribution (USD)', type: 'number', required: false, example: 50000 },
  { path: 'profitShare.partner1Percent', label: 'Partner 1 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner2Percent', label: 'Partner 2 profit share (%)', type: 'number', required: true, example: 40 },
  { path: 'profitShare.partner3Percent', label: 'Partner 3 profit share (%)', type: 'number', required: false, example: 20 },
  { path: 'management.dayToDayExhibit', label: 'Day-to-day management exhibit reference', type: 'string', required: false, example: 'A' },
  { path: 'management.meetingFrequency', label: 'Minimum partner meetings per year', type: 'number', required: false, example: 4 },
  { path: 'accounts.statementDays', label: 'Annual statement delivery deadline (days)', type: 'number', required: false, example: 90 },
  { path: 'retirement.noticeDays', label: 'Retirement notice period (days)', type: 'number', required: true, example: 90 },
  { path: 'expulsion.curePeriodDays', label: 'Breach cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'restrictivePeriod.months', label: 'Non-solicit period (months)', type: 'number', required: true, example: 24 },
  { path: 'restrictivePeriod.employeeContactMonths', label: 'Employee contact period (months)', type: 'number', required: false, example: 12 },
  { path: 'buysell.valuationExhibit', label: 'Valuation exhibit reference', type: 'string', required: false, example: 'B' },
  { path: 'dissolution.continuationDays', label: 'Continuation decision period (days)', type: 'number', required: false, example: 30 },
  { path: 'dispute.mediationDays', label: 'Mediation period (days)', type: 'number', required: false, example: 30 },
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
  const product = await prisma.product.upsert({ where: { slug: SLUG }, update: { status: ProductStatus.PUBLISHED, title: 'Partnership Agreement', category: 'Corporate & Commercial' }, create: { slug: SLUG, title: 'Partnership Agreement', category: 'Corporate & Commercial', type: ProductType.SINGLE, status: ProductStatus.PUBLISHED } });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction: 'US' } });
  if (!template) template = await prisma.template.create({ data: { productId: product.id, jurisdiction: 'US', name: 'Partnership Agreement', description: 'United States of America (general template)' } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] partnership-agreement (US)'); return; }
  const v = await prisma.templateVersion.create({ data: { version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(LEGEND), bodyTemplate: PARTNERSHIP_US, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] } });
  const issues = validateTemplateVersion(v, payload(LEGEND)).issues;
  if (issues.length) console.warn('[WARN]', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] partnership-agreement (US) — v=' + v.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());