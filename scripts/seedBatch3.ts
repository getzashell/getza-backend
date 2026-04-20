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

// ─── LAST WILL AND TESTAMENT — UK ───────────────────────────────────────────

const WILL_UK = `LAST WILL AND TESTAMENT

Title: Last Will and Testament
Version: 1
Jurisdiction: United Kingdom (England & Wales)

THIS IS THE LAST WILL AND TESTAMENT of [{{party.testator.name}}] of [{{party.testator.address}}] ("Testator") made on [{{dates.willDate}}]

1. REVOCATION

1.1 I revoke all wills and testamentary dispositions previously made by me and declare this to be my last will and testament.

2. DECLARATION

2.1 I declare that I am of sound mind and not acting under duress, undue influence, or misrepresentation. This will is made voluntarily.

2.2 I confirm that I have reached the age of 18 years or am otherwise of sufficient legal capacity to make a valid will under the law of England and Wales.

3. FAMILY AND DEPENDANTS

3.1 My [{{family.maritalStatus}}] is [{{family.spouseName}}] (referred to as "my Spouse").

3.2 My children are: [{{family.childrenText}}].

3.3 [{{family.otherDependantsText}}]

4. APPOINTMENT OF EXECUTORS AND TRUSTEES

4.1 I appoint [{{executors.primaryExecutorName}}] of [{{executors.primaryExecutorAddress}}] to be the executor and trustee of this my will (the "Executor").

4.2 If the primary Executor is unable or unwilling to act, I appoint [{{executors.alternateExecutorName}}] of [{{executors.alternateExecutorAddress}}] as the alternate executor and trustee.

4.3 I direct that my Executor shall be entitled to act as a sole executor and trustee under this will without being required to appoint any other executor or trustee.

4.4 My Executor shall be empowered to appoint a replacement executor or trustee in the event of any subsequent vacancy, by notice in writing to the beneficiaries then entitled to the relevant trust fund.

5. GIFTS OF SPECIFIC ASSETS

5.1 I give to [{{gifts.specificGiftsText}}] the following specific gifts:

(a) [{{gifts.gift1Asset}}] to [{{gifts.gift1Recipient}}];

(b) [{{gifts.gift2Asset}}] to [{{gifts.gift2Recipient}}];

(c) [{{gifts.gift3Asset}}] to [{{gifts.gift3Recipient}}].

5.2 If any beneficiary predeceases me, the gift to that beneficiary shall lapse and form part of my residuary estate.

6. GIFTS OF MONEY

6.1 I give the following pecuniary legacies (free of inheritance tax):

(a) GBP [{{legacies.legacy1Amount}}] to [{{legacies.legacy1Recipient}}];

(b) GBP [{{legacies.legacy2Amount}}] to [{{legacies.legacy2Recipient}}];

(c) [{{legacies.legacy3Text}}].

6.2 If any legacy beneficiary predeceases me, that legacy shall not pass to such beneficiary's estate but shall instead fall into my residuary estate.

7. RESIDUARY ESTATE

7.1 I give all my property, assets, and estate not otherwise disposed of by this will (my "residuary estate") as follows:

(a) [{{residuary.primaryBeneficiaryText}}];

(b) [{{residuary.alternateBeneficiaryText}}].

7.2 If the primary residuary beneficiary predeceases me, that beneficiary's share shall pass to [{{residuary.secondaryBeneficiaryText}}].

8. TRUST ARRANGEMENTS

[{{trust.trustArrangementsText}}]

9. executor POWERS

9.1 In addition to the powers conferred by law, my Executor shall have the following powers:

(a) To retain any asset forming part of my estate for as long as my Executor considers appropriate;

(b) To sell, lease, mortgage, exchange, or otherwise dispose of any asset of my estate at such price and upon such terms as my Executor thinks fit;

(c) To invest and reinvest estate funds in any investment permitted by law for trust investments, including shares, bonds, funds, land, and buildings;

(d) To borrow money for the purposes of my estate on such terms as my Executor thinks fit;

(e) To compromise, settle, or abandon any claim or dispute affecting my estate;

(f) To employ and pay solicitors, accountants, investment advisers, and other agents from my estate;

(g) To make any distribution in cash or in specie, or partly in each;

(h) To register any asset in the name of a nominee;

(i) To do all other acts and execute all other documents as may be necessary or desirable for the administration of my estate.

10. INHERITANCE TAX

10.1 I direct that all inheritance tax and other taxes payable in respect of my estate by reason of my death shall be paid from my residuary estate, and shall not be raised from or apportioned among the recipients of any specific gift or legacy.

10.2 [{{tax.ihmcdChargeText}}]

11. WILLS OF SPOUSE OR CIVIL PARTNER

[{{family.spouseWillText}}]

12. GUARDIANSHIP OF CHILDREN

12.1 If I am the surviving parent of any child under the age of 18 at my death, I appoint [{{guardians.primaryGuardianName}}] of [{{guardians.primaryGuardianAddress}}] to be the guardian of such child.

12.2 If the primary guardian is unable or unwilling to act, I appoint [{{guardians.alternateGuardianName}}] of [{{guardians.alternateGuardianAddress}}] as the alternate guardian.

12.3 [{{guardians.guardianshipConditionsText}}]

13. SMALL GIFTS

13.1 I give any item of clothing, personal effects, or household goods not otherwise specifically bequeathed to [{{gifts.smallGiftsRecipient}}].

14. ADMINISTRATION

14.1 My Executor shall be entitled to receive reasonable remuneration for the administration of my estate, to be assessed in accordance with the relevant provisions of the Administration of Estates Act 1925 and the Inheritance Tax Act 1984.

14.2 My Executor shall not be required to provide any security for the due administration of my estate.

14.3 My Executor shall be indemnified from and reimbursed from my estate for all costs, expenses, and liabilities properly incurred in the administration of my estate.

15. INTERPRETATION

15.1 In this my will, unless the context otherwise requires:

(a) "children" includes adopted children but excludes stepchildren;

(b) references to "children" include children of the beneficiary born after my death;

(c) "spouse" includes a person with whom I was in a civil partnership at the date of my death;

(d) any gift to a class of persons shall be divided equally among surviving members of that class;

(e) the masculine includes the feminine and vice versa.

15.2 If any gift fails or is otherwise undisposed of, such gift shall fall into my residuary estate.

15.3 If any beneficiary and I die in common disaster or in circumstances making it impossible to determine who died first, I shall be deemed to have survived the beneficiary for the purposes of this will.

16. GOVERNING LAW

16.1 This my will and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the law of England and Wales.

IN WITNESS WHEREOF I have set my hand to this my will on the date first written above.

[SIGNATURE OF TESTATOR]

Signed by the Testator [{{party.testator.name}}] as his last will and testament in the presence of:

Signature: _______________________________
Name: [{{witnesses.witness1Name}}]
Address: [{{witnesses.witness1Address}}]
Occupation: [{{witnesses.witness1Occupation}}]

Signature: _______________________________
Name: [{{witnesses.witness2Name}}]
Address: [{{witnesses.witness2Address}}]
Occupation: [{{witnesses.witness2Occupation}}]

Both witnesses present at the same time. Signed in the presence of the Testator and of each other.

---
Template document. Not legal advice. Not suitable if: the Testator is married or in a civil partnership and wants to leave everything to someone other than their spouse/civil partner (spouse/civil partner may have substantial claim under the Inheritance Act 1975); there are minor children or dependants requiring trust arrangements; the estate includes business interests, agricultural property, or foreign assets (additional considerations apply); the Testator lacks testamentary capacity or is subject to undue influence. This template reflects general UK practice and must be reviewed by a qualified solicitor before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_WILL_UK: LegendItem[] = [
  { path: 'party.testator.name', label: "Testator's full legal name", type: 'string', required: true, example: 'Robert James Whitfield' },
  { path: 'party.testator.address', label: "Testator's home address", type: 'text', required: true, example: '14 Oakleigh Way, Sevenoaks, Kent, TN13 9XM' },
  { path: 'dates.willDate', label: 'Date of will', type: 'date', required: true, example: '2025-06-01' },
  { path: 'family.maritalStatus', label: 'Marital status', type: 'enum', required: true, rules: { options: ['married', 'in a civil partnership', 'single', 'widowed', 'divorced'] }, example: 'married' },
  { path: 'family.spouseName', label: "Spouse's full name", type: 'string', required: false, example: 'Margaret Anne Whitfield' },
  { path: 'family.childrenText', label: 'Children names and dates of birth', type: 'text', required: false, example: 'Thomas Robert Whitfield, born 12 March 1998; Emily Jane Whitfield, born 8 July 2001' },
  { path: 'family.otherDependantsText', label: 'Other dependants text', type: 'text', required: false, example: 'None' },
  { path: 'family.spouseWillText', label: "Spouse's will reference", type: 'text', required: false, example: 'My spouse, Margaret Anne Whitfield, has made or will make a separate will.' },
  { path: 'executors.primaryExecutorName', label: 'Primary executor full name', type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'executors.primaryExecutorAddress', label: 'Primary executor address', type: 'text', required: true, example: '25 Queen Street, Birmingham, B2 4AJ' },
  { path: 'executors.alternateExecutorName', label: 'Alternate executor full name', type: 'string', required: false, example: 'Catherine Anne Brooks' },
  { path: 'executors.alternateExecutorAddress', label: 'Alternate executor address', type: 'text', required: false, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'gifts.specificGiftsText', label: 'Specific gifts summary text', type: 'text', required: false, example: 'the beneficiaries named in this clause' },
  { path: 'gifts.gift1Asset', label: 'Gift 1 asset description', type: 'string', required: false, example: 'my gold pocket watch bearing the inscription R.J.W. 1965' },
  { path: 'gifts.gift1Recipient', label: 'Gift 1 recipient', type: 'string', required: false, example: 'my son Thomas Robert Whitfield' },
  { path: 'gifts.gift2Asset', label: 'Gift 2 asset description', type: 'string', required: false, example: 'my diamond engagement ring and associated jewellery' },
  { path: 'gifts.gift2Recipient', label: 'Gift 2 recipient', type: 'string', required: false, example: 'my daughter Emily Jane Whitfield' },
  { path: 'gifts.gift3Asset', label: 'Gift 3 asset description', type: 'string', required: false, example: 'my Honda Civic motor vehicle, registration mark XX11 ABC' },
  { path: 'gifts.gift3Recipient', label: 'Gift 3 recipient', type: 'string', required: false, example: 'my friend Peter James Osborne' },
  { path: 'gifts.smallGiftsRecipient', label: 'Small gifts recipient', type: 'string', required: false, example: 'my spouse, Margaret Anne Whitfield' },
  { path: 'legacies.legacy1Amount', label: 'Legacy 1 amount (GBP)', type: 'number', required: false, example: 10000 },
  { path: 'legacies.legacy1Recipient', label: 'Legacy 1 recipient', type: 'string', required: false, example: 'my godson, Alexander James Harrington' },
  { path: 'legacies.legacy2Amount', label: 'Legacy 2 amount (GBP)', type: 'number', required: false, example: 5000 },
  { path: 'legacies.legacy2Recipient', label: 'Legacy 2 recipient', type: 'string', required: false, example: 'the British Heart Foundation (registered charity number 225971)' },
  { path: 'legacies.legacy3Text', label: 'Legacy 3 description', type: 'text', required: false, example: 'GBP 2,500 to the charity Cats Protection (registered charity number 209639)' },
  { path: 'residuary.primaryBeneficiaryText', label: 'Primary residuary beneficiary text', type: 'text', required: true, example: '75% of my residuary estate to my spouse, Margaret Anne Whitfield, if she survives me; or if she does not survive me, to my children Thomas Robert Whitfield and Emily Jane Whitfield in equal shares, to be held on trust for each of them until they reach the age of 25' },
  { path: 'residuary.alternateBeneficiaryText', label: 'Alternate residuary beneficiary text', type: 'text', required: false, example: '25% of my residuary estate to my friend Peter James Osborne' },
  { path: 'residuary.secondaryBeneficiaryText', label: 'Secondary beneficiary text', type: 'string', required: false, example: 'the survivors of the primary residuary beneficiary class, to be divided equally' },
  { path: 'trust.trustArrangementsText', label: 'Trust arrangements text', type: 'text', required: false, example: 'Where any beneficiary is under the age of 18 at the time of distribution, the share shall be held on trust for that beneficiary until they reach the age of 25, with the income being accumulated and added to capital during the trust period. The trustee shall have the power to apply income or capital for the maintenance, education, or benefit of the beneficiary during the trust period.' },
  { path: 'tax.ihmcdChargeText', label: 'IHT multiple charge text', type: 'text', required: false, example: 'I direct that my Executor may elect to pay any inheritance tax due in instalments over 10 years in accordance with section 227 of the Inheritance Tax Act 1984, with interest, and that any asset subject to a mortgage or charge may be retained by a beneficiary subject to that encumbrance.' },
  { path: 'guardians.primaryGuardianName', label: 'Primary guardian full name', type: 'string', required: false, example: 'Patricia Anne Whitmore' },
  { path: 'guardians.primaryGuardianAddress', label: 'Primary guardian address', type: 'text', required: false, example: '12 Willow Gardens, Birmingham, B15 3QR' },
  { path: 'guardians.alternateGuardianName', label: 'Alternate guardian full name', type: 'string', required: false, example: 'Jonathan Mark Davies' },
  { path: 'guardians.alternateGuardianAddress', label: 'Alternate guardian address', type: 'text', required: false, example: '25 Queen Street, Birmingham, B2 4AJ' },
  { path: 'guardians.guardianshipConditionsText', label: 'Guardianship conditions text', type: 'text', required: false, example: 'I request that my children be permitted to remain in their current home and school until they reach the age of 16, and that the guardian maintain contact with the children\'s maternal grandparents.' },
  { path: 'witnesses.witness1Name', label: 'Witness 1 full name', type: 'string', required: true, example: 'Sarah Elizabeth Mitchell' },
  { path: 'witnesses.witness1Address', label: 'Witness 1 address', type: 'text', required: true, example: '14 Elm Road, Bristol, BS1 5QU' },
  { path: 'witnesses.witness1Occupation', label: 'Witness 1 occupation', type: 'string', required: true, example: 'Solicitor' },
  { path: 'witnesses.witness2Name', label: 'Witness 2 full name', type: 'string', required: true, example: 'Helena Margaret Forsyth' },
  { path: 'witnesses.witness2Address', label: 'Witness 2 address', type: 'text', required: true, example: '50 Queen Street, Birmingham, B2 4AJ' },
  { path: 'witnesses.witness2Occupation', label: 'Witness 2 occupation', type: 'string', required: true, example: 'Legal Executive' },
];

// ─── POWER OF ATTORNEY — UK ──────────────────────────────────────────────────

const POA_UK = `POWER OF ATTORNEY

