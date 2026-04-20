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

// ─── POWER OF ATTORNEY — US ───────────────────────────────────────────────────

const POA_US = `POWER OF ATTORNEY

Title: Durable Power of Attorney
Version: 1
Jurisdiction: United States of America

Date: [{{dates.powerOfAttorneyDate}}]

IMPORTANT INFORMATION

This Power of Attorney and the powers granted hereunder are governed by the laws of the State of [{{legal.governingState}}]. This document does not have to be notarized to be effective, but notarization is recommended. You should consult with a licensed attorney in the State of [{{legal.governingState}}] before executing this document.

1. CREATION OF POWER OF ATTORNEY

I, [{{party.principal.name}}], a resident of [{{party.principal.city}}], [{{party.principal.state}}], hereby nominate, constitute, and appoint [{{party.attorney.name}}] of [{{party.attorney.address}}] as my true and lawful attorney-in-fact (the "Attorney-in-Fact" or "Agent") to act in my name, place, and stead in accordance with the powers granted in this Power of Attorney.

2. EFFECTIVE DATE

2.1 This Power of Attorney shall become effective on [{{terms.effectiveDate}}] (the "Effective Date").

2.2 This Power of Attorney is intended to be a "Durable Power of Attorney" and shall remain in full force and effect notwithstanding any subsequent incapacity or disability of the Principal, in accordance with [{{legal.durableActCitation}}].

3. SCOPE OF AUTHORITY

3.1 Financial and Business Powers. My Attorney-in-Fact shall have the following powers with respect to my financial and business affairs, to be exercised in my Attorney-in-Fact's discretion:

(a) To execute, acknowledge, seal, deliver, and file any and all instruments of whatever kind that my Attorney-in-Fact deems necessary or appropriate for the accomplishment of any purpose within the scope of this Power of Attorney;

(b) To open, maintain, or close any bank account, brokerage account, or other financial account in my name;

(c) To deposit and withdraw funds from any such account;

(d) To purchase, sell, exchange, or otherwise acquire or dispose of any stocks, bonds, securities, or other investments in my name or in which I have an interest;

(e) To borrow money, to execute notes, mortgages, and other evidences of indebtedness, and to pledge or hypothecate any of my assets as security;

(f) To execute any tax return, claim for refund, or other tax-related document in my name;

(g) To exercise any stock option, subscription right, conversion privilege, or other right in respect of any securities owned by me;

(h) To enter into, modify, or terminate any contract, lease, or other agreement in my name;

(i) To make any election or election to take or to refrain from taking any action under any policy of insurance, including without limitation health, life, disability, or property insurance;

(j) [{{authority.additionalFinancialPowersText}}].

3.2 Real Property Powers. My Attorney-in-Fact shall have the following powers with respect to any real property in which I have an interest:

(a) To purchase, sell, exchange, mortgage, pledge, or otherwise acquire or dispose of any real property;

(b) To execute, acknowledge, and deliver any deed, mortgage, note, lease, or other instrument relating to any real property;

(c) To exercise any option or right of first refusal in respect of any real property;

(d) [{{authority.realPropertyPowersText}}].

3.3 Personal and Family Matters. My Attorney-in-Fact shall have the following powers with respect to my personal and family affairs:

(a) To arrange for and consent to any medical, dental, or surgical treatment or procedure for me, including without limitation any invasive procedure, anaesthetic, or blood transfusion, in the event that I am unable to give informed consent;

(b) To arrange for my admission to or discharge from any hospital, nursing home, or other care facility;

(c) To make decisions regarding my nutrition, hydration, medication, and comfort care;

(d) [{{authority.personalPowersText}}].

3.4 Limitations. Notwithstanding the foregoing, my Attorney-in-Fact shall NOT have the power to:

(a) Make any gift from my estate without my prior written consent or the consent of a court;

(b) Create or amend any will or trust on my behalf;

(c) Enter into any transaction on my behalf where my Attorney-in-Fact has a personal conflict of interest;

(d) [{{authority.additionalLimitationsText}}].

4. ATTORNEY-IN-FACT'S DUTIES

4.1 My Attorney-in-Fact shall:

(a) Act in accordance with my known wishes, or if my wishes are unknown, in my best interests;

(b) Disclose any actual or potential conflicts of interest before taking any action on my behalf;

(c) Maintain accurate records of all transactions entered into on my behalf and provide such records to me upon request or, if I am incapacitated, to my guardian or representative;

(d) Not delegate any power granted herein without my prior written consent or the consent of a court;

(e) Cooperate with any court-appointed guardian or representative.

5. ATTORNEY-IN-FACT'S COMPENSATION

5.1 My Attorney-in-Fact shall be entitled to receive reasonable compensation for services rendered under this Power of Attorney, in accordance with the customary fees charged for similar services in the State of [{{legal.governingState}}], unless I have agreed otherwise in writing.

5.2 My Attorney-in-Fact shall be entitled to reimbursement from my estate for all reasonable expenses incurred in the performance of its duties hereunder.

6. THIRD-PARTY RELIANCE

6.1 Any third party may rely upon and act in accordance with any representation made by my Attorney-in-Fact hereunder, and shall not be required to inquire into the propriety of any act or decision made by my Attorney-in-Fact.

6.2 The signature of my Attorney-in-Fact on any instrument or document shall be conclusive evidence of my Attorney-in-Fact's authority to execute such instrument or document.

7. INDEMNIFICATION

7.1 I hereby indemnify and hold harmless my Attorney-in-Fact from and against any and all claims, damages, losses, and expenses arising out of or in connection with any act or decision made by my Attorney-in-Fact in good faith in the performance of its duties hereunder, except for any act or decision resulting from the Attorney-in-Fact's gross negligence or wilful misconduct.

8. SEVERABILITY

8.1 If any provision of this Power of Attorney is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

9. REVOCATION

9.1 I may revoke this Power of Attorney at any time by executing a written instrument of revocation and delivering notice to my Attorney-in-Fact. Any revocation shall not affect any action taken by my Attorney-in-Fact in good faith prior to receipt of such notice.

10. GOVERNING LAW

10.1 This Power of Attorney shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}].

IN WITNESS WHEREOF, I have executed this Power of Attorney as of the date first written above.

________________________________________
[{{party.principal.name}}], Principal

Address: [{{party.principal.address}}]

CERTIFICATE OF ATTORNEY-IN-FACT

I, [{{party.attorney.name}}], hereby accept the nomination as Attorney-in-Fact for [{{party.principal.name}}] as set forth in this Power of Attorney, and I hereby agree to act in accordance with the terms and conditions set forth herein.

Signature: _______________________________
Date: [{{dates.powerOfAttorneyDate}}]

---
Template document. Not legal advice. This Power of Attorney template is for general use and does not constitute legal advice. Not suitable if: the Principal is not a resident of the relevant state (a different state's law may apply); the Principal requires a springing power of attorney (i.e., one that only takes effect upon incapacity — requires specific triggering event language); the Principal is a business entity rather than an individual; the arrangement involves authority over a trust (a separate trust-specific power of attorney may be required). This template must be reviewed by a qualified attorney before use. Jurisdiction: United States of America (adapt for specific state law — power of attorney statutes vary significantly by state; the Uniform Power of Attorney Act has been adopted in a majority of states but state-specific variations remain).`;

