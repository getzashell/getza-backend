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

// ─── LAST WILL AND TESTAMENT — US ───────────────────────────────────────────

const WILL_US = `LAST WILL AND TESTAMENT

Title: Last Will and Testament
Version: 1
Jurisdiction: United States of America

I, [{{party.testator.name}}], a resident of [{{party.testator.city}}], [{{party.testator.state}}], being of sound mind and disposing memory, and not acting under duress, menace, fraud, or the undue influence of any person whomsoever, do hereby make, publish, and declare this instrument to be my Last Will and Testament, hereby expressly revoking all prior wills and codicils heretofore made by me.

ARTICLE I: FAMILY

1.1 I am [{{family.maritalStatus}}]. My [{{family.spouseRelationship}}], [{{family.spouseName}}], is living at the time of the execution of this Will.

1.2 I have the following children: [{{family.childrenText}}].

1.3 [{{family.otherDependantsText}}]

ARTICLE II: PAYMENT OF DEBTS AND EXPENSES

2.1 I direct my Executor (as defined below) to pay, from my residuary estate (as defined below) and as soon as practicable after my death, all of my legally enforceable debts, my funeral and burial expenses, and the expenses of administering my estate. My Executor shall have the discretion to determine which debts and expenses are legally enforceable and the order and timing of such payments.

2.2 My Executor shall have the power to contest any claim against my estate that my Executor believes to be invalid or unenforceable.

ARTICLE III: SPECIFIC BEQUESTS

3.1 I make the following specific bequests:

(a) I give and bequeath to [{{bequests.gift1Recipient}}]: [{{bequests.gift1Description}}];

(b) I give and bequeath to [{{bequests.gift2Recipient}}]: [{{bequests.gift2Description}}];

(c) I give and bequeath to [{{bequests.gift3Recipient}}]: [{{bequests.gift3Description}}].

3.2 If any beneficiary named in this Article III predeceases me, such bequest shall lapse and the property subject to such lapsed bequest shall become part of my residuary estate.

ARTICLE IV: RESIDUARY ESTATE

4.1 I give, devise, and bequeath all the rest, residue, and remainder of my estate, of whatever kind and character, and wherever situated, whether real, personal, or mixed, including all property over which I may have power of appointment at the time of my death (my "Residuary Estate"), as follows:

(a) [{{residuary.primaryText}}];

(b) [{{residuary.alternateText}}].

4.2 If any residuary beneficiary predeceases me, that beneficiary's share shall pass to [{{residuary.contingentText}}].

4.3 If no residuary beneficiary survives me, my Residuary Estate shall be distributed to [{{residuary.ultimateBeneficiary}}].

ARTICLE V: APPOINTMENT OF EXECUTOR

5.1 I hereby nominate and appoint [{{executor.primaryName}}] of [{{executor.primaryAddress}}] as the Independent Executor of this, my Last Will and Testament.

5.2 If my primary Executor is unable or unwilling to serve, or ceases to serve for any reason, I nominate and appoint [{{executor.alternateName}}] of [{{executor.alternateAddress}}] as my successor Executor.

5.3 I direct that no bond or other security shall be required of any Executor nominated herein in any jurisdiction.

5.4 I grant to my Executor the following powers, in addition to those powers conferred by the laws of the State of [{{executor.governingState}}], to be exercised in the Executor's sole discretion:

(a) To retain any property forming part of my estate, whether or not such property is income-producing, for as long as my Executor deems advisable;

(b) To sell, lease, exchange, or otherwise dispose of any property of my estate, at public or private sale, for cash or on credit, with or without security, upon such terms and conditions as my Executor deems advisable;

(c) To invest and reinvest estate assets in any investment that my Executor deems advisable, without being limited to investments authorised by law for trust investments;

(d) To borrow money for estate purposes and to mortgage or pledge any estate property as security therefor;

(e) To compromise, settle, or abandon any claim or demand in favour of or against my estate;

(f) To employ and pay from my estate the fees of attorneys, accountants, investment advisers, and other agents;

(g) To make distributions in cash or in kind, or partly in each;

(h) To exercise sole discretion in determining what constitutes income and what constitutes principal of my estate.

ARTICLE VI: TRUST PROVISIONS

6.1 [{{trust.trustProvisionsText}}]

6.2 If any trust created hereunder would, under applicable law, be invalid or unenforceable for any reason, the property subject to such trust shall instead be distributed outright to the beneficiary who would have been entitled to the income of such trust.

ARTICLE VII: WILLS OF SPOUSE

7.1 [{{family.spouseWillText}}]

ARTICLE VIII: GUARDIAN OF MINOR CHILDREN

8.1 If I am the surviving parent of any minor child at the time of my death, I nominate and appoint [{{guardian.primaryName}}] of [{{guardian.primaryAddress}}] as the guardian of the person and estate of such minor child.

8.2 If my primary guardian is unable or unwilling to serve, I nominate and appoint [{{guardian.alternateName}}] of [{{guardian.alternateAddress}}] as successor guardian.

8.3 [{{guardian.additionalText}}]

ARTICLE IX: TAX ELECTIONS

9.1 I authorise my Executor to make any and all tax elections available under the Internal Revenue Code and the laws of the State of [{{tax.state}}] that my Executor, in my Executor's sole discretion, deems to be in the best interest of my estate and its beneficiaries, including without limitation elections regarding the timing and valuation of assets included in my gross estate.

9.2 All estate and inheritance taxes payable by reason of my death shall be paid from my Residuary Estate, without apportionment against any specific bequest or beneficiary, unless otherwise required by applicable law.

ARTICLE X: GENERAL PROVISIONS

10.1 Definitions. As used in this Will: (a) "children" includes legally adopted children; (b) "including" means "including without limitation"; (c) words importing the singular include the plural and vice versa.

10.2 Simultaneous Death. If any beneficiary and I die simultaneously, or under circumstances that make it impossible to determine who died first, I shall be deemed to have survived such beneficiary for all purposes of this Will.

10.3 No Contest Clause. If any beneficiary under this Will contests this Will or any provision hereof, or institutes or joins in (except as a party defendant) any proceeding to contest the validity of this Will or to prevent any provision hereof from being carried out, then such beneficiary shall forfeit all interest in my estate and such interest shall be disposed of as if such beneficiary had predeceased me without descendants.

10.4 Governing Law. This Will shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}].

IN TESTIMONY WHEREOF, I have hereunto set my hand to this, my Last Will and Testament, on this [{{dates.willDate}}] day of [{{dates.willMonthYear}}].

________________________________________
[{{party.testator.name}}], Testator

ATTESTATION CLAUSE

The foregoing instrument was signed, published, and declared by [{{party.testator.name}}], the Testator, as and for the Testator's Last Will and Testament, in our presence, and we, at the Testator's request, in the Testator's presence, and in the presence of each other, have subscribed our names as attesting witnesses thereto. We declare that we are of sound mind and that we observed the signing of this Will by the Testator and by each other witness on the date set forth above. We declare under penalty of perjury under the laws of the State of [{{attestation.state}}] that the foregoing is true and correct.

Signed on [{{dates.attestationDate}}]:

Witness 1:

Signature: _______________________________
Printed Name: [{{witnesses.witness1Name}}]
Address: [{{witnesses.witness1Address}}]
Relationship to Testator: [{{witnesses.witness1Relationship}}]

Witness 2:

Signature: _______________________________
Printed Name: [{{witnesses.witness2Name}}]
Address: [{{witnesses.witness2Address}}]
Relationship to Testator: [{{witnesses.witness2Relationship}}]

---
Template document. Not legal advice. Not suitable if: the Testator is domiciled in a community property state (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, Wisconsin) — community property laws significantly affect the disposition of marital property and may limit testamentary freedom; the estate exceeds the federal estate tax exemption (currently USD 13.61 million per person in 2024) — additional estate planning tools (trusts, charitable giving strategies) would be required; the Testator has minor children requiring special needs trust arrangements; the estate includes specific assets such as retirement accounts, life insurance, or closely-held business interests that require beneficiary designation coordination. This template reflects general U.S. practice and must be reviewed by a qualified estate planning attorney before use. Jurisdiction: United States of America (adapt for specific state law — all states except Louisiana use essentially similar will structures, but state-specific variations in executor powers, community property, and augmented estate rules apply).`;

