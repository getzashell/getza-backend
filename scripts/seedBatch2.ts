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

// ─── SETTLEMENT AGREEMENT — UK ───────────────────────────────────────────────

const SETTLEMENT_UK = `SETTLEMENT AGREEMENT

Title: Settlement Agreement (UK)
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.agreementDate}}]

THIS SETTLEMENT AGREEMENT (the "Agreement") is made between:

(1) [{{party.employer.name}}], a company incorporated in England and Wales with company number [{{party.employer.companyNumber}}] and having its registered office at [{{party.employer.registeredAddress}}] ("Employer"); and

(2) [{{party.employee.name}}], an individual residing at [{{party.employee.homeAddress}}] ("Employee").

(collectively referred to as "the Parties")

RECITALS

WHEREAS:

(a) The Employee has been employed by the Employer pursuant to a contract of employment dated [{{terms.originalContractDate}}] (the "Original Employment Contract"), most recently as [{{terms.jobTitle}}] (the "Role");

(b) The Employee's employment with the Employer terminated (or will terminate) on [{{terms.terminationDate}}] (the "Termination Date");

(c) The Employee has claimed, orThreat of claim, or is considering claiming, or potential claim against the Employer in respect of: [{{claims.coveredClaims}}] (the "Disputed Claims");

(d) The Employer denies all liability in respect of the Disputed Claims but has agreed to settle and compromise the Disputed Claims on the terms set out in this Agreement;

(e) The Employee has received independent legal advice from [{{terms.solicitorName}}], a qualified solicitor employed by or partner in [{{terms.solicitorFirm}}], as to the terms and effect of this Agreement, in particular as to whether the Employee is aware of and understands the waivable rights that the Employee is agreeing to release and waive;

NOW IT IS AGREED as follows:

1. TERMINATION OF EMPLOYMENT

1.1 The Employee's employment with the Employer terminated on the Termination Date. The Employee's final day of active service was [{{terms.finalDayOfService}}].

1.2 The Employee confirms receipt of all wages, fees, holiday pay, and other emoluments due from the Employer in respect of the Employee's employment up to and including the Termination Date.

1.3 The Employer shall provide the Employee with a reference in the terms set out in Schedule 1, subject to the Employee's obligations under this Agreement.

2. TERMINATION PAYMENTS

2.1 In consideration of the Employee's agreement to the terms of this Agreement and subject to the Employee's compliance with the Employee's obligations hereunder, the Employer shall pay to the Employee:

(a) a redundancy payment (if applicable): GBP [{{payment.redundancyPayment}}];

(b) compensation for the termination of employment: GBP [{{payment.compensationAmount}}];

(c) payment in lieu of notice (if applicable): GBP [{{payment.PILON}}];

(d) accrued and unpaid holiday pay: GBP [{{payment.accruedHoliday}}];

(e) [{{payment.otherPayment}}];

(collectively the "Settlement Sum").

2.2 The Settlement Sum shall be paid to the Employee on or before [{{payment.settlementPaymentDate}}], less all applicable deductions for income tax and national insurance contributions.

2.3 For the avoidance of doubt, the Employer shall not make any further payments to the Employee in connection with the Employee's employment or its termination beyond the Settlement Sum.

3. TAX INDEMNITY

3.1 The Employee acknowledges that the Employer has not made any representation or given any assurance in relation to the tax treatment of the Settlement Sum.

3.2 The Employee shall be solely responsible for all and any income tax, national insurance contributions, and other taxes and levies payable in respect of the Settlement Sum.

3.3 The Employee shall indemnify and keep indemnified the Employer from and against any and all claims, demands, costs, expenses, and liabilities arising from any failure by the Employee to account for any tax due in respect of the Settlement Sum, including any interest, penalties, or surcharges.

3.4 [{{terms.taxAdviceNote}}]

4. RELEASED CLAIMS AND WAIVER

4.1 In consideration of the Settlement Sum, the Employee hereby:

(a) irrevocably and unconditionally releases and waives all and any claims, actions, proceedings, and rights of action that the Employee has or may have against the Employer (and any Group Company) arising out of or in connection with the Employee's employment with the Employer or its termination, whether at common law, in equity, or under any statute, regulation, or EU law, including without limitation claims arising from:

(i) the Employment Rights Act 1996 (including claims for unfair dismissal, wrongful dismissal, redundancy, breach of contract, notice, and any other statutory claim);

(ii) the Working Time Regulations 1998 (including claims for unpaid holiday);

(iii) the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000;

(iv) the Fixed-Term Employees (Prevention of Less Favourable Treatment) Regulations 2002;

(v) the Equality Act 2010 (including claims for direct and indirect discrimination, harassment, victimisation, equal pay, and any other Equality Act claim);

(vi) the Protection from Harassment Act 1997;

(vii) the Data Protection Act 2018 and the UK GDPR;

(viii) the Human Rights Act 1998;

(ix) any other applicable law, regulation, or code of practice;

(b) acknowledges that the Employee has been informed of and understands the rights the Employee is waiving under this Clause 4, having received independent legal advice;

(c) warrants that the Employee is not aware of any other claim or potential claim against the Employer that is not covered by this release.

4.2 This Agreement is a qualifying settlement agreement within the meaning of section 203A of the Employment Rights Act 1996 and satisfies the conditions specified in Regulation 10 of the Working Time Regulations 1998, Regulation 9 of the Part-Time Workers Regulations, Regulation 10 of the Fixed-Term Employees Regulations, and section 147 of the Equality Act 2010.

4.3 The Parties confirm that this Agreement does not constitute an admission of any wrongdoing or liability by the Employer.

5. CONFIDENTIALITY

5.1 The Employee shall keep the existence and terms of this Agreement, and all negotiations leading up to it, strictly confidential and shall not disclose them to any third party, other than:

(a) the Employee's legal and financial advisers who have a need to know in connection with this Agreement;

(b) HM Revenue & Customs, to the extent required by law;

(c) a prospective new employer, solely to the extent necessary to obtain a reference, provided the Employee gives [{{confidentiality.employerAdvanceNotice}}] days' written notice to the Employer and the prospective employer is bound by equivalent confidentiality obligations.

5.2 The Employer shall keep the existence and terms of this Agreement confidential, other than: (a) to those of its directors, officers, and advisers who have a need to know; (b) as required by applicable law or regulation; (c) in connection with the Employer's reporting obligations to Companies House or other regulatory bodies.

5.3 The Employee shall not make, and shall not authorise or encourage any other person to make, any statement or disclosure to any third party (including social media, broadcast, or print media) concerning the Employer, this Agreement, or the circumstances of the termination of the Employee's employment, other than as expressly permitted by this Clause 5.

6. NON-DISPARAGEMENT

6.1 Each Party agrees not to make, publish, or circulate to any third party any disparaging, defamatory, or derogatory statement concerning the other Party or, in the case of the Employer, any of its officers, directors, or employees.

6.2 This Clause 6 shall not restrict either Party from giving truthful evidence or testimony in any legal proceedings, regulatory inquiry, or official investigation.

7. RETURN OF PROPERTY

7.1 The Employee shall, no later than [{{terms.propertyReturnDate}}]: (a) return to the Employer all documents, files, devices, access cards, keys, and other property belonging to the Employer or relating to its business; (b) delete and destroy all copies of Employer information held on any personal device, cloud storage account, or other medium; (c) provide to the Employer the passwords and access credentials for any Employer system or account still held by the Employee.

7.2 The Employer shall, at the Employee's request, make available for collection any personal property of the Employee held at the Employer's premises.

8. POST-TERMINATION RESTRICTIONS

[{{restrictions.postTerminationRestrictionsText}}]

9. APPROVAL OF AGREEMENT

9.1 The Employee confirms that: (a) the Employee has received independent legal advice from a relevant adviser as required by section 203(3) of the Employment Rights Act 1996; (b) the relevant adviser has confirmed in writing to the Employee and to the Employer that the adviser is a relevant independent adviser within the meaning of that section and that the Employee has been advised of the significance and effect of this Agreement; (c) the Employee has had a reasonable period to consider the terms of this Agreement.

9.2 A copy of the adviser's certificate of independent advice is attached at Schedule 2.

10. GENERAL

10.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties in relation to the termination of the Employee's employment and supersedes all prior agreements, negotiations, and representations.

10.2 Variation. No amendment to this Agreement shall be effective unless agreed in writing signed by both Parties.

10.3 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.

10.4 Third Party Rights. No third party shall have rights to enforce any term of this Agreement pursuant to the Contracts (Rights of Third Parties) Act 1999.

10.5 Counterparts. This Agreement may be executed in counterparts, each of which shall constitute an original.

IN WITNESS WHEREOF the Parties have executed this Agreement on the date first above written.

SIGNED by [{{party.employer.name}}]
by [{{signatures.employerSignatoryName}}], [{{signatures.employerSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SIGNED by the Employee [{{party.employee.name}}]
in the presence of:

Signature: _______________________________
Witness Name: [{{signatures.witnessName}}]
Witness Address: [{{signatures.witnessAddress}}]
Date: [{{dates.agreementDate}}]

SCHEDULE 1 — REFERENCE TEXT
[{{schedules.referenceText}}]

SCHEDULE 2 — CERTIFICATE OF INDEPENDENT ADVISER
[{{schedules.adviserCertificate}}]

---
Template document. Not legal advice. Not suitable if: the Employee has not received independent legal advice from a relevant adviser (the settlement is void under section 203A Employment Rights Act 1996); the claims being settled include personal injury claims (specific requirements apply); the Employee is insolvent or lacks capacity. This template reflects general UK practice and must be reviewed by a qualified employment lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_SETTLEMENT_UK: LegendItem[] = [
  { path: 'party.employer.name', label: "Employer's legal name", type: 'string', required: true, example: 'Thornfield Financial Services Ltd' },
  { path: 'party.employer.companyNumber', label: "Employer's company number", type: 'string', required: false, example: '07654321' },
  { path: 'party.employer.registeredAddress', label: "Employer's registered address", type: 'text', required: true, example: '50 Queen Street, Birmingham, B2 4AJ' },
  { path: 'party.employee.name', label: "Employee's full legal name", type: 'string', required: true, example: 'Patricia Anne Whitmore' },
  { path: 'party.employee.homeAddress', label: "Employee's home address", type: 'text', required: true, example: '12 Willow Gardens, Birmingham, B15 3QR' },
  { path: 'terms.originalContractDate', label: 'Original employment contract date', type: 'date', required: true, example: '2019-03-15' },
  { path: 'terms.jobTitle', label: 'Job title at termination', type: 'string', required: true, example: 'Head of Compliance' },
  { path: 'terms.terminationDate', label: 'Employment termination date', type: 'date', required: true, example: '2025-04-30' },
  { path: 'terms.finalDayOfService', label: 'Final day of active service', type: 'date', required: true, example: '2025-04-30' },
  { path: 'terms.solicitorName', label: 'Employee\'s solicitor name', type: 'string', required: true, example: 'Helena Margaret Forsyth' },
  { path: 'terms.solicitorFirm', label: 'Employee\'s solicitor firm', type: 'string', required: true, example: 'Redwood Employment Solicitors LLP' },
  { path: 'terms.propertyReturnDate', label: 'Property return deadline', type: 'date', required: false, example: '2025-05-07' },
  { path: 'terms.taxAdviceNote', label: 'Tax advice note', type: 'text', required: false, example: 'The Parties acknowledge that the Employer has advised the Employee to seek independent tax advice in respect of the Settlement Sum and that no representations have been made by the Employer as to the tax treatment thereof.' },
  { path: 'claims.coveredClaims', label: 'Description of claims covered', type: 'text', required: true, example: 'potential claims of age discrimination, wrongful dismissal, and breach of the implied duty of mutual trust and confidence arising from the circumstances of the Employee\'s dismissal and the process followed by the Employer' },
  { path: 'payment.redundancyPayment', label: 'Redundancy payment (GBP)', type: 'number', required: false, example: 8500 },
  { path: 'payment.compensationAmount', label: 'Compensation amount (GBP)', type: 'number', required: true, example: 45000 },
  { path: 'payment.PILON', label: 'Payment in lieu of notice (GBP)', type: 'number', required: false, example: 18000 },
  { path: 'payment.accruedHoliday', label: 'Accrued holiday pay (GBP)', type: 'number', required: false, example: 3200 },
  { path: 'payment.otherPayment', label: 'Other payment description', type: 'text', required: false, example: 'contribution towards the Employee\'s legal fees in connection with this Agreement: GBP 2,500 + VAT' },
  { path: 'payment.settlementPaymentDate', label: 'Settlement payment date', type: 'date', required: true, example: '2025-05-15' },
  { path: 'confidentiality.employerAdvanceNotice', label: 'Notice period before sharing with new employer (days)', type: 'number', required: false, example: 5 },
  { path: 'restrictions.postTerminationRestrictionsText', label: 'Post-termination restrictions', type: 'text', required: false, example: 'The Parties agree that no post-termination restrictions shall apply to the Employee, having regard to the nature of the Role and the circumstances of termination.' },
  { path: 'signatures.employerSignatoryName', label: "Employer's signatory name", type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'signatures.employerSignatoryTitle', label: "Employer's signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.witnessName', label: 'Witness full name', type: 'string', required: true, example: 'Sarah Elizabeth Mitchell' },
  { path: 'signatures.witnessAddress', label: 'Witness full address', type: 'text', required: true, example: '14 Elm Road, Bristol, BS1 5QU' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-04-30' },
  { path: 'schedules.referenceText', label: 'Reference text', type: 'text', required: false, example: '[Employee name] was employed by [Employer name] as [job title] from [start date] to [termination date]. [Employee name] left by mutual agreement. [Employer name] wishes [Employee name] every success in [Employee\'s/her] future career. This reference is given in good faith and without liability.' },
  { path: 'schedules.adviserCertificate', label: 'Certificate of independent advice text', type: 'text', required: false, example: 'I, [Helena Margaret Forsyth], a solicitor of the Senior Courts of England and Wales, confirm that I have advised [Patricia Anne Whitmore] in relation to the terms and effect of this Settlement Agreement. I confirm that I am a relevant independent adviser for the purposes of section 203A of the Employment Rights Act 1996 and that theEmployee has had a reasonable period to consider the terms of this Agreement before signing.' },
];

// ─── JOB OFFER LETTER — UK ────────────────────────────────────────────────────

const JOB_OFFER_UK = `OFFER OF EMPLOYMENT

