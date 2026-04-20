import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─── Fix 3: Employment Offer Letter US (pre-existing, no body) ─────────────────

const BODY = `EMPLOYMENT OFFER LETTER

Title: Employment Offer Letter
Version: 2
Jurisdiction: United States of America

Date: [{{dates.offerDate}}]

[{{party.employer.name}}]
[{{party.employer.address}}]

Dear [{{party.candidate.name}}],

RE: OFFER OF EMPLOYMENT — [{{position.jobTitle}}]

On behalf of [{{party.employer.name}}] (the "Company"), I am delighted to offer you employment with the Company on the terms set out in this letter (the "Offer Letter").

1. POSITION AND DUTIES

1.1 Your position will be [{{position.jobTitle}}], reporting to [{{position.reportsTo}}] (your "Reporting Manager").

1.2 Your principal duties and responsibilities will include without limitation:

(a) [{{position.primaryDuties}}];

(b) [{{position.additionalDuties}}];

(c) such other duties as may be reasonably assigned by the Reporting Manager or the Board from time to time.

1.3 You agree to devote your full working time, attention, and skill to the performance of your duties and to the advancement of the Company's business. You will not, without the prior written consent of the Company, engage in any other employment, consulting, or business activity during your employment with the Company.

2. COMMENCEMENT AND PROBATION

2.1 Your anticipated start date is [{{dates.startDate}}] (the "Start Date").

2.2 You will serve an initial probationary period of [{{employment.probationMonths}}] months from the Start Date (the "Probationary Period"). During the Probationary Period, your employment may be terminated by either party upon [{{employment.probationNoticeWeeks}}] weeks' written notice. Upon successful completion of the Probationary Period, you will become a permanent employee of the Company.

3. LOCATION

3.1 Your principal place of work will be [{{work.location}}], or such other location as the Company may reasonably require from time to time.

3.2 You may be required to travel to other locations as necessary for the proper performance of your duties.

4. COMPENSATION

4.1 Base Salary. The Company will pay you a base salary of [{{compensation.annualSalary}}] per annum (the "Base Salary"), less applicable withholdings and deductions, payable in accordance with the Company's standard payroll schedule.

4.2 [{{compensation.bonusSchemeText}}]

4.3 [{{compensation.equityText}}]

5. BENEFITS

5.1 You will be entitled to participate in the Company's standard employee benefits programme, including without limitation:

(a) [{{benefits.health}}] health insurance (coverage to commence on [{{dates.benefitsStartDate}}]);

(b) [{{benefits.pension}}] retirement savings plan, subject to applicable plan terms;

(c) [{{benefits.pto}}] days of paid time off per annum;

(d) [{{benefits.other}}].

5.2 Benefits are subject to the terms of the applicable plan documents, as may be amended from time to time. In the event of any conflict between this Offer Letter and the plan documents, the plan documents shall govern.

6. EXECUTIVE BENEFITS

6.1 [{{executive.benefitsText}}]

7. RESTRICTIVE COVENANTS

7.1 You acknowledge that, during your employment, you will have access to and become acquainted with Confidential Information of the Company. In consideration of your employment and the compensation and benefits provided, you agree to the restrictive covenants set out in Schedule 1 hereto.

7.2 The restrictive covenants in Schedule 1 are severable and independent, and in the event that any such covenant is found to be invalid or unenforceable, the remaining covenants shall continue in full force and effect.

8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY

8.1 During and after your employment, you will maintain the confidentiality of all Confidential Information of the Company and will not use or disclose any Confidential Information except as required in the proper performance of your duties or as authorised by the Company in writing.

8.2 All Intellectual Property created by you during your employment in connection with the Company's business shall be the sole and exclusive property of the Company. You hereby assign to the Company all right, title, and interest in and to any such Intellectual Property, and agree to execute any documents reasonably required to perfect such assignment.

8.3 Upon the termination of your employment for any reason, you will promptly return to the Company all documents, materials, and other property of the Company in your possession or control.

9. CONDITIONS OF OFFER

9.1 This Offer Letter is conditional upon and subject to:

(a) the Company receiving satisfactory results from [{{conditions.backgroundCheck}}] (if applicable);

(b) your eligibility to work in the United States of America and the production of documentary evidence of such eligibility, including without limitation documentation pursuant to Form I-9;

(c) [{{conditions.additionalCondition}}];

(d) your execution of the Confidentiality and Intellectual Property Agreement referred to in Clause 8 and the restrictive covenants set out in Schedule 1.

9.2 This Offer Letter, together with any documents referred to herein, constitutes the entire agreement between you and the Company with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements relating to your employment.

10. GENERAL

10.1 No alteration or modification of this Offer Letter shall be effective unless agreed in writing and signed by both parties.

10.2 This Offer Letter shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}], without regard to its conflict of laws principles.

10.3 Any dispute arising out of or relating to this Offer Letter shall be subject to the exclusive jurisdiction of the state and federal courts located in [{{legal.jurisdictionCity}}], [{{legal.governingState}}].

11. ACCEPTANCE

11.1 This Offer Letter is open for acceptance until [{{dates.acceptanceDeadline}}]. If we have not received your written acceptance by that date, this offer will lapse.

11.2 To accept this offer, please sign and return a copy of this Offer Letter to [{{contacts.hrEmail}}].

We look forward to welcoming you to the Company.

Yours sincerely,

_______________________________
[{{signatures.offerSignatoryName}}]
[{{signatures.offerSignatoryTitle}}]
[{{party.employer.name}}]

---

ACCEPTANCE

I, [{{party.candidate.name}}], accept the offer of employment set out in this Offer Letter and agree to be bound by its terms.

Signed: _______________________________
Date: [{{dates.acceptanceDate}}]

SCHEDULE 1 — RESTRICTIVE COVENANTS

1. Non-Competition. During my employment and for a period of [{{restrictiveCovenants.nonCompeteMonths}}] months following the termination of my employment (the "Restricted Period"), I will not, directly or indirectly, engage in, be employed by, or provide services to any business that competes with the Company within [{{restrictiveCovenants.nonCompeteGeographic}}].

2. Non-Solicitation of Employees. During the Restricted Period, I will not, directly or indirectly, solicit, entice, or induce any employee of the Company to leave the Company's employment.

3. Non-Solicitation of Clients. During the Restricted Period, I will not, directly or indirectly, solicit, divert, or take away any client, customer, or business relationship of the Company.

4. Non-Disparagement. I will not make any statement, whether publicly or privately, that disparages or damages the reputation of the Company or any of its officers, directors, or employees.

---
Template document. Not legal advice. Not suitable if: the candidate is a senior executive with equity compensation requiring a separate equity grant agreement; the position is based in California (non-compete clauses are void under California Business and Professions Code Section 16600 with narrow exceptions); the position involves regulated activities requiring specific licences (e.g., securities, insurance, medical). This template reflects general U.S. at-will employment practice and must be reviewed by a qualified employment attorney before use, particularly in relation to applicable state law governing restrictive covenants. Jurisdiction: United States of America (specific state: [{{legal.governingState}}]).`;