const LEGEND_WILL_US: LegendItem[] = [
  { path: 'party.testator.name', label: "Testator full legal name", type: 'string', required: true, example: 'Robert James Whitfield' },
  { path: 'party.testator.city', label: "Testator city of residence", type: 'string', required: true, example: 'New York' },
  { path: 'party.testator.state', label: "Testator state of residence", type: 'string', required: true, example: 'New York' },
  { path: 'family.maritalStatus', label: 'Marital status', type: 'enum', required: true, rules: { options: ['married', 'single', 'divorced', 'widowed'] }, example: 'married' },
  { path: 'family.spouseRelationship', label: 'Spouse relationship', type: 'string', required: false, example: 'husband' },
  { path: 'family.spouseName', label: "Spouse's full name", type: 'string', required: false, example: 'Margaret Anne Whitfield' },
  { path: 'family.childrenText', label: 'Children names and dates of birth', type: 'text', required: false, example: 'Thomas Robert Whitfield, born January 15, 1998; Emily Jane Whitfield, born June 8, 2001' },
  { path: 'family.otherDependantsText', label: 'Other dependants text', type: 'text', required: false, example: 'None' },
  { path: 'family.spouseWillText', label: "Spouse's will text", type: 'text', required: false, example: 'My spouse, Margaret Anne Whitfield, has executed or will execute a separate last will and testament.' },
  { path: 'bequests.gift1Recipient', label: 'Gift 1 recipient', type: 'string', required: false, example: 'my son Thomas Robert Whitfield' },
  { path: 'bequests.gift1Description', label: 'Gift 1 description', type: 'string', required: false, example: 'my Honda Civic motor vehicle, VIN 1HGBH41JXMN109186' },
  { path: 'bequests.gift2Recipient', label: 'Gift 2 recipient', type: 'string', required: false, example: 'my daughter Emily Jane Whitfield' },
  { path: 'bequests.gift2Description', label: 'Gift 2 description', type: 'string', required: false, example: 'my diamond engagement ring and associated jewellery' },
  { path: 'bequests.gift3Recipient', label: 'Gift 3 recipient', type: 'string', required: false, example: 'the American Heart Association (federal tax ID: 13-3793456)' },
  { path: 'bequests.gift3Description', label: 'Gift 3 description', type: 'string', required: false, example: 'the sum of USD 25,000, free of all taxes and estate or inheritance charges' },
  { path: 'residuary.primaryText', label: 'Primary residuary beneficiary text', type: 'text', required: true, example: '60% of my Residuary Estate to my spouse, Margaret Anne Whitfield, if she survives me; or if she does not survive me, to my children Thomas Robert Whitfield and Emily Jane Whitfield, in equal shares, per stirpes' },
  { path: 'residuary.alternateText', label: 'Alternate residuary beneficiary text', type: 'text', required: false, example: '40% of my Residuary Estate to my friend Peter James Osborne, if he survives me' },
  { path: 'residuary.contingentText', label: 'Contingent residuary text', type: 'string', required: false, example: 'the survivors of the class of primary residuary beneficiaries, in equal shares per stirpes' },
  { path: 'residuary.ultimateBeneficiary', label: 'Ultimate residuary beneficiary', type: 'string', required: false, example: 'the American Heart Association (federal tax ID: 13-3793456)' },
  { path: 'executor.primaryName', label: 'Primary executor full name', type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'executor.primaryAddress', label: 'Primary executor address', type: 'text', required: true, example: '450 Park Avenue, Suite 2400, New York, NY 10022' },
  { path: 'executor.alternateName', label: 'Alternate executor full name', type: 'string', required: false, example: 'Catherine Anne Brooks' },
  { path: 'executor.alternateAddress', label: 'Alternate executor address', type: 'text', required: false, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'executor.governingState', label: 'Executor powers governing state', type: 'string', required: false, example: 'New York' },
  { path: 'trust.trustProvisionsText', label: 'Trust provisions text', type: 'text', required: false, example: 'If any beneficiary entitled to a share of my Residuary Estate is under the age of 25 at the time of distribution, that beneficiary\'s share shall be held in trust for that beneficiary by my Executor until such beneficiary attains the age of 25. During the trust period, the Trustee may apply trust income and principal for the health, education, maintenance, and support of the beneficiary. Upon attaining age 25, the remaining trust assets shall be distributed outright to the beneficiary.' },
  { path: 'guardian.primaryName', label: 'Primary guardian full name', type: 'string', required: false, example: 'Patricia Anne Whitmore' },
  { path: 'guardian.primaryAddress', label: 'Primary guardian address', type: 'text', required: false, example: '200 Clarendon Street, Boston, MA 02116' },
  { path: 'guardian.alternateName', label: 'Alternate guardian full name', type: 'string', required: false, example: 'Jonathan Mark Davies' },
  { path: 'guardian.alternateAddress', label: 'Alternate guardian address', type: 'text', required: false, example: '450 Park Avenue, Suite 2400, New York, NY 10022' },
  { path: 'guardian.additionalText', label: 'Additional guardianship text', type: 'text', required: false, example: 'I request that any guardian appointed hereunder permit my children to continue in their current school and maintain contact with extended family.' },
  { path: 'tax.state', label: 'State for tax elections', type: 'string', required: false, example: 'New York' },
  { path: 'legal.governingState', label: 'Governing state for will', type: 'string', required: true, example: 'New York' },
  { path: 'dates.willDate', label: 'Will signing date (day)', type: 'string', required: true, example: '1' },
  { path: 'dates.willMonthYear', label: 'Will signing month and year', type: 'string', required: true, example: 'June 2025' },
  { path: 'dates.attestationDate', label: 'Attestation date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'attestation.state', label: 'Attestation state', type: 'string', required: false, example: 'New York' },
  { path: 'witnesses.witness1Name', label: 'Witness 1 printed name', type: 'string', required: true, example: 'Sarah Elizabeth Mitchell' },
  { path: 'witnesses.witness1Address', label: 'Witness 1 address', type: 'text', required: true, example: '100 Park Avenue, New York, NY 10017' },
  { path: 'witnesses.witness1Relationship', label: 'Witness 1 relationship to testator', type: 'string', required: false, example: 'friend' },
  { path: 'witnesses.witness2Name', label: 'Witness 2 printed name', type: 'string', required: true, example: 'Helena Margaret Forsyth' },
  { path: 'witnesses.witness2Address', label: 'Witness 2 address', type: 'text', required: true, example: '200 Park Avenue, New York, NY 10017' },
  { path: 'witnesses.witness2Relationship', label: 'Witness 2 relationship to testator', type: 'string', required: false, example: 'colleague' },
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
  await seedProduct('last-will-testament', 'Last Will & Testament', 'Wills, Trusts & Estate', 'US', 'United States of America', WILL_US, LEGEND_WILL_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());