Title: Job Offer Letter
Version: 1
Jurisdiction: United Kingdom (England & Wales)

[{{party.employer.name}}]
[{{party.employer.registeredAddress}}]

[{{dates.letterDate}}]

Dear [{{party.candidate.name}}],

JOB OFFER

We are delighted to offer you the position of [{{role.jobTitle}}] within [{{party.employer.name}}] ("Employer"), subject to the terms and conditions set out below and the conditions in Clause 3.

1. ROLE AND RESPONSIBILITIES

1.1 You will report to [{{role.reportsTo}}] and your principal place of work will be [{{role.workLocation}}].

1.2 Your duties will include, but not be limited to: [{{role.dutiesDescription}}].

1.3 You will be required to travel to such places as the Employer may reasonably direct from time to time in connection with the performance of your duties.

2. COMMENCEMENT AND TERM

2.1 Your employment with the Employer shall commence on [{{terms.commencementDate}}] (the "Start Date").

2.2 Your employment is for an indefinite term and shall continue until terminated in accordance with this Letter and your contract of employment.

2.3 [{{terms.probationaryPeriodText}}]

3. CONDITIONS

3.1 This offer is conditional upon:

(a) the Employer being satisfied with the results of [{{conditions.backgroundCheckType}}] in relation to you;

(b) you providing, prior to the Start Date, evidence of your right to work in the United Kingdom in accordance with the Immigration, Asylum and Nationality Act 2006;