Title: Lasting Power of Attorney
Version: 1
Jurisdiction: United Kingdom (England & Wales)

DOL lasting power of attorney
Covered by the Mental Capacity Act 2005 (England and Wales)

made by [{{party.donor.name}}] of [{{party.donor.address}}] ("Donor")

PART 1: INTRODUCTORY

1.1 This is a DOL Lasting Power of Attorney made under the Mental Capacity Act 2005 (the "Act"). It replaces any Enduring Power of Attorney previously made by the Donor.

1.2 The purpose of this LPA is to enable the Donor to appoint one or more attorneys to act on the Donor's behalf in the event that the Donor subsequently lacks the capacity to make decisions for himself in relation to the matters covered by this LPA.

1.3 Before executing this LPA, the Donor must have the capacity to do so. The Donor must also notify the persons prescribed in Schedule 1 of the Mental Capacity Act (2005) (the "Prescribed Persons") of the Donor's intention to execute this LPA.

1.4 This LPA shall not come into effect until it has been registered with the Office of the Public Guardian.

PART 2: APPOINTMENT OF ATTORNEYS

2.1 I appoint [{{attorneys.primaryAttorneyName}}] of [{{attorneys.primaryAttorneyAddress}}] to be my attorney (the "Attorney").

2.2 If the primary Attorney is unable or unwilling to act, I appoint [{{attorneys.replacementAttorneyName}}] of [{{attorneys.replacementAttorneyAddress}}] as my replacement attorney.

