import {
  ProductStatus,
  ProductType,
  OutputFormat,
  PrismaClient,
} from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────
// PRODUCT 1: Full-Time Employment Contract
// ─────────────────────────────────────────────

const UK_EMPLOYMENT = `MUTUAL NON-DISCLOSURE AGREEMENT

Title: Full-Time Employment Contract
Version: 1
Jurisdiction: United Kingdom (England & Wales)

THIS AGREEMENT is made on [{{dates.agreementDate}}] BETWEEN:

(1) [{{party.employer.name}}] (company registration number [{{party.employer.companyNumber}}]) whose registered office is at [{{party.employer.registeredAddress}}] ("the Employer"); and

(2) [{{party.employee.name}}] of [{{party.employee.address}}] ("the Employee")

(collectively "the Parties")

WHEREAS the Employer desires to employ the Employee in the capacity of [{{role.jobTitle}}] within the [{{role.department}}] department, and the Employee has agreed to enter into employment upon the terms and subject to the conditions hereinafter appearing.

NOW IT IS AGREED as follows:

1. COMMENCEMENT AND DURATION

1.1 The Employee's employment with the Employer shall commence on [{{dates.employmentStartDate}}] (the "Commencement Date") and shall continue, subject to the remaining provisions of this Agreement, until terminated by either Party in accordance with Clause 10.

1.2 This Agreement supersedes and extinguishes all prior agreements, arrangements, understandings, and representations whether oral or written, statutory or non-statutory, relating to the employment of the Employee by the Employer.

2. POSITION AND DUTIES

2.1 The Employee shall:

(a) serve the Employer in the position of [{{role.jobTitle}}] or such other position as the Employer may from time to time reasonably direct;

(b) diligently and faithfully perform such duties and exercise such powers as are from time to time assigned to or vested in the Employee, and conform to all reasonable directions given by the Employer;

(c) devote the whole of the Employee's working time, attention, and ability to the discharge of the Employee's duties hereunder during such hours as the Employer may reasonably require, subject to the Working Time Regulations 1998 and the terms of this Agreement;

(d) use the Employee's best endeavours to promote, protect, develop, and extend the business, undertakings, and reputation of the Employer and any group company;

(e) comply with all rules, codes of conduct, policies, and procedures of the Employer as notified to the Employee from time to time, including without limitation the Employer's equal opportunities policy, data protection policy, health and safety policy, and acceptable use policy;

(f) promptly disclose to the Employer all and any facts, matters, or circumstances of which the Employee becomes aware that may in any way be material to the business, financial position, or reputation of the Employer or any group company; and

(g) obtain and maintain at the Employee's own cost (unless the Employer shall otherwise direct in writing) all licences, consents, permits, qualifications, and approvals required for the proper performance of the Employee's duties.

2.2 The Employee shall not, without the prior written consent of the Employer, be directly or indirectly engaged, concerned, or interested in any other business, trade, occupation, or profession whatsoever, save that the holding of a minority interest not exceeding five per cent. of the issued share capital of any publicly listed company shall not constitute a breach of this provision.

3. HOURS OF WORK

3.1 The Employee's normal working hours shall be [{{hours.weeklyHours}}] hours per week, to be worked on such days and at such times as the Employer may reasonably require, with a daily unpaid lunch break of [{{hours.lunchDuration}}] minutes.

3.2 The Employee acknowledges that the nature of the Employee's role is such that the Employee may be required to work additional hours beyond normal working hours in order to properly discharge the Employee's duties ("Reasonable Overtime"). Where the Employee is required to work in excess of [{{hours.weeklyHours}}] hours per week on a regular and ongoing basis, the Employer shall review whether additional compensation or time off in lieu is appropriate.

3.3 The Employer operates a flexible working scheme, details of which are set out in the Employee Handbook. The Employee may submit a formal flexible working request in accordance with the Employer's flexible working policy and the Employment Rights Act 1996.

4. PLACE OF WORK

4.1 The Employee shall initially perform the Employee's duties at or from [{{role.primaryLocation}}], or such other location within the United Kingdom as the Employer may reasonably require.

4.2 The Employee may be required to travel to such other locations, including locations outside the United Kingdom, as the Employer may reasonably require for the proper performance of the Employee's duties, provided that any period of continuous work outside the United Kingdom shall not exceed [{{role.maxInternationalDays}}] days in any rolling twelve-month period without the Employee's prior written consent.

4.3 The Employer may require the Employee to work from home or remotely for such period as the Employer may determine, upon not less than [{{role.remoteNoticeDays}}] business days' written notice, subject to the requirements of the Employee's role and the Employer's operational capabilities.

5. REMUNERATION

5.1 The Employer shall pay to the Employee a gross annual salary of [{{compensation.baseSalary}}] pounds sterling (£[{{compensation.baseSalary}}]) per annum, payable in equal monthly instalments in arrears by bank credit transfer on or about the [{{compensation.payDay}}] day of each calendar month, subject to deduction of such sums as are required by law including, without limitation, income tax and national insurance contributions.

5.2 The Employee's salary shall be reviewed annually by the Employer. Any increase in salary shall be at the sole and absolute discretion of the Employer and, if awarded, shall take effect from such date as the Employer may determine. The Employer shall notify the Employee in writing of any change in the rate of salary.

5.3 In addition to base salary, the Employee may be eligible for:

(a) a discretionary annual bonus of up to [{{compensation.bonusPercentage}}]% of base salary, based on individual and company performance as determined by the Employer in its sole and absolute discretion;

(b) participation in the Employer's [{{benefits.pensionSchemeName}}] pension scheme, subject to the rules thereof as amended from time to time, with the Employer contributing [{{benefits.employerPensionContribution}}]% of the Employee's basic salary where the Employee contributes not less than [{{benefits.employeeMinContribution}}]%; and

(c) such other benefits as the Employer may determine and notify to the Employee in writing.

5.4 The Employee's entitlement to expenses shall be as set out in the Employer's expenses policy, as amended from time to time.

6. HOLIDAYS

6.1 In addition to bank and public holidays, the Employee shall be entitled to [{{benefits.annualLeaveDays}}] working days' paid annual leave per annum (the "Annual Entitlement"), to be taken at such times as the Employer may approve in advance.

6.2 The Employer's holiday year runs from [{{benefits.holidayYearStart}}] to [{{benefits.holidayYearEnd}}]. Not more than [{{benefits.carriedForwardDays}}] days of unused Annual Entitlement may be carried forward to the succeeding holiday year without the prior written consent of the Employer.

6.3 Upon the termination of this Agreement for any reason, the Employee shall be entitled to payment in lieu of any accrued but untaken Annual Entitlement, and the Employer shall be entitled to deduct from any sum due to the Employee any overpayment of holiday pay where the Employee has taken holiday in excess of the accrued entitlement.

7. SICKNESS AND SICK PAY

7.1 Subject to the Employee complying with the Employer's absence notification procedures, the Employer shall pay the Employee sick pay as follows:

(a) during the first [{{benefits.sspWeeks}}] weeks of any period of incapacity for work occurring within any period of twelve consecutive calendar months, the Employee shall receive full basic pay; and

(b) thereafter, Statutory Sick Pay at the rate applicable from time to time in accordance with applicable legislation.

7.2 The Employee shall provide the Employer with a medical certificate from a qualified medical practitioner covering any period of incapacity exceeding [{{benefits.selfCertificationDays}}] consecutive working days, and shall keep the Employer informed of the Employee's anticipated date of return to work.

7.3 The Employer may require the Employee to undergo a medical examination by a doctor nominated by the Employer at any stage of the Employee's employment, at the Employer's expense.

8. PROBATIONARY PERIOD

8.1 The first [{{probation.lengthMonths}}] months of the Employee's employment shall constitute the Employee's probationary period (the "Probationary Period").

8.2 During the Probationary Period, the Employee's conduct, performance, and suitability shall be assessed by the Employer. Upon satisfactory completion of the Probationary Period, the Employee's employment shall be confirmed in writing. The Employer may, at its sole discretion, extend the Probationary Period by a further period not exceeding [{{probation.extensionMonths}}] months where performance or conduct has not met the required standard.

8.3 During or at the end of the Probationary Period, the Employer may terminate the Employee's employment by providing the Employee with not less than [{{probation.terminationNoticeWeeks}}] weeks' written notice. The Employee may terminate by providing the Employer with not less than [{{probation.terminationNoticeWeeks}}] weeks' written notice.

9. PENSION AND BENEFITS

9.1 The Employee's entitlement to pensions and other benefits shall be as set out in the relevant scheme rules and benefit documentation provided to the Employee. The Employer reserves the right to amend, vary, or withdraw any benefit at its sole discretion, subject to applicable law.

9.2 The Employee shall be entitled to participate in the Employer's [{{benefits.pensionSchemeName}}] pension scheme in accordance with the rules thereof. The Employer shall contribute [{{benefits.employerPensionContribution}}]% of the Employee's basic annual salary, subject to the Employee making minimum contributions of [{{benefits.employeeMinContribution}}]%.

10. TERMINATION

10.1 Without prejudice to any other right or remedy available to either Party, this Agreement may be terminated as follows:

(a) by the Employee providing to the Employer not less than [{{termination.employeeNoticeWeeks}}] weeks' prior written notice;

(b) by the Employer providing to the Employee not less than [{{termination.employerNoticeWeeks}}] weeks' prior written notice or, at the Employer's election, payment in lieu of notice (less deductions required by law).

10.2 The Employer may terminate this Agreement with immediate effect and without notice, payment in lieu of notice, or any other liability whatsoever if the Employee:

(a) commits a material or persistent breach of any term of this Agreement or any policy, code, or procedure of the Employer;

(b) is convicted of any criminal offence (excluding minor road traffic offences);

(c) engages in conduct that is seriously prejudicial to the business, operations, or reputation of the Employer or any group company;

(d) is disqualified as a director or otherwise prohibited by law from holding the Employee's position;

(e) is guilty of gross misconduct or negligence in the performance of the Employee's duties; or

(f) becomes bankrupt, makes any voluntary arrangement with the Employee's creditors, or has a receiving order made against the Employee.

10.3 Upon the termination of this Agreement (howsoever occasioned):

(a) the Employee shall immediately return to the Employer all property, documents, data, materials, and copies thereof belonging to or relating to the Employer or any group company;

(b) the Employee shall immediately provide to the Employer all passwords, access credentials, and security devices used in the performance of the Employee's duties;

(c) the Employee shall not delete, destroy, or corrupt any data, documents, or records belonging to the Employer; and

(d) the Employee shall cease all representation of the Employer to third parties.

10.4 The Employer may, at its election, place the Employee on garden leave for all or part of any notice period, during which the Employee shall remain bound by all obligations under this Agreement.

11. CONFIDENTIALITY

11.1 The Employee acknowledges that, by reason of the Employee's employment, the Employee may have access to and become acquainted with Confidential Information belonging to the Employer or any group company. The Employee shall hold all Confidential Information in strict confidence and shall not, at any time (whether during the currency of this Agreement or at any time thereafter), disclose any Confidential Information to any third party, except:

(a) as required in the proper performance of the Employee's duties;

(b) with the prior written consent of the Employer;

(c) as required by applicable law, regulation, or court order, provided that the Employee shall, where not prohibited by law, provide the Employer with prior written notice of such requirement; or

(d) to the Employee's professional advisers, subject to their being bound by equivalent obligations of confidence.

11.2 "Confidential Information" means all information and data belonging to or relating to the business, affairs, customers, clients, finances, trading, products, services, suppliers, developments, or intellectual property of the Employer or any group company that is not in the public domain and that the Employee learns or becomes aware of by reason of the Employee's employment.

11.3 Upon the termination of this Agreement, the Employee shall immediately deliver up to the Employer all Confidential Information and all copies thereof in whatever form held.

12. INTELLECTUAL PROPERTY

12.1 All Intellectual Property created, conceived, developed, or reduced to practice by the Employee in the course of the Employee's employment (whether during working hours or using the Employer's resources, equipment, or facilities) shall vest in and belong to the Employer absolutely as beneficial owner. The Employee hereby assigns to the Employer all right, title, and interest in and to such Intellectual Property, including all copyright, patent, trade mark, design right, database right, and all other proprietary rights throughout the world.

12.2 The Employee shall promptly disclose to the Employer all Intellectual Property created, conceived, or developed by the Employee in the course of the Employee's duties. The Employee shall, at the Employer's expense, do all such acts and things and execute all such documents as the Employer may require to vest title to such Intellectual Property in the Employer and to obtain and maintain such registrations, licences, and protections as the Employer may direct.

12.3 The Employee hereby waives, to the fullest extent permitted by law, all moral rights in any copyright work created by the Employee in the course of the Employee's employment.

13. POST-TERMINATION RESTRICTIONS

13.1 The Employee acknowledges that the restrictions set out in this Clause 13 are reasonable and necessary to protect the legitimate business interests of the Employer.

13.2 For a period of [{{restrictions.nonCompeteMonths}}] months following the termination of this Agreement (for any reason), the Employee shall not, directly or indirectly:

(a) solicit or attempt to solicit the custom or business of any client, customer, or intermediary of the Employer with whom the Employee had material contact during the [{{restrictions.solicitationWindowMonths}}] months preceding the date of termination;

(b) offer employment to, engage, or procure the engagement of any person who was a director, officer, or employee of the Employer at the date of termination, or during the [{{restrictions.hiringWindowMonths}}] months preceding that date;

(c) carry on, be engaged in, concerned with, or interested in any business within the United Kingdom that competes directly with the principal business of the Employer; or

(d) use the name of the Employer or any associated trade mark, service mark, or business name in connection with any competing business.

13.3 Clause 13.2(c) shall not apply where the Employee holds a minority shareholding not exceeding five per cent. of the issued share capital of a publicly listed company.

13.4 If any restriction in this Clause 13 is held to be invalid or unenforceable, the remaining restrictions shall continue in full force and effect.

14. DATA PROTECTION

14.1 The Employer shall process the Employee's personal data in accordance with the Employer's Privacy Notice, Data Protection Policy, and all applicable data protection legislation including the UK GDPR and the Data Protection Act 2018. The Employee's attention is drawn to the Employee Privacy Notice and Data Protection Policy provided with this Agreement and available from the Human Resources department.

14.2 The Employee shall comply with all data protection policies, procedures, and guidance issued by the Employer and shall not do anything that places the Employer in breach of its data protection obligations.

15. DISCIPLINARY AND GRIEVANCE

15.1 The Employee's conduct, performance, and behaviour shall be subject to the Employer's disciplinary and grievance procedures, copies of which are set out in the Employee Handbook. The Employer reserves the right to amend such procedures from time to time.

15.2 The Employee has the right to be accompanied at any disciplinary hearing by a fellow employee or a trade union representative of the Employee's choice.

16. EQUALITY AND DIVERSITY

16.1 The Employer is committed to providing equal opportunities in employment and to eliminating unlawful discrimination. The Employee is required to comply with the Employer's Equality and Diversity Policy and to treat all colleagues, clients, and third parties with dignity and respect.

16.2 The Employee shall not harass, victimise, bully, or unlawfully discriminate against any person on grounds of any protected characteristic as defined in the Equality Act 2010.

17. HEALTH AND SAFETY

17.1 The Employer shall provide and maintain a safe and healthy working environment in compliance with all applicable health and safety legislation. The Employee shall comply with all health and safety rules, procedures, and instructions notified by the Employer and shall promptly report any hazard, risk, or incident to the Employer.

17.2 The Employee shall take reasonable care of the Employee's own health and safety and that of others who may be affected by the Employee's acts or omissions.

18. GENERAL

18.1 This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements, representations, warranties, and understandings relating to the employment of the Employee.

18.2 No variation to this Agreement shall be effective unless agreed in writing signed by both Parties or, in the case of policies incorporated by reference, as amended by the Employer in accordance with the terms thereof.

18.3 The Employee shall not be entitled to any remuneration or benefits other than as expressly set out in this Agreement or the Employer's policies as notified in writing.

18.4 The Employer may transfer the Employee's employment to any group company, provided that such transfer does not impose any materially disadvantageous change to the Employee's terms and conditions of employment.

19. GOVERNING LAW AND JURISDICTION

19.1 This Agreement and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales in relation to any dispute or claim arising out of or in connection with this Agreement.

19.2 The Employee acknowledges that the provisions of the Employment Rights Act 1996, the Working Time Regulations 1998, the Equality Act 2010, the Data Protection Act 2018, and all other applicable statutes and regulations shall, where appropriate, be incorporated into and form part of this Agreement to the extent required by law.

IN WITNESS WHEREOF the Parties have executed this Agreement as a deed on the date first above written.

EXECUTED as a DEED by [{{party.employer.name}}]
acting by [{{signatures.employerSignatoryTitle}}]
[Director / Authorised Signatory]

Signature: _______________________________
Name: [{{signatures.employerSignatoryName}}]
Title: [{{signatures.employerSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

EXECUTED as a DEED by [{{party.employee.name}}]
in the presence of:

Signature of Witness: _______________________________
Full Name: [{{signatures.witnessName}}]
Address: [{{signatures.witnessAddress}}]
Occupation: [{{signatures.witnessOccupation}}]

Signed by Employee: _______________________________
Full Name: [{{party.employee.name}}]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Employee is based and primarily works outside the United Kingdom; the Employee is covered by a relevant collective agreement; the Employee's terms are governed by a trade union recognition agreement; the role is exempt from the Working Time Regulations 1998 pursuant to Regulation 20 thereof. Local law may require additional steps. Jurisdiction: United Kingdom (England & Wales).`.trim();