(c) you providing, prior to the Start Date, completed and signed forms for: (i) HMRC starter checklist; (ii) enrollement in the Employer's pension scheme;

(d) [{{conditions.additionalConditionText}}].

3.2 If you are unable to satisfy the conditions in Clause 3.1 by [{{conditions.conditionDeadlineDate}}], or such later date as we may agree in writing, this offer may be withdrawn at the Employer's discretion.

4. REMUNERATION

4.1 You will be paid an annual salary of GBP [{{pay.annualSalary}}].00 per annum (less applicable deductions), payable in [{{pay.payFrequency}}] instalments.

4.2 You will be eligible to participate in the Employer's performance bonus scheme. Details of the current scheme are set out in the accompanying Terms and Conditions of Employment. Any bonus awarded will be at the Employer's sole discretion and based on individual and company performance.

4.3 You will be entitled to [{{pay.annualLeaveDays}}] days' paid annual leave per annum (in addition to public and bank holidays), subject to the Employer's holiday year.

5. BENEFITS

5.1 You will be entitled to participate in the Employer's [{{benefits.pensionSchemeName}}] pension scheme, with Employer contributions of [{{benefits.employerContributionPercent}}]% of your basic annual salary, subject to the rules of the scheme as in force from time to time.

5.2 [{{benefits.otherBenefitsText}}]