2.3 [{{attorneys.additionalAttorneyText}}]

2.4 I direct that no security or bond shall be required of my Attorney in connection with the execution of their powers under this LPA.

2.5 I authorise my Attorney to act jointly and severally with any co-attorneys appointed hereunder.

PART 3: DECISIONS COVERED

3.1 This LPA covers decisions relating to:

[{{scope.decisionsCoveredText}}]

3.2 This LPA does NOT cover decisions relating to:

[{{scope.decisionsExcludedText}}]

PART 4: RESTRICTIONS ON ATTORNEY'S POWERS

4.1 My Attorney shall not exercise any power under this LPA in a manner that would be inconsistent with any decision made by me while I had capacity, unless my Attorney reasonably believes that I would have changed my position had I remained capacitated.

4.2 My Attorney shall at all times have regard to the principles set out in section 1 of the Act, namely:

(a) A person must be assumed to have capacity unless it is established that the person lacks capacity;

(b) A person is not to be treated as unable to make a decision unless all practicable steps to enable the person to do so have been taken without success;

(c) A person is not to be treated as lacking capacity merely because the person makes an unwise decision;

(d) An act done or decision made under this LPA for or on behalf of a person who lacks capacity must be done, or made, in the person's best interests.

4.3 My Attorney shall not have the power to:

(a) Act in a manner that is inconsistent with the Donor's wishes as recorded in Schedule 2 (Donor's Personal Welfare Preferences and Values);

(b) Make gifts from the Donor's estate to the Attorney or to any person connected with the Attorney (within the meaning of section 350 of the Act), other than gifts of a modest nature on customary occasions;

(c) Create or execute a will or codicil on behalf of the Donor;

(d) Consent to or refuse life-sustaining treatment on behalf of the Donor, except as specifically authorised in Schedule 3;

(e) Enter into a transaction that would constitute a deprivation of the Donor's liberty within the meaning of the Act.

4.4 [{{restrictions.additionalRestrictionsText}}]

PART 5: ATTORNEY'S OBLIGATIONS

5.1 The Attorney shall:

(a) at all times act in good faith and in the Donor's best interests;

(b) consult with the persons specified in Schedule 4 before making any significant decision on behalf of the Donor, except in cases of emergency;

(c) maintain proper accounts and records of all decisions made and actions taken under this LPA;

(d) not delegate any power to a third party without the Donor's prior written consent;

(e) act only within the scope of this LPA and the authority granted herein;

(f) cease to exercise any power under this LPA if the Attorney becomes aware of any circumstances that would cause a conflict of interest or that would call into question the Attorney's ability to act in the Donor's best interests.