const legendFullTimeUK = [
  { path: 'party.employer.name', label: "Employer's registered legal name", type: 'string', required: true, example: 'Acme Ltd' },
  { path: 'party.employer.companyNumber', label: "Employer's company registration number", type: 'string', required: true, example: '12345678' },
  { path: 'party.employer.registeredAddress', label: "Employer's registered office address", type: 'text', required: true, example: '1 High Street, London, EC1A 1AA' },
  { path: 'party.employee.name', label: "Employee's full legal name", type: 'string', required: true, example: 'Jane Elizabeth Doe' },
  { path: 'party.employee.address', label: "Employee's residential address", type: 'text', required: true, example: '10 New Street, Manchester, M1 1AA' },
  { path: 'role.jobTitle', label: 'Job title', type: 'string', required: true, example: 'Senior Product Manager' },
  { path: 'role.department', label: 'Department', type: 'string', required: true, example: 'Product' },
  { path: 'role.primaryLocation', label: 'Primary place of work', type: 'string', required: true, example: 'London, UK (hybrid)' },
  { path: 'role.maxInternationalDays', label: 'Max international working days per 12 months', type: 'number', required: false, example: 30 },
  { path: 'role.remoteNoticeDays', label: 'Business days notice for remote work requirement', type: 'number', required: false, example: 10 },
  { path: 'hours.weeklyHours', label: 'Weekly working hours', type: 'number', required: true, example: 37.5 },
  { path: 'hours.lunchDuration', label: 'Daily lunch break in minutes', type: 'number', required: false, example: 60 },
  { path: 'compensation.baseSalary', label: 'Annual gross salary (£)', type: 'money', required: true, example: 65000 },
  { path: 'compensation.payDay', label: 'Day of month for salary payment', type: 'number', required: true, example: 25 },
  { path: 'compensation.bonusPercentage', label: 'Max annual bonus percentage', type: 'number', required: false, example: 15 },
  { path: 'benefits.pensionSchemeName', label: 'Pension scheme name', type: 'string', required: false, example: 'Workplace Pension' },
  { path: 'benefits.employerPensionContribution', label: "Employer pension contribution %", type: 'number', required: false, example: 5 },
  { path: 'benefits.employeeMinContribution', label: "Employee minimum contribution %", type: 'number', required: false, example: 3 },
  { path: 'benefits.annualLeaveDays', label: 'Annual leave days (excl. bank holidays)', type: 'number', required: true, example: 25 },
  { path: 'benefits.holidayYearStart', label: 'Holiday year start month', type: 'string', required: false, example: 'January' },
  { path: 'benefits.holidayYearEnd', label: 'Holiday year end month', type: 'string', required: false, example: 'December' },
  { path: 'benefits.carriedForwardDays', label: 'Max annual leave days carry-forward', type: 'number', required: false, example: 5 },
  { path: 'benefits.sspWeeks', label: 'Weeks of full sick pay', type: 'number', required: false, example: 4 },
  { path: 'benefits.selfCertificationDays', label: 'Self-certification days for sickness', type: 'number', required: false, example: 7 },
  { path: 'probation.lengthMonths', label: 'Probationary period in months', type: 'number', required: false, example: 3 },
  { path: 'probation.extensionMonths', label: 'Max probation extension in months', type: 'number', required: false, example: 3 },
  { path: 'probation.terminationNoticeWeeks', label: 'Notice period during probation (weeks)', type: 'number', required: false, example: 1 },
  { path: 'termination.employeeNoticeWeeks', label: 'Employee notice period (weeks)', type: 'number', required: true, example: 4 },
  { path: 'termination.employerNoticeWeeks', label: 'Employer notice period (weeks)', type: 'number', required: true, example: 4 },
  { path: 'restrictions.nonCompeteMonths', label: 'Post-termination non-compete (months)', type: 'number', required: false, example: 6 },
  { path: 'restrictions.solicitationWindowMonths', label: 'Client solicitation restriction (months)', type: 'number', required: false, example: 12 },
  { path: 'restrictions.hiringWindowMonths', label: 'Non-solicitation of staff window (months)', type: 'number', required: false, example: 12 },
  { path: 'dates.agreementDate', label: 'Date of this agreement', type: 'date', required: true, example: '2025-01-15' },
  { path: 'dates.employmentStartDate', label: 'Employment start date', type: 'date', required: true, example: '2025-02-01' },
  { path: 'signatures.employerSignatoryName', label: "Employer's signing representative name", type: 'string', required: true, example: 'Robert James Smith' },
  { path: 'signatures.employerSignatoryTitle', label: "Employer's signing representative title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.witnessName', label: "Witness's full name", type: 'string', required: true, example: 'Sarah Jane Brown' },
  { path: 'signatures.witnessAddress', label: "Witness's address", type: 'text', required: true, example: '20 Church Road, London, SW1A 1AA' },
  { path: 'signatures.witnessOccupation', label: "Witness's occupation", type: 'string', required: true, example: 'Solicitor' },
];

// ─────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const products = [
    {
      slug: 'full-time-employment-contract',
      title: 'Full-Time Employment Contract',
      category: 'Employment & HR',
      type: ProductType.SINGLE,
      description:
        'Comprehensive contract of employment for full-time employees, covering duties, remuneration, holidays, sickness, confidentiality, IP, post-termination restrictions, and termination. Drafted for UK (England & Wales) jurisdiction.',
      jurisdiction: 'UK',
      name: 'Full-Time Employment Contract',
      jurisdictionLabel: 'United Kingdom (England & Wales)',
      bodyTemplate: UK_EMPLOYMENT,
      legend: legendFullTimeUK,
    },
  ];

  for (const p of products) {
    // Upsert product
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: { status: ProductStatus.PUBLISHED, title: p.title, category: p.category },
      create: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        type: p.type,
        status: ProductStatus.PUBLISHED,
      },
    });

    // Upsert template
    let template = await prisma.template.findFirst({
      where: { productId: product.id, jurisdiction: p.jurisdiction as any },
    });
    if (!template) {
      template = await prisma.template.create({
        data: {
          productId: product.id,
          jurisdiction: p.jurisdiction as any,
          name: p.name,
          description: p.description,
        },
      });
    }

    // Check if active version exists
    const existingActive = await prisma.templateVersion.findFirst({
      where: { templateId: template.id, isActive: true },
      orderBy: { version: 'desc' },
    });
    if (existingActive) {
      console.log(`[SKIP] ${p.title} (${p.jurisdiction}) — active version already exists`);
      continue;
    }

    // Build sample payload from legend
    const samplePayload: Record<string, any> = {};
    (p.legend as any[]).forEach((item: any) => {
      let val = item.example;
      if (val === undefined || val === null) {
        switch (item.type) {
          case 'number':
          case 'money': val = 1; break;
          case 'boolean': val = true; break;
          case 'date': val = '2025-01-01'; break;
          default: val = 'Example';
        }
      }
      samplePayload[item.path] = val;
    });

    const version = await prisma.templateVersion.create({
      data: {
        version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
        rendererType: 'HANDLEBARS',
        outputFormat: OutputFormat.PDF,
        inputSchemaJson: {},
        placeholderLegend: { version: 1, items: p.legend } as any,
        bodyTemplate: p.bodyTemplate,
        promptTemplate: '',
        lastValidatedAt: new Date(),
        lastValidationErrors: [],
      },
    });

    // Validate
    const validation = validateTemplateVersion(version, samplePayload);
    if (validation.issues.length) {
      console.warn(`Validation issues for ${p.title} (${p.jurisdiction}):`, validation.issues.slice(0, 3));
    }

    console.log(`[OK] ${p.title} (${p.jurisdiction}) — template=${template.id}, version=${version.id}`);
  }

  console.log('\nDone.');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