6. PLACE OF WORK

6.1 Your principal place of work will be [{{role.workLocation}}]. The Employer reserves the right to require you to work at other locations from time to time as reasonably required.

6.2 You may be required to travel to other locations within the United Kingdom and overseas as necessary for the proper performance of your duties.

7. HOURS OF WORK

7.1 Your normal working time will be [{{terms.workingHours}}] hours per week, [{{terms.workPattern}}]. The Employer reserves the right to alter your working hours or patterns in accordance with the needs of the business.

7.2 You acknowledge that you are [{{terms.overtimeCategory}}] for the purposes of the national minimum wage legislation.

8. CONTRACT OF EMPLOYMENT

8.1 This Letter, together with the enclosed Terms and Conditions of Employment and any documents referred to herein, constitutes your contract of employment with the Employer and supersedes all prior representations, agreements, and discussions.

8.2 You will be asked to sign and return the enclosed duplicate copy of this Letter and the Terms and Conditions of Employment as your acceptance of the terms of employment.

9. ACCEPTANCE

9.1 Please confirm your acceptance of this offer by signing and returning the duplicate copy of this Letter by [{{terms.offerDeadline}}].

9.2 If we do not receive your signed acceptance by that date, this offer shall lapse.

We look forward to welcoming you to [{{party.employer.name}}].

Yours sincerely,

[{{signatures.employerSignatoryName}}]
[{{signatures.employerSignatoryTitle}}]
[{{party.employer.name}}]

---

ACCEPTANCE

I, [{{party.candidate.name}}], accept the offer of employment on the terms set out in this Letter and in the accompanying Terms and Conditions of Employment.

Signed: _______________________________
Date: [{{dates.acceptanceDate}}]

---
Template document. Not legal advice. Not suitable if: the role is governed by a regulatory body with specific suitability requirements; the candidate requires a work visa or sponsorship; the position involves regulated activities under the Financial Services and Markets Act 2000 (relevant approved persons regime). This template reflects general UK practice and must be reviewed by a qualified employment lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_JOB_OFFER_UK: LegendItem[] = [
  { path: 'party.employer.name', label: "Employer's legal name", type: 'string', required: true, example: 'Apex Growth Partners LLP' },
  { path: 'party.employer.registeredAddress', label: "Employer's registered address", type: 'text', required: true, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'party.candidate.name', label: "Candidate's full legal name", type: 'string', required: true, example: 'Victoria Rose Ashworth' },
  { path: 'role.jobTitle', label: 'Job title', type: 'string', required: true, example: 'Head of Business Development' },
  { path: 'role.reportsTo', label: 'Reports to (name/title)', type: 'string', required: true, example: 'Managing Partner' },
  { path: 'role.workLocation', label: 'Principal place of work', type: 'string', required: true, example: '30 St Mary Axe, London, EC3A 8EP' },
  { path: 'role.dutiesDescription', label: 'Description of duties', type: 'text', required: true, example: 'developing and implementing business development strategies; managing relationships with key clients and intermediaries; identifying and evaluating new market opportunities; preparing and presenting proposals; representing the firm at industry events and conferences; mentoring junior team members' },
  { path: 'terms.commencementDate', label: 'Start date', type: 'date', required: true, example: '2025-06-02' },
  { path: 'terms.probationaryPeriodText', label: 'Probationary period text', type: 'text', required: false, example: 'Your appointment is subject to a probationary period of 6 months from the Start Date, during which your performance and suitability for the role will be assessed. During the probationary period, either party may terminate the employment by giving not less than one week\'s notice.' },
  { path: 'terms.workingHours', label: 'Weekly working hours', type: 'number', required: true, example: 40 },
  { path: 'terms.workPattern', label: 'Work pattern', type: 'string', required: false, example: 'Monday to Friday, 9:00 am to 5:30 pm' },
  { path: 'terms.overtimeCategory', label: 'Overtime category', type: 'enum', required: true, rules: { options: ['not exempt', 'exempt'] }, example: 'not exempt' },
  { path: 'terms.offerDeadline', label: 'Offer deadline', type: 'date', required: true, example: '2025-05-20' },
  { path: 'conditions.backgroundCheckType', label: 'Background check type', type: 'string', required: false, example: 'standard criminal record check (DBS basic check) and reference checks' },
  { path: 'conditions.additionalConditionText', label: 'Additional condition', type: 'text', required: false, example: 'satisfactory completion of a technical assessment relevant to the Role' },
  { path: 'conditions.conditionDeadlineDate', label: 'Condition deadline date', type: 'date', required: false, example: '2025-05-30' },
  { path: 'pay.annualSalary', label: 'Annual salary (GBP)', type: 'number', required: true, example: 85000 },
  { path: 'pay.payFrequency', label: 'Pay frequency', type: 'enum', required: true, rules: { options: ['12 (monthly)', '24 (bi-weekly)'] }, example: '12 (monthly)' },
  { path: 'pay.annualLeaveDays', label: 'Annual leave days', type: 'number', required: true, example: 25 },
  { path: 'benefits.pensionSchemeName', label: 'Pension scheme name', type: 'string', required: false, example: 'Group Personal Pension Plan' },
  { path: 'benefits.employerContributionPercent', label: "Employer pension contribution %", type: 'number', required: false, example: 5 },
  { path: 'benefits.otherBenefitsText', label: 'Other benefits description', type: 'text', required: false, example: 'life assurance cover (4x basic annual salary); income protection insurance; childcare voucher scheme; season ticket loan (up to GBP 3,000); BUPA private medical insurance (employee only)' },
  { path: 'signatures.employerSignatoryName', label: "Employer's signatory name", type: 'string', required: true, example: 'Catherine Anne Brooks' },
  { path: 'signatures.employerSignatoryTitle', label: "Employer's signatory title", type: 'string', required: true, example: 'Chief People Officer' },
  { path: 'dates.letterDate', label: 'Letter date', type: 'date', required: true, example: '2025-05-12' },
  { path: 'dates.acceptanceDate', label: 'Acceptance date', type: 'date', required: true, example: '2025-05-15' },
];