const LEGEND_POA_US: LegendItem[] = [
  { path: 'party.principal.name', label: "Principal's full name", type: 'string', required: true, example: 'Patricia Anne Whitmore' },
  { path: 'party.principal.city', label: "Principal's city of residence", type: 'string', required: true, example: 'New York' },
  { path: 'party.principal.state', label: "Principal's state of residence", type: 'string', required: true, example: 'New York' },
  { path: 'party.principal.address', label: "Principal's address", type: 'text', required: true, example: '450 Park Avenue, Apt 12A, New York, NY 10022' },
  { path: 'party.attorney.name', label: "Attorney-in-fact's full name", type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'party.attorney.address', label: "Attorney-in-fact's address", type: 'text', required: true, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'legal.durableActCitation', label: 'Durable Power of Attorney Act citation', type: 'string', required: false, example: 'Section 5-1601 of the New York General Obligations Law' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'authority.additionalFinancialPowersText', label: 'Additional financial powers text', type: 'text', required: false, example: 'To initiate, defend, or settle any legal proceeding in my name, including without limitation any civil, criminal, or administrative matter.' },
  { path: 'authority.realPropertyPowersText', label: 'Additional real property powers text', type: 'text', required: false, example: 'To manage any real property that I own or in which I have an interest, including without limitation the power to execute leases, collect rent, pay property taxes and insurance, and arrange for repairs and maintenance.' },
  { path: 'authority.personalPowersText', label: 'Additional personal powers text', type: 'text', required: false, example: 'To arrange for home health aides, nursing care, and other in-home support services as may be necessary for my well-being.' },
  { path: 'authority.additionalLimitationsText', label: 'Additional limitations text', type: 'text', required: false, example: 'My Attorney-in-Fact shall not have the authority to vote any shares of stock in any corporation in which I am a majority shareholder without the prior approval of a court of competent jurisdiction.' },
  { path: 'dates.powerOfAttorneyDate', label: 'Power of Attorney execution date', type: 'date', required: true, example: '2025-06-01' },
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
  await seedProduct('power-of-attorney', 'Power of Attorney', 'Wills, Trusts & Estate', 'US', 'United States of America', POA_US, LEGEND_POA_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());