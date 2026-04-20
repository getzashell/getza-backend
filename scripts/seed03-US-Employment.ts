import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

const US_EMPLOYMENT = `EMPLOYMENT AGREEMENT

Title: Employment Agreement
Version: 1
Jurisdiction: United States of America — [{{jurisdiction.stateName}}]

THIS AGREEMENT ("Agreement") is entered into as of [{{dates.effectiveDate}}] ("Effective Date"), by and between:

[{{party.employer.name}}], a [{{party.employer.legalEntityType}}] organised and existing under the laws of [{{party.employer.stateOfIncorporation}}], with its principal place of business at [{{party.employer.businessAddress}}] ("Employer"); and

[{{party.employee.name}}], an individual residing at [{{party.employee.homeAddress}}] ("Employee").

(collectively referred to as the "Parties")

RECITALS

WHEREAS, Employer desires to employ Employee, and Employee desires to be employed by Employer, in the position and capacity set forth herein; and

WHEREAS, the Parties wish to set forth the terms and conditions of such employment;

NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. EMPLOYMENT AND POSITION

1.1 Employer hereby employs Employee, and Employee hereby accepts employment with Employer, upon the terms and subject to the conditions set forth in this Agreement.

1.2 Employee shall serve in the position of [{{role.jobTitle}}], within the [{{role.department}}] department, reporting to [{{role.reportsTo}}]. Employee shall perform such duties and responsibilities as are customary to such position and as may be reasonably assigned by Employer from time to time.

1.3 Employee's principal place of employment shall be [{{role.workLocation}}], subject to such travel as Employer may reasonably require in connection with the performance of Employee's duties hereunder.

1.4 Employee acknowledges that the Employee's position is [{{role.exemptStatus}}] for purposes of the federal Fair Labor Standards Act and applicable state law, and that Employee [{{role.flsaStatus}}] eligible for overtime compensation under applicable federal and state law.

2. TERM OF EMPLOYMENT

2.1 This Agreement shall be effective as of the Effective Date and shall continue in full force and effect until terminated in accordance with the provisions of this Agreement.

2.2 The Employee's employment with Employer is at-will. Nothing in this Agreement shall be construed to create a definite term of employment or to restrict either Party's right to terminate the employment relationship at any time, with or without cause or notice, subject to the provisions of this Agreement.

2.3 Notwithstanding the foregoing, nothing in this Agreement shall be construed to limit Employer's right to terminate Employee's employment for Cause (as defined herein) at any time, without notice or pay in lieu of notice.

3. COMPENSATION

3.1 Base Salary. Employer shall pay to Employee an annual base salary of USD [{{compensation.annualSalary}}], less deductions required by applicable law and authorised withholdings, payable in accordance with Employer's standard payroll practices.

3.2 Performance Review. Employee's compensation shall be reviewed by Employer at least annually. Any adjustment to Employee's base salary shall be in Employer's sole and absolute discretion.

3.3 Bonus. Employee may be eligible for a discretionary annual performance bonus of up to [{{compensation.bonusPercentage}}]% of Employee's then-current base salary, based upon individual performance and the financial performance of Employer, as determined by Employer in its sole discretion.

3.4 Equity Compensation. [{{compensation.equityDetails}}]

3.5 Withholding. All compensation payable to Employee shall be less all applicable federal, state, and local taxes, Social Security and Medicare contributions, and any other deductions authorised by Employee or required by applicable law.

4. EMPLOYEE BENEFITS

4.1 Benefits. Employee shall be entitled to participate in all employee benefit plans and programs generally available to employees of Employer in comparable positions, subject to the terms and conditions of such plans as in effect from time to time. Current benefit programs include: [{{benefits.benefitDetails}}].

4.2 Vacation. Employee shall accrue [{{benefits.vacationDays}}] days of paid vacation leave per annum in accordance with Employer's vacation accrual policy.

4.3 Health Insurance. Employer [{{benefits.healthInsuranceProvided}}] provide health insurance coverage to Employee [{{benefits.healthInsuranceDetails}}].

4.4 Retirement. Employee shall be eligible to participate in Employer's [{{benefits.retirementPlanName}}] retirement plan, with Employer contributing [{{benefits.employerContribution}}]% of Employee's eligible compensation.

5. BUSINESS EXPENSES

5.1 Employer shall reimburse Employee for all reasonable, ordinary, and necessary business expenses incurred in the performance of Employee's duties, subject to submission of receipts and compliance with Employer's expense reimbursement policies.

6. CONFIDENTIALITY AND NON-DISCLOSURE

6.1 Acknowledgement. Employee acknowledges that, in the course of Employee's employment, Employee will have access to and become acquainted with Confidential Information belonging to Employer. Employee agrees to hold all such Confidential Information in strict confidence.

6.2 Definition. "Confidential Information" means all non-public information, whether written, oral, electronic, or visual, relating to Employer's business, operations, financial affairs, customers, clients, suppliers, contractors, employees, or prospective business activities, including without limitation: trade secrets, inventions, ideas, processes, formulae, source and object codes, data, programs, know-how, improvements, designs, drawings, and works of authorship; customer lists and contact information; pricing, discount, and cost information; business plans, strategies, and forecasts; financial data and projections; and any other information designated by Employer as confidential or that reasonably should be understood to be confidential given the nature of the information.

6.3 Exclusions. Confidential Information does not include information that: (a) is or becomes generally available to the public through no act or omission of Employee; (b) was known to Employee prior to disclosure by Employer without restriction on disclosure; (c) is received by Employee from a third party without breach of any confidentiality obligation; or (d) is independently developed by Employee without use of or reference to Employer's Confidential Information.

6.4 Obligations. Employee shall not, during or after the termination of employment: (a) use any Confidential Information for any purpose other than the performance of Employee's duties; (b) disclose any Confidential Information to any third party without Employer's prior written consent; or (c) remove, copy, or retain any Confidential Information from Employer's premises except as required in the performance of Employee's duties. Employee shall promptly return all Confidential Information and all copies thereof upon termination of employment.

7. INTELLECTUAL PROPERTY

7.1 Assignment. All Work Product created, conceived, developed, or reduced to practice by Employee, whether alone or with others, within the scope of Employee's employment, or using Employer's resources, facilities, or equipment, or relating to any current or prospective business of Employer, shall be the sole and exclusive property of Employer. Employee hereby assigns to Employer all right, title, and interest in and to such Work Product, including all patent rights, copyrights, trade secret rights, trademark rights, and all other intellectual property rights throughout the world.

7.2 Definition. "Work Product" means all inventions, innovations, improvements, developments, methods, designs, analyses, drawings, reports, creative works, and other intellectual property.

7.3 Further Assurances. Employee shall execute and deliver such documents and take such actions as Employer may reasonably request to perfect, register, or enforce Employer's ownership of Work Product, at Employer's expense.

7.4 No Challenge. Employee shall not challenge, or assist any third party in challenging, the validity or ownership of any intellectual property rights owned by Employer.

8. NON-SOLICITATION AND NON-COMPETITION

8.1 Non-Solicitation of Employees. For a period of [{{restrictions.nonSolicitEmployeesMonths}}] months following the termination of Employee's employment for any reason, Employee shall not, directly or indirectly: (a) solicit or encourage any employee of Employer to leave Employer's employ; or (b) hire, or assist any third party in hiring, any employee of Employer.

8.2 Non-Solicitation of Clients. For a period of [{{restrictions.nonSolicitClientsMonths}}] months following termination, Employee shall not, directly or indirectly: (a) solicit or attempt to solicit the business of any client or customer of Employer with whom Employee had material contact during the [{{restrictions.clientContactWindowMonths}}] months preceding termination; or (b) interfere with any contractual relationship between Employer and any client or customer.

8.3 Non-Competition. [{{restrictions.nonCompeteClause}}] For a period of [{{restrictions.nonCompeteMonths}}] months following termination, Employee shall not, directly or indirectly, engage in, or hold any interest in, any business that competes directly with the Business within the geographic area of [{{restrictions.geographicScope}}]. "Business" means [{{restrictions.competingBusinessDescription}}].

8.4 Acknowledgement. Employee acknowledges that the restrictions contained in this Clause 8 are reasonable and necessary to protect the legitimate business interests of Employer and that any breach thereof would cause irreparable harm for which monetary damages would be an inadequate remedy.

9. REPRESENTATIONS AND WARRANTIES

9.1 Employee represents and warrants to Employer that: (a) Employee has the legal capacity to enter into this Agreement; (b) no agreement, arrangement, or understanding to which Employee is a party prevents Employee from entering into this Agreement or performing Employee's obligations hereunder; (c) all information provided by Employee to Employer in connection with this Agreement is true and accurate in all material respects; and (d) Employee is not bound by any restrictive covenant that would materially interfere with Employee's ability to perform Employee's duties under this Agreement.

10. TERMINATION

10.1 At-Will Termination by Employer. Employer may terminate Employee's employment at any time, with or without Cause, by providing Employee with [{{termination.employerNoticePeriod}}] written notice. Employer may, at its election, pay Employee base salary in lieu of such notice.

10.2 At-Will Termination by Employee. Employee may resign from employment at any time by providing Employer with [{{termination.employeeNoticePeriod}}] written notice. Employer's obligation to Employee upon such resignation shall be limited to payment of all accrued and unpaid compensation and benefits through the effective date of resignation.

10.3 Termination for Cause. Employer may terminate Employee's employment immediately for Cause without any liability for notice or pay in lieu of notice. "Cause" means: (a) material breach of this Agreement or any policy of Employer; (b) gross misconduct or gross negligence in the performance of Employee's duties; (c) conviction of, or a plea of nolo contendere to, any felony or any crime involving moral turpitude; (d) material dishonesty or fraud; (e) wilful conduct that causes reputational harm to Employer; or (f) violation of applicable law in the performance of Employee's duties.

10.4 Effect of Termination. Upon any termination of employment: (a) Employee shall immediately return all property belonging to Employer; (b) all obligations of Employer to Employee (other than obligations that expressly survive termination) shall cease; and (c) Employee shall promptly return all Confidential Information and Employer property.

10.5 Accrued Rights. Upon termination, Employee shall be entitled to all accrued but unpaid base salary through the date of termination, reimbursement of any unreimbursed business expenses, and such employee benefits as are expressly provided under applicable law or the terms of any benefit plan.

11. GENERAL PROVISIONS

11.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{jurisdiction.stateName}}], without regard to its conflict of laws principles.

11.2 Dispute Resolution. Any dispute arising out of or relating to this Agreement or Employee's employment shall be resolved by [{{jurisdiction.disputeResolution}}]. [{{jurisdiction.arbitrationClause}}]

11.3 Entire Agreement. This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements, understandings, and representations, whether written or oral, relating to the subject matter hereof.

11.4 Amendment. This Agreement may not be amended, modified, or supplemented except by a written instrument signed by both Parties.

11.5 Waiver. No waiver by either Party of any breach of this Agreement shall constitute a waiver of any other or subsequent breach.

11.6 Severability. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it enforceable.

11.7 Assignment. Employee may not assign any rights or obligations under this Agreement without the prior written consent of Employer. Employer may assign this Agreement to any successor or affiliate.

11.8 Notices. All notices required or permitted under this Agreement shall be in writing and shall be deemed delivered when delivered personally, or [{{notices.deliveryMethod}}], addressed to the respective Parties.

11.9 Survival. The obligations of confidentiality, intellectual property assignment, non-solicitation, and non-competition shall survive the termination of this Agreement.

11.10 Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one instrument.

11.11 AT-WILL ACKNOWLEDGEMENT. EMPLOYEE ACKNOWLEDGES AND AGREES THAT THE EMPLOYEE'S EMPLOYMENT IS AT-WILL AND THAT THIS AT-WILL RELATIONSHIP MAY BE TERMINATED BY EITHER PARTY AT ANY TIME, WITH OR WITHOUT CAUSE OR ADVANCE NOTICE, SUBJECT ONLY TO THE SPECIFIC TERMINATION PROVISIONS OF THIS AGREEMENT.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

EMPLOYER: [{{party.employer.name}}]

By: _______________________________
Name: [{{signatures.employerSignatoryName}}]
Title: [{{signatures.employerSignatoryTitle}}]
Date: [{{dates.effectiveDate}}]

EMPLOYEE: [{{party.employee.name}}]

Signature: _______________________________
Date: [{{dates.effectiveDate}}]

---
Template document. Not legal advice. Not suitable if: the Employee is employed in a state with specific statutory protections not reflected herein; the Employee is covered by a collective bargaining agreement; the position is exempt from state or federal wage and hour requirements. This template reflects general US practice and must be reviewed by a licensed attorney in the applicable state before use. Jurisdiction: United States of America — [{{jurisdiction.stateName}}].`;