// ─── RESIDENTIAL TENANCY — UK ─────────────────────────────────────────────────

const TENANCY_UK = `ASSURED TENANCY AGREEMENT

Title: Residential Tenancy Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

PART 1: DETAILS OF THE PARTIES AND PROPERTY

THIS TENANCY AGREEMENT is made on [{{dates.tenancyDate}}]

BETWEEN:

(1) [{{party.landlord.name}}], [{{party.landlord.entityType}}] of [{{party.landlord.address}}] ("Landlord"); and

(2) [{{party.tenant.name}}], [{{party.tenant.tenantStatus}}] of [{{party.tenant.currentAddress}}] ("Tenant").

PROPERTY: [{{property.address}}], being a dwelling house [{{property.propertyType}}] with [{{property.bedrooms}}] bedrooms (the "Property").

TERM: The Tenancy shall commence on [{{terms.startDate}}] and shall continue as a periodic tenancy thereafter until determined in accordance with Clause 6.

2. THIS AGREEMENT

2.1 This Agreement sets out the terms of the tenancy of the Property. It is an Assured Tenancy within the meaning of Part 9 of the Housing Act 1988 (as amended by the Housing Act 1996 and the Localism Act 2011).

2.2 The Landlord confirms that the Property is let as a single private dwelling and that the Tenant shall have exclusive possession of the Property for the purposes of a private dwelling during the Tenancy.

3. RENT

3.1 The Tenant shall pay rent of GBP [{{rent.weeklyRent}}].00 per week / GBP [{{rent.monthlyRent}}].00 per month [({{rent.rentFrequency}})], payable [{{rent.paymentFrequency}}] in advance on the [{{rent.rentDay}}] day of each [{{rent.period}}].

3.2 The first instalment of rent, comprising [{{rent.firstPaymentCovers}}], shall be payable on or before the Tenant signs this Agreement.

3.3 All rent is payable to [{{rent.payableTo}}] at [{{rent.paymentMethodDetails}}].

3.4 [{{rent.rentReviewText}}]

4. DEPOSIT

4.1 The Tenant shall pay a deposit of GBP [{{deposit.amount}}] (the "Deposit") on or before the commencement of the Tenancy.

4.2 The Deposit will be protected under the Housing Act 2004 (Tenancy Deposit Protection) within [{{deposit.protectionDeadlineDays}}] days of receipt. The Deposit will be held by [{{deposit.protectionScheme}}] under its custodial scheme / insurance-backed scheme. The Tenant will be provided with the Prescribed Information within [{{deposit.prescribedInfoDeadlineDays}}] days of receipt.

4.3 The Deposit shall be returned to the Tenant within [{{deposit.returnDeadlineDays}}] days of the end of the Tenancy, less any deductions properly made in accordance with this Agreement for: (a) any damage to the Property or its contents caused by the Tenant's failure to comply with the Tenant's obligations; (b) any rent or other sums due to the Landlord that have not been paid; (c) any costs incurred by the Landlord in remedied breaches of this Agreement by the Tenant.

4.4 The Landlord shall not make deductions from the Deposit without written notice to the Tenant, specifying the basis for and amount of any deduction, and providing the Tenant with an opportunity to respond before the Deposit is returned.

5. UTILITIES AND SERVICES

5.1 The Tenant shall pay all charges for: (a) gas, electricity, and other fuel supplies to the Property; (b) water and sewerage charges (unless those charges are included in the rent); (c) council tax for the Property; (d) telephone, internet, and other telecoms services to the Property.

5.2 [{{utilities.includedUtilitiesText}}]

6. TERMINATION

6.1 The Landlord may not bring the Tenancy to an end before [{{terms.initialTermMonths}}] months from the commencement date (the "Initial Period"), unless the Tenant has breached the Tenant's obligations under this Agreement.

6.2 After the Initial Period, either Party may terminate the Tenancy by giving to the other Party not less than [{{terms.noticePeriodMonths}}] months' written notice. The notice must be served using the prescribed form under section 5 and Schedule 2 of the Housing Act 1988 (as amended).

6.3 The Landlord may seek possession of the Property before the end of the Initial Period only by: (a) obtaining a court order on one or more of the grounds set out in Schedule 2 to the Housing Act 1988 (as amended); or (b) relying on the s.21 Procedure after the Initial Period has expired.

6.4 The Tenant may terminate the Tenancy by giving not less than [{{terms.tenantNoticeMonths}}] months' written notice to the Landlord.

6.5 On the termination of the Tenancy, the Tenant shall: (a) give up vacant possession of the Property; (b) remove all the Tenant's belongings from the Property; (c) return all keys and other access devices to the Landlord; (d) leave the Property in the condition required by Clause 9.

7. TENANT'S OBLIGATIONS

The Tenant hereby covenants with the Landlord as follows:

7.1 Rent. To pay the rent on the days and in the manner specified in Clause 3.

7.2 Utilities. To pay all sums due for utilities and services as specified in Clause 5 and to transfer all accounts into the Tenant's name within [{{obligations.utilitiesTransferDays}}] days of the commencement of the Tenancy.

7.3 Repair and Maintenance. To keep the Property and all Landlord's fixtures and fittings in a clean and tidy condition and to make good any damage caused by the Tenant's act or omission. To notify the Landlord promptly of any defect, damage, or disrepair to the Property, in accordance with Clause 10.

7.4 Condition at Termination. To leave the Property at the end of the Tenancy in the same condition as at the commencement (fair wear and tear excepted), having: (a) removed all the Tenant's belongings; (b) cleaned the Property including all fixtures, appliances, windows, and地板; (c) removed all rubbish; (d) restored any items moved or altered by the Tenant (with the Landlord's consent) to their original condition.

7.5 Access. To permit the Landlord or the Landlord's agents to enter the Property at reasonable hours of the day for the purposes of: (a) inspecting the condition of the Property on not less than [{{obligations.inspectionNoticeHours}}] hours' prior written notice; (b) carrying out repairs, maintenance, or improvements on not less than [{{obligations.repairsNoticeHours}}] hours' prior written notice; (c) showing the Property to prospective purchasers, tenants, or agents on not less than [{{obligations.viewingsNoticeHours}}] hours' prior written notice.

7.6 Insurance. To keep the Tenant's own belongings and liabilities insured and to indemnify the Landlord against any claim arising from the Tenant's failure to insure.

7.7 Quiet Enjoyment. Not to do anything that would be a nuisance or annoyance to neighbours or that would cause the Landlord to be in breach of any obligation to neighbours or any relevant authority.

7.8 Prohibited Uses. Not to: (a) use the Property for any purpose other than a private dwelling; (b) carry on any trade, business, or profession from the Property; (c) smoke (including e-cigarettes) inside the Property or within the boundaries of the Property.

7.9 Alterations. Not to make any structural or other alterations, decorations, additions, or improvements to the Property without the prior written consent of the Landlord. The Tenant shall be entitled to redecorate the internal walls of the Property in appropriate colours provided the Tenant: (a) obtains prior written consent; (b) uses good quality paint or wallpaper; (c) restores the walls to their original condition before the end of the Tenancy if requested by the Landlord.

7.10 Assignation and Subletting. Not to: (a) assign, transfer, or part with possession of the whole or any part of the Property; (b) sublet any part of the Property; (c) take in lodgers or paying guests; (d) hold over beyond the end of the Tenancy. The Tenant acknowledges that the Landlord does not consent to any assignment or subletting.

8. LANDLORD'S OBLIGATIONS

The Landlord hereby covenants with the Tenant as follows:

8.1 Quiet Enjoyment. That the Tenant shall have quiet possession and enjoyment of the Property during the Tenancy, free from any interruption by the Landlord or any person claiming under the Landlord.

8.2 Repair. To keep the structure and exterior of the Property in repair, and to keep the installations for the supply of water, gas, electricity, and sanitation in repair and proper working order, in accordance with the Landlord and Tenant Act 1985 (as amended by the Housing Act 1988) and the Homes (Fitness for Human Habitation) Act 2018.

8.3 Compliance. To ensure that the Property, at the commencement of the Tenancy and throughout its duration, complies with: (a) the Homes (Fitness for Human Habitation) Act 2018; (b) the Housing Health and Safety Rating System (HHSRS); (c) all applicable gas safety regulations, electrical safety standards, and energy performance certificate requirements; (d) the Furniture and Furnishings (Fire Safety) Regulations 1988 (as amended).

8.4 Deposit Protection. To protect the Deposit in accordance with Clause 4 and the Housing Act 2004.

8.5 Smoke and Carbon Monoxide Alarms. To ensure that smoke alarms and carbon monoxide alarms are installed and maintained in accordance with the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022.

8.6 Right to Rent. To conduct the prescribed checks to ensure that the Tenant has the right to rent property in England under the Immigration Act 2014.

9. CONDITION INVENTORY AND SCHEDULE OF CONDITION

9.1 A Schedule of Condition and Inventory of the Property (the "Inventory") shall be prepared by [{{inventory.preparedBy}}] prior to the commencement of the Tenancy.

9.2 The Tenant shall be given the opportunity to inspect and comment on the Inventory within [{{inventory.inspectionDays}}] days of the commencement of the Tenancy.

9.3 At the end of the Tenancy, the Inventory shall be used as a basis for comparing the condition of the Property, fair wear and tear excepted. The Landlord shall be entitled to deduct from the Deposit the reasonable costs of making good any damage or deterioration that is beyond fair wear and tear.

10. REPAIRS AND NOTICES

10.1 The Tenant shall give notice to the Landlord of any defect, damage, or disrepair to the Property as soon as reasonably practicable and in any event within [{{obligations.defectNoticeDays}}] days of becoming aware of it.

10.2 The Landlord shall attend to repairs within a reasonable period and shall keep the Tenant informed of progress.

10.3 Emergency contact: [{{contacts.emergencyContactDetails}}]

11. END OF TENANCY

11.1 At the end of the Tenancy, the Tenant shall: (a) remove all belongings and vacate the Property by [{{terms.vacationTime}}] on the last day of the Tenancy; (b) leave the Property in the condition specified in Clause 7.4; (c) return all keys (including any duplicate keys) to the Landlord.

11.2 If the Tenant fails to vacate the Property by the required time, the Tenant shall be liable for damages for each day or part day of over-holding at a rate equivalent to [{{terms.overholdingDailyCharge}}] GBP per day, which the Parties agree is a reasonable pre-estimate of the Landlord's loss.

12. FEES AND CHARGES

12.1 The Landlord shall not charge the Tenant any fee or other charge in connection with the Tenancy other than those expressly set out in this Agreement or as permitted under the Tenant Fees Act 2019.

12.2 [{{fees.permittedFeesText}}]

13. DATA PROTECTION

13.1 The Landlord will hold and process personal data relating to the Tenant in accordance with the UK GDPR and the Data Protection Act 2018. The Tenant's data will be used for the purposes of managing the tenancy and will not be shared with third parties except as required by law.

13.2 The Tenant has the right to request access to the personal data held about them and to request correction of any inaccurate data.

14. MISCELLANEOUS

14.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements.

14.2 Severability. If any provision is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

14.3 Notices. All notices under this Agreement shall be in writing and shall be delivered by hand, by pre-paid post, or by email to the addresses of the Parties set out above (or as updated in writing).

14.4 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales.

IN WITNESS WHEREOF the Parties have executed this Agreement on the date first above written.

SIGNED by [{{party.landlord.name}}]
by [{{signatures.landlordSignatoryName}}]:

Signature: _______________________________
Date: [{{dates.tenancyDate}}]

SIGNED by [{{party.tenant.name}}]:

Signature: _______________________________
Date: [{{dates.tenancyDate}}]

---
Template document. Not legal advice. Not suitable if: the property is a house in multiple occupation (HMO) requiring a licence from the local authority; the rent exceeds the threshold for an Assured Tenancy (currently GBP 100,000 per year in Greater London or GBP 25,000 per year elsewhere); the Tenant is a company or other non-natural person; the property is a social housing tenancy. This template reflects general England & Wales practice and must be reviewed by a qualified solicitor or housing law specialist before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_TENANCY_UK: LegendItem[] = [
  { path: 'party.landlord.name', label: "Landlord's legal name", type: 'string', required: true, example: 'Harwood Property Management Ltd' },
  { path: 'party.landlord.entityType', label: "Landlord's entity type", type: 'string', required: true, example: 'a private limited company' },
  { path: 'party.landlord.address', label: "Landlord's address", type: 'text', required: true, example: '25 Queen Street, Manchester, M1 2JA' },
  { path: 'party.tenant.name', label: "Tenant's full legal name", type: 'string', required: true, example: 'James Robert Elliot' },
  { path: 'party.tenant.tenantStatus', label: "Tenant's occupancy status", type: 'string', required: true, example: 'an individual' },
  { path: 'party.tenant.currentAddress', label: "Tenant's current address", type: 'text', required: true, example: '88 Victoria Road, Manchester, M16 0WS' },
  { path: 'property.address', label: 'Property address', type: 'text', required: true, example: 'Flat 3, 14 Clarence Street, Manchester, M1 3DY' },
  { path: 'property.propertyType', label: 'Property type', type: 'enum', required: true, rules: { options: ['a self-contained flat', 'a self-contained maisonette', 'a self-contained house'] }, example: 'a self-contained flat' },
  { path: 'property.bedrooms', label: 'Number of bedrooms', type: 'number', required: true, example: 2 },
  { path: 'terms.startDate', label: 'Tenancy start date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'terms.initialTermMonths', label: 'Initial term (months)', type: 'number', required: false, example: 12 },
  { path: 'terms.noticePeriodMonths', label: 'Landlord notice period (months)', type: 'number', required: false, example: 2 },
  { path: 'terms.tenantNoticeMonths', label: 'Tenant notice period (months)', type: 'number', required: true, example: 1 },
  { path: 'rent.weeklyRent', label: 'Weekly rent (GBP)', type: 'number', required: false, example: 450 },
  { path: 'rent.monthlyRent', label: 'Monthly rent (GBP)', type: 'number', required: true, example: 1800 },
  { path: 'rent.rentFrequency', label: 'Rent frequency note', type: 'string', required: false, example: '(the equivalent of GBP 7,800 per annum)' },
  { path: 'rent.paymentFrequency', label: 'Payment frequency', type: 'enum', required: true, rules: { options: ['monthly', 'weekly', 'fortnightly'] }, example: 'monthly' },
  { path: 'rent.rentDay', label: 'Rent due day of month', type: 'number', required: true, example: 1 },
  { path: 'rent.period', label: 'Rent period', type: 'string', required: false, example: 'calendar month' },
  { path: 'rent.firstPaymentCovers', label: 'First payment covers', type: 'string', required: true, example: 'the first month\'s rent and a proportion of the first calendar month' },
  { path: 'rent.payableTo', label: 'Rent payable to', type: 'string', required: true, example: 'Harwood Property Management Ltd' },
  { path: 'rent.paymentMethodDetails', label: 'Payment method details', type: 'text', required: false, example: 'by bank transfer to sort code 04-00-04, account number 12345678' },
  { path: 'rent.rentReviewText', label: 'Rent review text', type: 'text', required: false, example: 'The Landlord reserves the right to review the rent annually. Any increase in rent shall not exceed [5]% above the current rent in any 12-month period. The Tenant shall be given not less than [1] month\'s written notice of any increase.' },
  { path: 'deposit.amount', label: 'Deposit amount (GBP)', type: 'number', required: true, example: 3600 },
  { path: 'deposit.protectionDeadlineDays', label: 'Deposit protection deadline (days)', type: 'number', required: true, example: 30 },
  { path: 'deposit.protectionScheme', label: 'Deposit protection scheme', type: 'enum', required: true, rules: { options: ['mydeposits', 'deposit protection service (DPS)', 'tenancy deposit scheme (TDS)'] }, example: 'deposit protection service (DPS)' },
  { path: 'deposit.prescribedInfoDeadlineDays', label: 'Prescribed information deadline (days)', type: 'number', required: true, example: 30 },
  { path: 'deposit.returnDeadlineDays', label: 'Deposit return deadline (days)', type: 'number', required: true, example: 10 },
  { path: 'utilities.includedUtilitiesText', label: 'Included utilities text', type: 'text', required: false, example: 'The following utilities are included in the rent: water and sewerage charges.' },
  { path: 'obligations.utilitiesTransferDays', label: 'Utilities transfer period (days)', type: 'number', required: false, example: 7 },
  { path: 'obligations.inspectionNoticeHours', label: 'Inspection notice (hours)', type: 'number', required: false, example: 48 },
  { path: 'obligations.repairsNoticeHours', label: 'Repairs notice (hours)', type: 'number', required: false, example: 72 },
  { path: 'obligations.viewingsNoticeHours', label: 'Viewing notice (hours)', type: 'number', required: false, example: 24 },
  { path: 'obligations.defectNoticeDays', label: 'Defect notice period (days)', type: 'number', required: false, example: 7 },
  { path: 'inventory.preparedBy', label: 'Inventory prepared by', type: 'string', required: true, example: 'MoveOut Inventory Services' },
  { path: 'inventory.inspectionDays', label: 'Inventory inspection period (days)', type: 'number', required: false, example: 7 },
  { path: 'contacts.emergencyContactDetails', label: 'Emergency contact details', type: 'text', required: false, example: 'Emergency repairs: call 0800 123 4567 (24-hour helpline). For gas emergencies: call National Gas Emergency 0800 111 999.' },
  { path: 'terms.vacationTime', label: 'Vacation time on last day', type: 'string', required: false, example: '12:00 noon' },
  { path: 'terms.overholdingDailyCharge', label: 'Daily overholding charge (GBP)', type: 'number', required: false, example: 60 },
  { path: 'fees.permittedFeesText', label: 'Permitted fees text', type: 'text', required: false, example: 'The following fees are permitted under the Tenant Fees Act 2019: holding deposit (capped at 1 week\'s rent); tenancy amendment (capped at GBP 50); early termination (cost of re-letting); defaulted payments (interest at 3% above Bank of England base rate per day on overdue amounts).' },
  { path: 'signatures.landlordSignatoryName', label: "Landlord signatory name", type: 'string', required: true, example: 'Michael John Harwood' },
  { path: 'dates.tenancyDate', label: 'Tenancy agreement date', type: 'date', required: true, example: '2025-05-28' },
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
  await seedProduct('settlement-agreement', 'Settlement Agreement', 'Employment & HR', 'UK', 'United Kingdom (England & Wales)', SETTLEMENT_UK, LEGEND_SETTLEMENT_UK);
  await seedProduct('job-offer-letter', 'Job Offer Letter', 'Employment & HR', 'UK', 'United Kingdom (England & Wales)', JOB_OFFER_UK, LEGEND_JOB_OFFER_UK);
  await seedProduct('residential-tenancy-agreement', 'Residential Tenancy Agreement', 'Property & Real Estate', 'UK', 'United Kingdom (England & Wales)', TENANCY_UK, LEGEND_TENANCY_UK);
}

main().catch(console.error).finally(() => prisma.$disconnect());