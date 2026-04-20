import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

const UK_ZEROHOURS = `PART-TIME WORKERS AND ZERO-HOURS WORKERS AGREEMENT

Title: Part-Time Workers and Zero-Hours Workers Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

THIS AGREEMENT is made on [{{dates.agreementDate}}]

BETWEEN:

(1) [{{party.employer.name}}], a company incorporated in England and Wales with company number [{{party.employer.companyNumber}}] and having its registered office at [{{party.employer.registeredAddress}}] (the "Employer"); and

(2) [{{party.worker.name}}], an individual residing at [{{party.worker.homeAddress}}] (the "Worker").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Employer wishes to engage the Worker, and the Worker wishes to be engaged by the Employer, on the terms and subject to the conditions set out in this Agreement; and

WHEREAS the Parties wish to record the terms of their arrangement having regard to the provisions of the Employment Rights Act 1996 (as amended by the Children and Families Act 2014 and the Sustainable Growth for the Self-Employed etc. Act 2023) and the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Atypical Workers" means the Worker if the Employer is an agency and the Worker is supplied to work for hirer(s) under a contract for services with the agency;

(b) "Band of Hours" means the range of hours set out in Clause 3.2 within which the Employer may require the Worker to work;

(c) "Comparator" means a full-time worker employed by the Employer in the same establishment doing work that is identical or interchangeable with the Worker's work, and who has the same level of qualification, skill, and experience;

(d) "Guaranteed Hours" means any hours worked by the Worker that the Employer is obliged to pay the Worker for under this Agreement, the Worker's contract of employment, or any other agreement with the Employer;

(e) "Hourly Rate" means the rate of pay specified in Clause 4.1;

(f) "Open-Ended Contract" means a contract that is not a fixed-term or limited-term contract;

(g) "Penalty" has the meaning given in Regulation 29(1) of the the Trade Union and Labour Relations (Consolidation) Act 1992 (as substituted by section 18 of the Employment Act 2024) and any regulations made thereunder;

(h) "Relevant Term" has the meaning given in section 27 of the Employment Rights Act 1996;

(i) "Working Time Regulations" means the Working Time Regulations 1998 (SI 1998/1833), as amended;

(j) "Zero-Hours Work" means work or services to be provided under this Agreement where the Employer is not obliged to offer the Worker a guarantee of a minimum number of hours of work or services, and the Worker is not obliged to accept any such offer of work or services offered by the Employer.

1.2 Unless the context otherwise requires: (a) references to Clauses are to clauses of this Agreement; (b) headings are for convenience only and shall not affect interpretation; (c) the expression "including" means "including without limitation".

1.3 This Agreement constitutes a contract of employment between the Employer and the Worker for the purposes of the Employment Rights Act 1996 and all other relevant legislation. For the avoidance of doubt, the Worker is an employee of the Employer.

2. COMMENCEMENT AND TERM

2.1 This Agreement shall commence on [{{terms.commencementDate}}] (the "Start Date") and shall continue until terminated in accordance with Clause 11.

2.2 [{{terms.probationDetails}}]

2.3 The Worker is entitled to receive a written statement of terms and conditions of employment pursuant to section 1 of the Employment Rights Act 1996, which shall be provided within the period specified in section 2(1) of that Act. This Agreement, together with any supplementary documents referred to herein, constitutes the written statement of terms.

3. HOURS OF WORK

3.1 This Agreement is a [{{contract.zeroHoursContractType}}] arrangement for the purposes of section 27A of the Employment Rights Act 1996. The Worker [{{contract.workerExclusivityClause}}].

3.2 Band of Hours. The Worker shall be offered a Band of Hours of not less than [{{contract.minWeeklyHoursOffer}}] hours per week and not more than [{{contract.maxWeeklyHoursOffer}}] hours per week (the "Band of Hours"). The Band of Hours reflects the Employer's reasonable estimate of the volume of work likely to be available to the Worker.

3.3 Guaranteed Hours. [{{contract.guaranteedHoursDetails}}]

3.4 Variation of Band of Hours. The Employer may vary the Band of Hours by giving the Worker not less than [{{contract.bandVariationNoticeWeeks}}] weeks' written notice. Any variation shall be accompanied by an updated written statement of terms pursuant to section 4 of the Employment Rights Act 1996.

3.5 Rota. Where the Employer intends to roster the Worker for shifts or sessions, the Employer shall publish a rota [{{contract.rotaNoticePeriodDays}}] days in advance.

4. REMUNERATION

4.1 Hourly Rate. The Worker shall be paid at the rate of GBP [{{pay.hourlyRate}}].00 per hour (the "Hourly Rate"), payable monthly in arrears by bank transfer to an account nominated by the Worker.

4.2 Pay Equality. The Worker shall be entitled to be treated no less favourably than a comparable full-time worker in respect of the hourly rate of pay and the rate of pay for any paid leave. Where there is no directly comparable full-time worker, the Employer shall ensure that the Worker's hourly rate reflects the market rate for the role, having regard to the experience and qualifications of the Worker.

4.3 Overtime. Hours worked in excess of [{{pay.overtimeThresholdHours}}] hours per week shall be paid at [{{pay.overtimeRate}}] times the Hourly Rate.

4.4 Pay Statement. The Employer shall provide the Worker with an itemised pay statement at or before the time of payment, showing the gross pay, deductions, and net pay.

4.5 Right to Raise Claim. The Worker's right to bring a claim under Regulation 5 of the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000 is not affected by anything in this Agreement.

5. LEAVE AND HOLIDAYS

5.1 The Worker shall be entitled to paid annual leave in accordance with the Working Time Regulations and the current rate of pay under regulation 14 of the Working Time Regulations 1998 (as amended by the Accreditation of Overseas (EU Exit) Regulations where applicable).

5.2 The Worker shall accrue entitlement to paid annual leave at the rate of [{{leave.annualLeaveDays}}] days per annum (pro-rated for any period of service of less than a full year), in addition to public and bank holidays.

5.3 The Worker shall give [{{leave.holidayNoticeDays}}] days' notice of any request to take annual leave, and the Employer shall respond within [{{leave.employerResponseDays}}] days.

5.4 Sick Pay. The Worker shall be entitled to Statutory Sick Pay in accordance with the Social Security Contributions and Benefits Act 1992, subject to meeting the relevant eligibility criteria. [{{leave.enhancedSickPayDetails}}]

5.5 Family Leave. The Worker shall be entitled to maternity, paternity, adoption, and parental leave in accordance with the applicable provisions of the Employment Rights Act 1996 and the Maternity and Parental Leave etc. Regulations 1999.

6. EMPLOYMENT STATUS

6.1 The Worker is an employee of the Employer. This Agreement constitutes a contract of employment and does not constitute a contract for the provision of services by a self-employed contractor.

6.2 For the purposes of the Atypical Workers Regulations and the Agency Workers Regulations 2010 (as applicable), the Employer confirms that this is [{{contract.regulationStatus}}] a contract under which the Worker is not obliged to perform work personally.

6.3 Exclusivity. [{{contract.exclusivityProvision}}]

6.4 The Employer shall not act in a manner that is inconsistent with the Worker's status as an employee, including by representing to third parties that the Worker is self-employed or a contractor where the Employer knows or ought to know otherwise.

7. PENSIONS AND BENEFITS

7.1 The Worker shall be auto-enrolled into the Employer's qualifying workplace pension scheme (if applicable) in accordance with the Auto-Enrolment (Earnings Trigger and Definitions) Regulations 2008 and the Pensions Act 2008. The Employer shall make minimum employer contributions as specified in the applicable legislation.

7.2 [{{benefits.employerBenefitsDetails}}]

8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY

8.1 The Worker shall keep confidential all Confidential Information belonging to the Employer and shall not disclose it to any third party without the prior written consent of the Employer. "Confidential Information" means all information relating to the Employer's business, operations, finances, customers, clients, and prospective business activities that is not in the public domain.

8.2 All work product, inventions, and intellectual property created by the Worker in the course of employment shall be the sole and exclusive property of the Employer, and the Worker hereby assigns all such rights to the Employer.

8.3 The obligations in this Clause 8 shall survive the termination of this Agreement.

9. DISCIPLINARY AND GRIEVANCE

9.1 The Employer's disciplinary and grievance procedures (as amended from time to time) shall apply to the Worker. A copy of the current disciplinary procedure is attached at Schedule 1 and the grievance procedure is attached at Schedule 2.

9.2 The Worker has the right to be accompanied at any disciplinary hearing by a trade union representative or a colleague.

10. RESTRICTIVE COVENANTS

[{{restrictions.restrictiveCovenantsText}}]

11. TERMINATION

11.1 Either Party may terminate this Agreement by giving to the other Party not less than [{{termination.noticePeriodWeeks}}] weeks' written notice.

11.2 The Employer may terminate this Agreement summarily for Gross Misconduct (as defined in the Employer's disciplinary procedure) without any liability for notice or pay in lieu of notice.

11.3 On termination, the Worker shall return all property belonging to the Employer and shall not retain any copies of Confidential Information.

11.4 Following receipt of a valid statutory notice of termination, the Worker shall be entitled to take reasonable time off during the notice period to seek new employment or to make arrangements for future self-employment.

12. GENERAL PROVISIONS

12.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings relating to the subject matter hereof.

12.2 Variation. No variation to this Agreement shall be effective unless agreed in writing signed by both Parties.

12.3 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

12.4 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.

12.5 Third Party Rights. No third party shall have any rights to enforce any term of this Agreement pursuant to the Contracts (Rights of Third Parties) Act 1999.

IN WITNESS WHEREOF the Parties have executed this Agreement as a written contract on the date first written above.

Signed by [{{party.employer.name}}]
by [{{signatures.employerSignatoryName}}], [{{signatures.employerSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

Signed by the Worker [{{party.worker.name}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SCHEDULE 1 — DISCIPLINARY PROCEDURE
[{{schedules.disciplinaryProcedure}}]

SCHEDULE 2 — GRIEVANCE PROCEDURE
[{{schedules.grievanceProcedure}}]

---
Template document. Not legal advice. Not suitable if: the Worker is a genuine self-employed contractor (not an employee); the arrangement involves a regulated activity requiring specific licensing; the Employer has failed to comply with the requirement to notify the Worker of the key terms of this Agreement within the period specified in section 1 Employment Rights Act 1996; the band of hours has not been set reasonably and in good faith. This template reflects general UK practice for part-time and zero-hours arrangements and must be reviewed by a qualified employment lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const legend = [
  { path: 'party.employer.name', label: "Employer's legal name", type: 'string', required: true, example: 'Brightside Staffing Solutions Ltd' },
  { path: 'party.employer.companyNumber', label: "Employer's company number", type: 'string', required: false, example: '09876543' },
  { path: 'party.employer.registeredAddress', label: "Employer's registered office address", type: 'text', required: true, example: '25 Canary Wharf, London, E14 5LB' },
  { path: 'party.worker.name', label: "Worker's full legal name", type: 'string', required: true, example: 'Sarah Elizabeth Mitchell' },
  { path: 'party.worker.homeAddress', label: "Worker's home address", type: 'text', required: true, example: '14 Elm Road, Bristol, BS1 5QU' },
  { path: 'contract.zeroHoursContractType', label: 'Contract type', type: 'enum', required: true, rules: { options: ['a zero-hours contract (as defined in section 27A of the Employment Rights Act 1996)', 'a part-time workers contract', 'an open-ended contract with a variable hours band'] }, example: 'a zero-hours contract (as defined in section 27A of the Employment Rights Act 1996)' },
  { path: 'contract.workerExclusivityClause', label: 'Worker exclusivity', type: 'enum', required: true, rules: { options: ['is not obliged to work exclusively for the Employer', 'is obliged to work exclusively for the Employer subject to the terms of Clause 6.3'] }, example: 'is not obliged to work exclusively for the Employer' },
  { path: 'contract.minWeeklyHoursOffer', label: 'Minimum hours in band (per week)', type: 'number', required: true, example: 0 },
  { path: 'contract.maxWeeklyHoursOffer', label: 'Maximum hours in band (per week)', type: 'number', required: true, example: 30 },
  { path: 'contract.guaranteedHoursDetails', label: 'Guaranteed hours details', type: 'text', required: false, example: 'No hours are guaranteed. The Employer does not guarantee any minimum number of hours.' },
  { path: 'contract.bandVariationNoticeWeeks', label: 'Band variation notice period (weeks)', type: 'number', required: true, example: 4 },
  { path: 'contract.rotaNoticePeriodDays', label: 'Rota notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'pay.hourlyRate', label: 'Hourly rate (GBP)', type: 'number', required: true, example: 13.50 },
  { path: 'pay.overtimeThresholdHours', label: 'Overtime threshold (hours per week)', type: 'number', required: true, example: 40 },
  { path: 'pay.overtimeRate', label: 'Overtime multiplier', type: 'enum', required: true, rules: { options: ['1.5', '2.0'] }, example: '1.5' },
  { path: 'leave.annualLeaveDays', label: 'Annual leave days (excl. bank holidays)', type: 'number', required: true, example: 20 },
  { path: 'leave.holidayNoticeDays', label: 'Holiday notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'leave.employerResponseDays', label: 'Employer response to holiday request (days)', type: 'number', required: false, example: 7 },
  { path: 'leave.enhancedSickPayDetails', label: 'Enhanced sick pay details', type: 'text', required: false, example: 'Subject to the Worker meeting the relevant eligibility criteria, the Employer will pay the Worker enhanced sick pay at the rate of full pay for the first 5 working days of any period of sickness absence, followed by Statutory Sick Pay for subsequent days.' },
  { path: 'benefits.employerBenefitsDetails', label: 'Additional benefits', type: 'text', required: false, example: 'Employee assistance programme; cycle-to-work scheme.' },
  { path: 'restrictions.restrictiveCovenantsText', label: 'Restrictive covenants text', type: 'text', required: false, example: 'In the event that the Worker holds a senior role with access to sensitive commercial information, the Employer may require the Worker to enter into post-termination restrictions on competition and non-solicitation, which shall be negotiated and agreed separately at the relevant time.' },
  { path: 'termination.noticePeriodWeeks', label: 'Termination notice period (weeks)', type: 'number', required: true, example: 1 },
  { path: 'terms.commencementDate', label: 'Agreement commencement date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'terms.probationDetails', label: 'Probationary period details', type: 'text', required: false, example: 'The first 8 weeks of employment constitute a probationary period during which the Worker shall not be entitled to notice of termination. Either Party may terminate employment with immediate effect during the probationary period without liability for notice or damages.' },
  { path: 'contract.regulationStatus', label: 'Regulation status', type: 'string', required: false, example: 'not' },
  { path: 'contract.exclusivityProvision', label: 'Exclusivity provision text', type: 'text', required: false, example: 'The Worker is not obliged to work exclusively for the Employer. The Worker may accept work from other employers provided that such work does not conflict with the interests of the Employer or interfere with the Worker\'s ability to perform the duties assigned under this Agreement.' },
  { path: 'signatures.employerSignatoryName', label: "Employer's signatory name", type: 'string', required: true, example: 'Jonathan Mark Davies' },
  { path: 'signatures.employerSignatoryTitle', label: "Employer's signatory title", type: 'string', required: true, example: 'Head of People Operations' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'schedules.disciplinaryProcedure', label: 'Disciplinary procedure text', type: 'text', required: false, example: 'The Employer\'s disciplinary procedure, as published in the Staff Handbook, applies. For allegations of misconduct or poor performance, the Worker will normally be given 5 working days\' notice of a disciplinary hearing and will have the right to be accompanied by a trade union representative or a colleague.' },
  { path: 'schedules.grievanceProcedure', label: 'Grievance procedure text', type: 'text', required: false, example: 'The Worker should raise any grievance in writing to the line manager. The Employer will hold a meeting within 10 working days and communicate its decision in writing within a further 5 working days. The Worker may appeal against any decision to the HR Director.' },
];

function makePayload(items: typeof legend): Record<string, any> {
  const p: Record<string, any> = {};
  for (const item of items) {
    let v = item.example;
    if (v === undefined || v === null) {
      if (item.type === 'number') v = 1;
      else if (item.type === 'boolean') v = true;
      else v = 'Example';
    }
    (p as any)[item.path as string] = v;
  }
  return p;
}


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function main() {
  const product = await prisma.product.upsert({
    where: { slug: 'part-time-zero-hours-contract' },
    update: { status: ProductStatus.PUBLISHED, title: 'Part-Time & Zero-Hours Contract', category: 'Employment & HR' },
    create: { slug: 'part-time-zero-hours-contract', title: 'Part-Time & Zero-Hours Contract', category: 'Employment & HR', type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });

  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction: 'UK' } });
  if (!template) {
    template = await prisma.template.create({
      data: { productId: product.id, jurisdiction: 'UK', name: 'Part-Time & Zero-Hours Contract (UK)', description: 'Part-time and zero-hours workers agreement for UK (England & Wales) employment law.' },
    });
  }

  const existingActive = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existingActive) { console.log('[SKIP] UK variant already has active version'); return; }

  const version = await prisma.templateVersion.create({
    data: {
      version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF,
      inputSchemaJson: {}, placeholderLegend: { version: 1, items: legend } as any,
      bodyTemplate: UK_ZEROHOURS, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });

  const validation = validateTemplateVersion(version, makePayload(legend));
  if (validation.issues.length) {
    console.warn('[WARN] Validation issues:');
    validation.issues.slice(0, 4).forEach(i => console.warn(' -', i.path + ':', i.message));
  } else {
    console.log('[CLEAN] No validation issues');
  }
  console.log('[OK] Part-Time & Zero-Hours Contract (UK) — template=' + template.id + ', version=' + version.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());