const legendUSEmployment = [
  { path: 'party.employer.name', label: "Employer's legal name", type: 'string', required: true, example: 'Acme Corporation' },
  { path: 'party.employer.legalEntityType', label: "Employer's legal entity type", type: 'string', required: true, example: 'Delaware corporation' },
  { path: 'party.employer.stateOfIncorporation', label: "State of incorporation", type: 'string', required: true, example: 'Delaware' },
  { path: 'party.employer.businessAddress', label: "Employer's principal business address", type: 'text', required: true, example: '350 Fifth Avenue, New York, NY 10118' },
  { path: 'party.employee.name', label: "Employee's full legal name", type: 'string', required: true, example: 'John Michael Roberts' },
  { path: 'party.employee.homeAddress', label: "Employee's home address", type: 'text', required: true, example: '100 Maple Street, Boston, MA 02101' },
  { path: 'role.jobTitle', label: 'Job title', type: 'string', required: true, example: 'Chief Technology Officer' },
  { path: 'role.department', label: 'Department', type: 'string', required: true, example: 'Engineering' },
  { path: 'role.reportsTo', label: 'Reports to (title)', type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'role.workLocation', label: 'Principal work location', type: 'string', required: true, example: 'New York, NY (hybrid)' },
  { path: 'role.exemptStatus', label: 'FLSA exempt status', type: 'enum', required: true, rules: { options: ['exempt', 'non-exempt'] }, example: 'exempt' },
  { path: 'role.flsaStatus', label: 'Overtime eligible', type: 'enum', required: true, rules: { options: ['is', 'is not'] }, example: 'is not' },
  { path: 'compensation.annualSalary', label: 'Annual base salary (USD)', type: 'number', required: true, example: 185000 },
  { path: 'compensation.bonusPercentage', label: 'Max annual bonus %', type: 'number', required: false, example: 20 },
  { path: 'compensation.equityDetails', label: 'Equity compensation details', type: 'text', required: false, example: 'Stock options: 25,000 shares, 4-year vest, 1-year cliff, per 2024 Equity Incentive Plan' },
  { path: 'benefits.vacationDays', label: 'Annual vacation days', type: 'number', required: true, example: 20 },
  { path: 'benefits.benefitDetails', label: 'Other benefit details', type: 'text', required: false, example: 'Life insurance (2x salary), long-term disability, EAP' },
  { path: 'benefits.healthInsuranceProvided', label: 'Health insurance provided', type: 'enum', required: true, rules: { options: ['shall', 'shall not'] }, example: 'shall' },
  { path: 'benefits.healthInsuranceDetails', label: 'Health insurance details', type: 'text', required: false, example: 'Employer pays 80% of premium for employee and dependents' },
  { path: 'benefits.retirementPlanName', label: 'Retirement plan name', type: 'string', required: false, example: '401(k) Savings Plan' },
  { path: 'benefits.employerContribution', label: "Employer contribution %", type: 'number', required: false, example: 4 },
  { path: 'restrictions.nonSolicitEmployeesMonths', label: 'Non-solicitation of employees (months)', type: 'number', required: true, example: 12 },
  { path: 'restrictions.nonSolicitClientsMonths', label: 'Non-solicitation of clients (months)', type: 'number', required: true, example: 12 },
  { path: 'restrictions.clientContactWindowMonths', label: 'Client contact window (months)', type: 'number', required: true, example: 24 },
  { path: 'restrictions.nonCompeteClause', label: 'Non-compete clause text', type: 'text', required: false, example: '8.3 Non-Competition. In consideration of the Employer entering into this Agreement and providing access to Confidential Information and substantial consideration, Employee agrees...' },
  { path: 'restrictions.nonCompeteMonths', label: 'Non-compete period (months)', type: 'number', required: false, example: 6 },
  { path: 'restrictions.geographicScope', label: 'Non-compete geographic scope', type: 'string', required: false, example: 'the State of New York and any other state in which Employer conducts material business' },
  { path: 'restrictions.competingBusinessDescription', label: 'Description of competing business', type: 'text', required: false, example: 'software development, SaaS platform development, or any business substantially similar to Employer' },
  { path: 'termination.employerNoticePeriod', label: 'Employer termination notice period', type: 'string', required: false, example: 'two (2) weeks' },
  { path: 'termination.employeeNoticePeriod', label: 'Employee resignation notice period', type: 'string', required: true, example: 'two (2) weeks' },
  { path: 'jurisdiction.stateName', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'jurisdiction.disputeResolution', label: 'Dispute resolution method', type: 'enum', required: true, rules: { options: ['binding arbitration in accordance with the rules of the American Arbitration Association', 'the state and federal courts located in the State of STATE'] }, example: 'binding arbitration in accordance with the rules of the American Arbitration Association' },
  { path: 'jurisdiction.arbitrationClause', label: 'Arbitration clause text', type: 'text', required: false, example: 'Any controversy or claim arising out of or relating to this Agreement shall be settled by binding arbitration in City, State in accordance with the Commercial Arbitration Rules of the AAA.' },
  { path: 'dates.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-03-01' },
  { path: 'signatures.employerSignatoryName', label: "Employer's signatory name", type: 'string', required: true, example: 'Patricia Ann Whitmore' },
  { path: 'signatures.employerSignatoryTitle', label: "Employer's signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'notices.deliveryMethod', label: 'Notice delivery method', type: 'string', required: false, example: 'by certified mail, return receipt requested, or by nationally recognised overnight courier' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const product = await prisma.product.upsert({
    where: { slug: 'full-time-employment-contract' },
    update: { status: ProductStatus.PUBLISHED },
    create: { slug: 'full-time-employment-contract', title: 'Full-Time Employment Contract', category: 'Employment & HR', type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });

  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction: 'US' } });
  if (!template) {
    template = await prisma.template.create({
      data: { productId: product.id, jurisdiction: 'US', name: 'Full-Time Employment Contract', description: 'Employment agreement for US (at-will) jurisdiction.' },
    });
  }

  const existingActive = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existingActive) { console.log('[SKIP] US variant already has active version'); return; }

  const samplePayload: Record<string, any> = {};
  (legendUSEmployment as any[]).forEach((item: any) => {
    let val = item.example ?? (item.type === 'number' || item.type === 'money' ? 1 : item.type === 'boolean' ? true : 'Example');
    samplePayload[item.path] = val;
  });

  const version = await prisma.templateVersion.create({
    data: {
      version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF,
      inputSchemaJson: {}, placeholderLegend: { version: 1, items: legendUSEmployment } as any,
      bodyTemplate: US_EMPLOYMENT, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });

  const validation = validateTemplateVersion(version, samplePayload);
  if (validation.issues.length) console.warn('Validation:', validation.issues.slice(0, 3));
  console.log('[OK] US Employment Contract — template=' + template.id + ', version=' + version.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