5.2 The Attorney shall provide the Donor (or, if the Donor lacks capacity, the Donor 's litigation friend or relevant independent advocate) with a copy of all accounts and records upon reasonable written request.

5.3 [{{attorney.additionalObligationsText}}]

PART 6: COSTS AND EXPENSES

6.1 The Attorney shall be entitled to be reimbursed from the Donor's estate for all reasonable costs and expenses properly incurred in the execution of this LPA.

6.2 [{{attorney.remunerationText}}]

6.3 The Attorney shall not be entitled to receive any payment or other benefit from the Donor's estate in connection with the execution of this LPA, other than reimbursement of expenses, except with the prior approval of the court.

PART 7: DURATION AND TERMINATION

7.1 This LPA shall come into effect upon registration with the Office of the Public Guardian and shall continue until it is revoked by the Donor or is otherwise terminated in accordance with the Act.

7.2 The Donor may revoke this LPA at any time while the Donor retains capacity, by executing a deed of revocation in the form prescribed by the Office of the Public Guardian and serving notice on the Attorney.

7.3 This LPA shall terminate upon: (a) the death of the Donor; (b) the Donor becoming domiciled in a jurisdiction outside England and Wales; (c) the Attorney becoming a person who lacks capacity within the meaning of the Act; (d) the bankruptcy of the Donor (to the extent that this LPA relates to property and financial affairs); (e) the dissolution of the Attorney, if the Attorney is a corporation.

7.4 On the termination of this LPA, the Attorney shall return all documents, records, and property belonging to the Donor.

PART 8: INTERPRETATION

8.1 In this LPA, unless the context otherwise requires: (a) "attorney" includes any replacement or substitute attorney; (b) references to the Donor's "capacity" are to the Donor's capacity to make a specific decision at the time it falls to be made; (c) headings are for convenience only and do not affect interpretation.

8.2 If any provision of this LPA is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

8.3 This LPA shall be governed by and construed in accordance with the laws of England and Wales.

SCHEDULE 2 — DONOR'S PERSONAL WELFARE PREFERENCES AND VALUES
[{{schedules.personalWelfarePreferences}}]

SCHEDULE 3 — LIFE-SUSTAINING TREATMENT AUTHORISATION
[{{schedules.lifeSustainingTreatment}}]

SCHEDULE 4 — PERSONS TO BE CONSULTED
[{{schedules.personsToConsult}}]

IN WITNESS WHEREOF the Donor has executed this LPA as a deed on the date first written above.

EXECUTED as a DEED by [{{party.donor.name}}]:

Signature: _______________________________
Date: [{{dates.lpaDate}}]

CERTIFICATE OF CERTIFICATE PROVIDER

I, [{{certificate.certificateProviderName}}] of [{{certificate.certificateProviderAddress}}], confirm that:

1. I am a certificate provider within the meaning of section 10 and Schedule 2 of the Mental Capacity Act 2005;

2. I have interviewed the Donor [{{party.donor.name}}] and am satisfied that: (a) the Donor understands the purpose and scope of this LPA; (b) the Donor is acting voluntarily and is not under any undue influence or duress; (c) the Donor has the capacity to execute this LPA.

Signature: _______________________________
Date: [{{dates.lpaDate}}]

---
Template document. Not legal advice. Not suitable if: the Donor lacks capacity to execute a LPA at the time of signing (the LPA will be invalid); the Donor is not domiciled in England and Wales (a different instrument may be required); this is intended to be an Enduring Power of Attorney (EPA) — EPAs made before 1 October 2007 remain valid but new EPAs cannot be created. This template reflects general UK practice and must be reviewed by a qualified solicitor or a certificate provider before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_POA_UK: LegendItem[] = [
  { path: 'party.donor.name', label: "Donor's full legal name", type: 'string', required: true, example: 'Patricia Anne Whitmore' },
  { path: 'party.donor.address', label: "Donor's home address", type: 'text', required: true, example: '12 Willow Gardens, Birmingham, B15 3QR' },
  { path: 'attorneys.primaryAttorneyName', label: 'Primary attorney full name', type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'attorneys.primaryAttorneyAddress', label: 'Primary attorney address', type: 'text', required: true, example: '25 Queen Street, Birmingham, B2 4AJ' },
  { path: 'attorneys.replacementAttorneyName', label: 'Replacement attorney full name', type: 'string', required: false, example: 'Catherine Anne Brooks' },
  { path: 'attorneys.replacementAttorneyAddress', label: 'Replacement attorney address', type: 'text', required: false, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'attorneys.additionalAttorneyText', label: 'Additional attorney text', type: 'text', required: false, example: 'I also appoint my sister, Victoria Rose Ashworth of 14 Oakleigh Way, Sevenoaks, Kent, TN13 9XM, as a co-attorney to act jointly with the primary attorney.' },
  { path: 'attorney.additionalObligationsText', label: 'Additional attorney obligations text', type: 'text', required: false, example: 'The Attorney shall notify the Donor\'s family doctor and the persons listed in Schedule 4 immediately upon the Attorney forming the view that the Donor has lost or is losing capacity to make decisions for himself.' },
  { path: 'attorney.remunerationText', label: 'Attorney remuneration text', type: 'text', required: false, example: 'The Attorney may claim reasonable remuneration for time spent acting as attorney, subject to the approval of the Donor\'s affairs manager or, if appointed, the court.' },
  { path: 'scope.decisionsCoveredText', label: 'Decisions covered text', type: 'text', required: true, example: 'all decisions relating to the Donor\'s personal welfare, including but not limited to: healthcare and medical treatment decisions; daily care and residence decisions; social activities and contact with family and friends; diet and nutrition; dress and personal appearance; the Donor\'s participation in activities and services.' },
  { path: 'scope.decisionsExcludedText', label: 'Decisions excluded text', type: 'text', required: false, example: 'decisions relating to the Donor\'s property and financial affairs; decisions relating to the Donor\'s statutory benefits or allowances; decisions to consent to or refuse life-sustaining treatment (except as specified in Schedule 3).' },
  { path: 'restrictions.additionalRestrictionsText', label: 'Additional restrictions text', type: 'text', required: false, example: 'The Attorney shall not take any decision in relation to the Donor\'s place of residence without first consulting the persons listed in Schedule 4.' },
  { path: 'schedules.personalWelfarePreferences', label: 'Personal welfare preferences text', type: 'text', required: false, example: 'The Donor s preference, if able to express one, is to remain in her own home for as long as possible. The Donor values her independence and the maintenance of her social connections. The Donor would wish any care package to include regular contact with her friends and community.' },
  { path: 'schedules.lifeSustainingTreatment', label: 'Life sustaining treatment authorisation', type: 'text', required: false, example: 'I authorise my Attorney to consent to or refuse life-sustaining treatment on my behalf only in circumstances where the Attorney reasonably believes that such decision would be in my best interests, having regard to any views I have previously expressed and the guidance in the Mental Capacity Act 2005 Code of Practice.' },
  { path: 'schedules.personsToConsult', label: 'Persons to consult text', type: 'text', required: false, example: 'The Attorney shall consult the following persons before making any significant decision: Margaret Anne Whitfield (spouse), Thomas Robert Whitfield (son), Emily Jane Whitfield (daughter).' },
  { path: 'certificate.certificateProviderName', label: 'Certificate provider name', type: 'string', required: true, example: 'Dr. Simon Charles Edwards' },
  { path: 'certificate.certificateProviderAddress', label: 'Certificate provider address', type: 'text', required: true, example: '1 Queen Street, Birmingham, B1 1AA' },
  { path: 'dates.lpaDate', label: 'LPA execution date', type: 'date', required: true, example: '2025-06-01' },
];

// ─── MASTER SERVICES AGREEMENT — UK ─────────────────────────────────────────

const MSA_UK = `MASTER SERVICES AGREEMENT

Title: Master Services Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.agreementDate}}]

THIS AGREEMENT is made between:

(1) [{{party.client.name}}], a company incorporated in England and Wales with company number [{{party.client.companyNumber}}] and having its registered office at [{{party.client.registeredAddress}}] ("Client"); and

(2) [{{party.supplier.name}}], a company incorporated in England and Wales with company number [{{party.supplier.companyNumber}}] and having its registered office at [{{party.supplier.registeredAddress}}] ("Supplier").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Client wishes to engage the Supplier to provide the Services described herein and in any Statement of Work entered into pursuant to this Agreement;

WHEREAS the Supplier has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliate" means, in relation to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Business Day" means a day other than a Saturday, Sunday, or public holiday in England and Wales;

(c) "Change Control Procedure" means the procedure for requesting and agreeing changes to a Statement of Work or the Services, as set out in Schedule [{{definitions.changeControlSchedule}}];

(d) "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, in any form, that is designated as confidential or would reasonably be understood to be confidential;

(e) "Documentation" means all manuals, specifications, guides, and other documents supplied by the Supplier in connection with the Services;

(f) "Effective Date" means [{{terms.effectiveDate}}];

(g) "Fees" means the fees payable by the Client to the Supplier for the Services as specified in the applicable Statement of Work;

(h) "Intellectual Property Rights" means all patents, copyright, rights in designs, trade marks, trade names, business names, domain names, rights in get-up, database rights, rights in Confidential Information, and all other intellectual property rights throughout the world;

(i) "Services" means the services to be provided by the Supplier under this Agreement, as described in any Statement of Work;

(j) "Service Credits" means the service credits to be applied against Fees in accordance with Schedule [{{terms.serviceCreditsSchedule}}] in the event of failure to meet Service Levels;

(k) "Service Levels" means the service levels to be achieved by the Supplier in the performance of the Services, as specified in Schedule [{{terms.serviceLevelsSchedule}}];

(l) "Statement of Work" means each statement of work entered into by the Parties pursuant to this Agreement in the form set out in Schedule [{{terms.statementOfWorkSchedule}}];

(m) "Term" means the period specified in Clause 2;

(n) "Virus" means any virus, worm, trojan horse, logic bomb, or other code designed to corrupt, disrupt, or harm any computer system or data;

(o) "including" means "including without limitation".

1.2 References to Clauses and Schedules are to clauses of and schedules to this Agreement. Headings are for convenience only.

2. TERM

2.1 This Agreement shall commence on the Effective Date and shall continue for an initial term of [{{terms.initialTermMonths}}] months, unless earlier terminated in accordance with Clause 19.

2.2 This Agreement shall automatically renew for successive periods of [{{terms.renewalPeriodMonths}}] months unless either Party gives not less than [{{terms.renewalNoticeDays}}] days' written notice to the other Party prior to the end of the then-current term.

3. SERVICES

3.1 The Supplier shall provide the Services in accordance with: (a) this Agreement; (b) the applicable Statement of Work; (c) any applicable Service Levels; (d) all applicable laws and regulations.

3.2 Each Statement of Work shall be substantially in the form set out in the Statement of Work Schedule and shall be deemed incorporated into and governed by this Agreement.

3.3 The Supplier shall: (a) perform the Services with reasonable care and skill; (b) allocate sufficient resources to perform the Services; (c) comply with all reasonable directions of the Client; (d) promptly notify the Client of any circumstances that may affect the timely or proper performance of the Services; (e) maintain appropriate quality management systems.

3.4 The Client shall: (a) provide the Supplier with access to such information, premises, and systems as are reasonably necessary for the performance of the Services; (b) provide timely decisions and approvals; (c) comply with its obligations under this Agreement and any Statement of Work.

4. SERVICE LEVELS AND SERVICE CREDITS

4.1 The Supplier shall perform the Services to the Service Levels specified in the applicable Schedule.

4.2 In the event of failure to meet the Service Levels, the Client shall be entitled to receive Service Credits in accordance with Schedule [{{terms.serviceCreditsSchedule}}].

4.3 Service Credits shall be the sole and exclusive remedy for failure to meet Service Levels and shall be in full and final settlement of any claim the Client may have against the Supplier in connection with such failure.

4.4 [{{terms.serviceLevelReviewText}}]

5. FEES AND PAYMENT

5.1 The Client shall pay the Fees to the Supplier as specified in the applicable Statement of Work.

5.2 Unless otherwise specified: (a) fees are stated exclusive of Value Added Tax, which shall be charged at the prevailing rate; (b) the Supplier shall invoice the Client monthly in arrears; (c) each invoice shall be payable within [{{payment.paymentDays}}] days of receipt; (d) late payments shall bear interest at the rate of [{{payment.interestRate}}]% per annum above the Bank of England base rate.

5.3 All Fees and other sums due under this Agreement are non-cancellable and non-refundable, except as expressly stated herein.

5.4 The Client may dispute any invoice in good faith by written notice within [{{payment.disputeDays}}] days of receipt, specifying the reasons. The Parties shall resolve any undisputed amount in accordance with Clause 5.2.

5.5 The Supplier shall maintain complete and accurate records of the Services and Fees and shall make such records available to the Client upon reasonable written request.

6. INTELLECTUAL PROPERTY

6.1 Client Intellectual Property. Each Party retains all rights in its own pre-existing Intellectual Property ("Background IP"). Nothing in this Agreement transfers or assigns any Background IP from one Party to the other.

6.2 New Materials. All materials, deliverables, and work product created by the Supplier in the performance of the Services that incorporate or are derived from Client Background IP ("New Materials") shall be owned by the Client. The Supplier hereby assigns to the Client all right, title, and interest in and to the New Materials, with full title guarantee.

6.3 Supplier Tools. The Supplier's pre-existing tools, methodologies, frameworks, and know-how ("Supplier Tools") shall remain the exclusive property of the Supplier. To the extent any Supplier Tools are incorporated in the New Materials, the Supplier hereby grants to the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Supplier Tools solely to the extent necessary to use the New Materials.

6.4 Feedback. The Client grants to the Supplier a royalty-free, non-exclusive licence to use any feedback, suggestions, or ideas provided by the Client in connection with the Services for the purpose of improving the Supplier's services.

7. CONFIDENTIALITY

7.1 Each Party shall: (a) keep the other Party's Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the purposes of this Agreement; (d) protect it with at least the same degree of care as it applies to its own confidential information, and in any event no less than reasonable care; (e) on termination of this Agreement, return or destroy (at the other Party's election) all Confidential Information and certify such return or destruction in writing.

7.2 The obligations of confidentiality shall not apply to information that: (a) is or becomes generally available to the public through no act of the Receiving Party; (b) was known to the Receiving Party prior to disclosure; (c) is received from a third party without breach of confidentiality; (d) is required to be disclosed by law (provided notice is given where permitted).

7.3 Each Party shall ensure that its employees, agents, and subcontractors are bound by equivalent confidentiality obligations.

8. DATA PROTECTION

8.1 The Parties acknowledge that, in connection with the Services, personal data (as defined in the UK GDPR) may be processed. The Parties' respective obligations in respect of such personal data shall be as set out in Schedule [{{data.dpSchedule}}] (Data Processing Addendum).

8.2 The Supplier shall implement and maintain appropriate technical and organisational security measures appropriate to the risk presented by the processing of personal data.

8.3 The Supplier shall notify the Client without undue delay upon becoming aware of a personal data breach affecting the Client's data.

9. WARRANTIES

9.1 Mutual Warranties. Each Party warrants that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes valid and binding obligations; (c) the execution of this Agreement will not breach any other agreement to which it is a party.

9.2 Supplier Warranties. The Supplier warrants that: (a) the Services will be performed with reasonable care and skill; (b) the Services and deliverables will not infringe the Intellectual Property Rights of any third party; (c) the Supplier has and will maintain all necessary resources, licences, and permissions to perform the Services; (d) the Supplier's personnel are appropriately skilled and experienced.

9.3 EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, ALL WARRANTIES, CONDITIONS, AND REPRESENTATIONS, WHETHER EXPRESS OR IMPLIED BY STATUTE, COMMON LAW, OR OTHERWISE, ARE EXCLUDED TO THE FULLEST EXTENT PERMITTED BY LAW.

10. LIABILITY

10.1 Neither Party shall be liable to the other for indirect, consequential, incidental, special, or exemplary damages, including loss of profits, loss of revenue, loss of savings, or loss of data, even if advised of the possibility of such damages.

10.2 Each Party's total aggregate liability under or in connection with this Agreement shall not exceed the greater of: (a) [{{liability.capGBP}}] GBP; or (b) the total Fees paid or payable under the applicable Statement of Work in the 12 months preceding the event giving rise to the liability.

10.3 The limitations in this Clause 10 shall not apply to: (a) death or personal injury caused by negligence; (b) fraud; (c) breach of the obligations implied by sections 12 and 13 of the Sale of Goods Act 1979; (d) any other liability that cannot be limited or excluded by applicable law.

11. INDEMNITIES

11.1 Supplier Indemnity. The Supplier shall indemnify and hold harmless the Client from and against any and all claims, damages, losses, costs, and expenses (including reasonable legal costs) arising out of or relating to: (a) the Supplier's breach of any warranty, obligation, or representation under this Agreement; (b) any claim that the Services or deliverables infringe the Intellectual Property Rights of a third party; (c) any negligent or wrongful act or omission of the Supplier or its personnel.

11.2 Client Indemnity. The Client shall indemnify and hold harmless the Supplier from and against any and all claims, damages, losses, costs, and expenses arising out of or relating to: (a) the Client's breach of this Agreement; (b) any negligent or wrongful act or omission of the Client or its personnel.

12. INSURANCE

12.1 The Supplier shall maintain at its own cost throughout the Term: (a) professional indemnity insurance with a limit of not less than [{{insurance.professionalIndemnityLimit}}] GBP per claim; (b) public liability insurance with a limit of not less than [{{insurance.publicLiabilityLimit}}] GBP per claim; (c) [{{insurance.additionalInsurances}}].

12.2 The Supplier shall provide evidence of current insurance coverage upon the Client's written request.

13. PERSONNEL

13.1 The Supplier shall assign personnel with appropriate skills and experience to perform the Services. The Supplier shall notify the Client of any change in the key personnel assigned to the Services.

13.2 The Client may, for good cause, request the removal of any Supplier personnel. The Supplier shall promptly arrange a suitable replacement.

13.3 The Supplier acknowledges that the Supplier's personnel are not employees of the Client and the Client shall have no obligation to provide any benefits to such personnel.

14. CHANGE CONTROL

14.1 Any change to the Services, any Statement of Work, or this Agreement shall be implemented only in accordance with the Change Control Procedure set out in Schedule [{{definitions.changeControlSchedule}}].

14.2 No change shall be effective unless agreed in writing signed by authorised representatives of both Parties.

15. SUSPENSION

15.1 The Supplier may suspend the Services: (a) in whole or in part, if the Client fails to pay any sum due and payable under this Agreement; (b) in whole or in part, if the Client fails to provide necessary cooperation or information required for the performance of the Services, where such failure continues for more than [{{suspension.clientFailureDays}}] days after written notice; (c) in whole, if the Supplier reasonably believes that the continuation of the Services would result in a breach of applicable law.

15.2 Suspension under Clause 15.1(a) shall not relieve the Client of its obligation to pay the Fees during the period of suspension. The Term shall be extended by the period of any suspension caused by the Client's failure.

16. CONSEQUENCES OF TERMINATION

16.1 On termination of this Agreement for any reason:

(a) the Client shall pay the Supplier all Fees properly due for Services performed up to the date of termination;

(b) each Party shall return to the other all Confidential Information and other materials belonging to the other Party;

(c) the Supplier shall deliver to the Client all completed and in-progress deliverables;

(d) each Party shall cease all use of the other Party's Background IP and trade marks;

(e) any moneys held by one Party for the other shall be settled.

16.2 Clauses 6 (IP), 7 (Confidentiality), 10 (Liability), 11 (Indemnities), 17 (General), and this Clause 16 shall survive termination.

16.3 Expiry or termination of this Agreement shall not affect any Statement of Work that is not itself terminated. Any Statement of Work in progress at termination of this Agreement shall itself terminate on the same date unless the Parties agree in writing to transfer it to a replacement agreement.

17. GENERAL

17.1 Entire Agreement. This Agreement, together with the Schedules, constitutes the entire agreement between the Parties.

17.2 Amendment. No amendment unless agreed in writing signed by authorised representatives of both Parties.

17.3 Waiver and Severability as standard.

17.4 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party, such consent not to be unreasonably withheld. Either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets.

17.5 Notices. All notices shall be in writing and delivered by personal delivery, pre-paid post, or email to the addresses set out above (or as updated in writing).

17.6 Force Majeure. Neither Party shall be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay results from circumstances beyond the reasonable control of that Party, including without limitation acts of God, fire, flood, earthquake, pandemic, war, terrorism, government action, or failure of third-party telecommunications. The affected Party shall give prompt written notice and shall use reasonable endeavours to mitigate the effects of the force majeure event.

17.7 Relationship. Nothing in this Agreement shall be construed as creating a partnership, joint venture, agency, or employment relationship between the Parties.

17.8 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.

17.9 Dispute Resolution. Any dispute arising out of or relating to this Agreement shall first be referred to the authorised senior representatives of both Parties for resolution within [{{dispute.escalationDays}}] days. If not resolved, either Party may refer the dispute to the courts or to arbitration as provided herein.

17.10 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

IN WITNESS WHEREOF the Parties have executed this Agreement as a deed on the date first above written.

EXECUTED as a DEED by [{{party.client.name}}]
by [{{signatures.clientSignatoryName}}], [{{signatures.clientSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED as a DEED by [{{party.supplier.name}}]
by [{{signatures.supplierSignatoryName}}], [{{signatures.supplierSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Services include the provision of legal, financial, medical, or other regulated professional advice (additional licensing or registration requirements may apply); the Supplier is a personal service company or the arrangement triggers IR35 (off-payroll working rules); the arrangement involves the processing of special category data under UK GDPR (Article 9 considerations). This template reflects general UK commercial practice and must be reviewed by a qualified lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_MSA_UK: LegendItem[] = [
  { path: 'party.client.name', label: "Client's legal name", type: 'string', required: true, example: 'Meridian Capital Ltd' },
  { path: 'party.client.companyNumber', label: "Client's company number", type: 'string', required: false, example: '11234567' },
  { path: 'party.client.registeredAddress', label: "Client's registered address", type: 'text', required: true, example: '1 London Wall, London, EC2Y 5AA' },
  { path: 'party.supplier.name', label: "Supplier's legal name", type: 'string', required: true, example: 'Harbour Digital Ltd' },
  { path: 'party.supplier.companyNumber', label: "Supplier's company number", type: 'string', required: false, example: '09876543' },
  { path: 'party.supplier.registeredAddress', label: "Supplier's registered address", type: 'text', required: true, example: 'Unit 4, 12 Sovereign Park, Manchester, M14 6TD' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.initialTermMonths', label: 'Initial term (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.renewalPeriodMonths', label: 'Auto-renewal period (months)', type: 'number', required: false, example: 12 },
  { path: 'terms.renewalNoticeDays', label: 'Renewal notice period (days)', type: 'number', required: false, example: 60 },
  { path: 'terms.serviceCreditsSchedule', label: 'Service credits schedule reference', type: 'string', required: false, example: '2' },
  { path: 'terms.serviceLevelsSchedule', label: 'Service levels schedule reference', type: 'string', required: false, example: '1' },
  { path: 'terms.statementOfWorkSchedule', label: 'Statement of work schedule reference', type: 'string', required: false, example: '3' },
  { path: 'terms.serviceLevelReviewText', label: 'Service level review text', type: 'text', required: false, example: 'The Service Levels shall be reviewed by the Parties every 6 months. Either Party may propose amendments to the Service Levels by serving written notice on the other Party, and any amendments shall be agreed in writing.' },
  { path: 'definitions.changeControlSchedule', label: 'Change control schedule reference', type: 'string', required: false, example: '5' },
  { path: 'data.dpSchedule', label: 'Data processing schedule reference', type: 'string', required: false, example: '6' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.interestRate', label: 'Late payment interest rate (%)', type: 'number', required: false, example: 3 },
  { path: 'payment.disputeDays', label: 'Invoice dispute period (days)', type: 'number', required: false, example: 10 },
  { path: 'liability.capGBP', label: 'Liability cap (GBP)', type: 'number', required: true, example: 500000 },
  { path: 'insurance.professionalIndemnityLimit', label: 'PI insurance limit (GBP)', type: 'number', required: true, example: 2000000 },
  { path: 'insurance.publicLiabilityLimit', label: 'Public liability limit (GBP)', type: 'number', required: true, example: 1000000 },
  { path: 'insurance.additionalInsurances', label: 'Additional insurance requirements', type: 'text', required: false, example: 'employers\' liability insurance (as required by law); cyber liability insurance with a limit of GBP 1,000,000 per claim' },
  { path: 'suspension.clientFailureDays', label: 'Client failure grace period (days)', type: 'number', required: false, example: 14 },
  { path: 'dispute.escalationDays', label: 'Dispute escalation period (days)', type: 'number', required: false, example: 14 },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Charles Edward Harrington' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.supplierSignatoryName', label: "Supplier signatory name", type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.supplierSignatoryTitle', label: "Supplier signatory title", type: 'string', required: true, example: 'Managing Director' },
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
  await seedProduct('last-will-testament', 'Last Will & Testament', 'Wills, Trusts & Estate', 'UK', 'United Kingdom (England & Wales)', WILL_UK, LEGEND_WILL_UK);
  await seedProduct('power-of-attorney', 'Power of Attorney', 'Wills, Trusts & Estate', 'UK', 'United Kingdom (England & Wales)', POA_UK, LEGEND_POA_UK);
  await seedProduct('master-services-agreement', 'Master Services Agreement', 'Corporate & Commercial', 'UK', 'United Kingdom (England & Wales)', MSA_UK, LEGEND_MSA_UK);
}

main().catch(console.error).finally(() => prisma.$disconnect());