const LEGEND = [
  { path: 'party.employer.name', label: 'Employer legal name', type: 'string', required: true, example: 'Apex Financial Services LLC' },
  { path: 'party.employer.address', label: 'Employer address', type: 'text', required: true, example: '200 Park Avenue, Suite 1700, New York, NY 10166' },
  { path: 'party.candidate.name', label: 'Candidate full name', type: 'string', required: true, example: 'Jonathan Reed Patterson' },
  { path: 'position.jobTitle', label: 'Job title', type: 'string', required: true, example: 'Senior Analyst' },
  { path: 'position.reportsTo', label: 'Reports to (name/title)', type: 'string', required: true, example: 'Managing Director' },
  { path: 'position.primaryDuties', label: 'Primary duties', type: 'text', required: true, example: 'Conducting financial modelling and analysis for institutional clients; preparing investment committee presentations and memoranda' },
  { path: 'position.additionalDuties', label: 'Additional duties', type: 'text', required: false, example: 'Mentoring junior analysts; contributing to thought leadership and research publications' },
  { path: 'dates.offerDate', label: 'Offer date', type: 'date', required: true, example: '2025-09-01' },
  { path: 'dates.startDate', label: 'Anticipated start date', type: 'date', required: true, example: '2025-10-01' },
  { path: 'dates.benefitsStartDate', label: 'Benefits commencement date', type: 'date', required: false, example: '2025-10-01' },
  { path: 'dates.acceptanceDeadline', label: 'Offer acceptance deadline', type: 'date', required: true, example: '2025-09-08' },
  { path: 'dates.acceptanceDate', label: 'Candidate acceptance date', type: 'date', required: true, example: '2025-09-05' },
  { path: 'employment.probationMonths', label: 'Probationary period (months)', type: 'number', required: false, example: 3 },
  { path: 'employment.probationNoticeWeeks', label: 'Probation notice (weeks)', type: 'number', required: false, example: 2 },
  { path: 'work.location', label: 'Principal place of work', type: 'string', required: true, example: 'New York, NY (with flexibility for remote work up to 3 days per week)' },
  { path: 'compensation.annualSalary', label: 'Annual base salary (USD)', type: 'string', required: true, example: '$145,000' },
  { path: 'compensation.bonusSchemeText', label: 'Bonus scheme text', type: 'text', required: false, example: 'Discretionary annual bonus: you will be eligible for a discretionary annual performance bonus of up to 20% of your Base Salary, based on individual and Company performance, payable in the first quarter of the following calendar year.' },
  { path: 'compensation.equityText', label: 'Equity compensation text', type: 'text', required: false, example: 'Stock Options: subject to approval by the Board of Managers, you will be granted an option to purchase Common Units in the Company in accordance with the terms of the Company\'s LLC Agreement and a separate Stock Option Agreement.' },
  { path: 'benefits.health', label: 'Health insurance description', type: 'string', required: false, example: 'Individual or family' },
  { path: 'benefits.pension', label: 'Pension/retirement plan description', type: 'string', required: false, example: '401(k) with 4% Company match' },
  { path: 'benefits.pto', label: 'Paid time off (days per annum)', type: 'string', required: false, example: '20' },
  { path: 'benefits.other', label: 'Other benefits', type: 'text', required: false, example: 'Life insurance (2x annual salary); long-term disability coverage; professional development budget of $2,500 per annum' },
  { path: 'executive.benefitsText', label: 'Executive benefits text', type: 'text', required: false, example: 'Executive health screening; critical illness cover; car allowance of $800 per month.' },
  { path: 'conditions.backgroundCheck', label: 'Background check description', type: 'string', required: false, example: 'criminal record check and verification of educational and employment history' },
  { path: 'conditions.additionalCondition', label: 'Additional condition of offer', type: 'text', required: false, example: 'satisfactory reference from your most recent employer' },
  { path: 'contacts.hrEmail', label: 'HR contact email for acceptance', type: 'string', required: true, example: 'hr@apexfinancial.com' },
  { path: 'signatures.offerSignatoryName', label: 'Offer signatory name', type: 'string', required: true, example: 'Michael David Thornton' },
  { path: 'signatures.offerSignatoryTitle', label: 'Offer signatory title', type: 'string', required: true, example: 'Chief Operating Officer' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'legal.jurisdictionCity', label: 'Jurisdiction city and state', type: 'string', required: false, example: 'New York County, New York' },
  { path: 'restrictiveCovenants.nonCompeteMonths', label: 'Non-compete post-termination period (months)', type: 'number', required: false, example: 12 },
  { path: 'restrictiveCovenants.nonCompeteGeographic', label: 'Non-compete geographic scope', type: 'string', required: false, example: 'the State of New York and the United States of America' },
];

async function main() {
  const slug = 'employment-offer-letter';
  const PRODUCT = await prisma.product.findUnique({ where: { slug } });
  if (!PRODUCT) { console.log('Product not found:', slug); return; }
  const TEMPLATE = await prisma.template.findFirst({ where: { productId: PRODUCT.id } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: TEMPLATE.id, isActive: true } });
  const maxVersion = await prisma.templateVersion.findFirst({
    where: { templateId: TEMPLATE.id },
    orderBy: { version: 'desc' },
  });
  const next = (maxVersion?.version ?? 0) + 1;
  const v = await prisma.templateVersion.create({
    data: {
      templateId: TEMPLATE.id, version: next, isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: 'PDF', inputSchemaJson: {},
      placeholderLegend: { version: 1, items: LEGEND },
      bodyTemplate: BODY, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });
  if (existing) await prisma.templateVersion.update({ where: { id: existing.id }, data: { isActive: false } });
  console.log('[OK] employment-offer-letter (US) v' + next + ' — ' + v.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());