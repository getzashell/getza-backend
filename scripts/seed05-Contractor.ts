import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';
const prisma = new PrismaClient();

type LegendItem = { path: string; label: string; type: string; required?: boolean; example?: any; rules?: { options?: string[] } };

function buildLegend(items: LegendItem[]): any { return { version: 1, items }; }
function payload(items: LegendItem[]): Record<string, any> {
  const p: Record<string, any> = {};
  items.forEach(i => { p[i.path] = i.example ?? (i.type === 'number' ? 1 : 'Example'); });
  return p;
}

const CONTRACTOR_UK = `INDEPENDENT CONTRACTOR AGREEMENT

Title: Independent Contractor Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

THIS AGREEMENT is made on [{{dates.agreementDate}}]

BETWEEN:

(1) [{{party.client.name}}], a company incorporated in England and Wales with company number [{{party.client.companyNumber}}] and having its registered office at [{{party.client.registeredAddress}}] (the "Client"); and

(2) [{{party.contractor.name}}], a [{{party.contractor.businessStructure}}] carrying on business at [{{party.contractor.businessAddress}}] (the "Contractor").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Client wishes to engage the Contractor to provide the Services (as defined below) and the Contractor has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Background Intellectual Property" means all Intellectual Property owned or controlled by either Party prior to the Effective Date or developed independently of this Agreement;

(b) "Confidential Information" means all information disclosed by one Party to the other, whether in writing, orally, electronically, or otherwise, that is designated as confidential or that would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure, including without limitation: technical data; know-how; business plans; financial information; customer data; pricing; and any analysis or compilation of the foregoing;

(c) "Deliverables" means the deliverables to be produced by the Contractor pursuant to the Statement of Work;

(d) "Effective Date" means [{{terms.effectiveDate}}];

(e) "Foreground Intellectual Property" means all Intellectual Property created, developed, or reduced to practice by the Contractor in the course of performing the Services, whether alone or jointly with any person;

(f) "Intellectual Property" means all patents, rights to inventions, copyright and related rights, trade marks, rights in get-up, business names, domain names, goodwill, rights to sue for passing off, design rights, database rights, and all other intellectual property rights throughout the world, whether registered or unregistered;

(g) "Services" means the services to be provided by the Contractor under this Agreement as described in Schedule 1 and the Statement of Work;

(h) "Statement of Work" means each statement of work in the form attached as Schedule 2, describing the specific services, deliverables, timetable, and fees, entered into by the Parties pursuant to this Agreement;

(i) "Term" means the period specified in Clause 2;

(j) "including" means "including without limitation" and shall be construed accordingly;

(k) references to Clauses and Schedules are to clauses of and schedules to this Agreement.

1.2 The Parties acknowledge that the Contractor is an independent contractor and not an employee, worker, agent, or partner of the Client. Nothing in this Agreement shall be construed as creating a partnership, joint venture, employment relationship, or agency between the Parties.

2. TERM

2.1 This Agreement shall commence on the Effective Date and shall continue until: (a) the expiry of the Initial Term; or (b) earlier termination in accordance with Clause 14.

2.2 If the Client and Contractor have agreed to renew this Agreement, it shall continue for the Renewal Term on the same terms and conditions, terminable by either Party on not less than [{{terms.renewalNoticeDays}}] days' written notice.

3. SERVICES

3.1 The Contractor shall provide the Services to the Client in accordance with: (a) this Agreement; (b) the Statement of Work; and (c) any written instructions issued by the Client from time to time.

3.2 The Contractor shall: (a) perform the Services with reasonable skill and care, in accordance with the highest professional standards applicable to the Contractor's industry; (b) comply with all applicable laws, regulations, and codes of practice relevant to the performance of the Services; (c) not subcontract the Services or any part thereof without the Client's prior written consent; (d) notify the Client promptly of any circumstances that may affect the timely or proper performance of the Services; and (e) provide the Client with regular progress updates as reasonably requested by the Client.

3.3 The Contractor shall have full control over the manner and timing of the performance of the Services, subject to the requirements of the Statement of Work. The Contractor shall not be required to work set hours or at specific locations unless the Statement of Work expressly so provides.

4. FEES AND PAYMENT

4.1 In consideration of the Services, the Client shall pay the Contractor the fees set out in the Statement of Work (the "Fees").

4.2 Unless otherwise specified in the Statement of Work: (a) the Contractor shall invoice the Client [{{payment.invoiceFrequency}}]; (b) each invoice shall be payable within [{{payment.paymentDays}}] days of the date of invoice; (c) all Fees are exclusive of Value Added Tax, which shall be charged at the prevailing rate where applicable.

4.3 If the Client disputes any invoice, the Client shall notify the Contractor within [{{payment.disputeNoticeDays}}] days of receipt, specifying the reasons for the dispute. The Parties shall endeavour to resolve any such dispute promptly and in good faith. Any undisputed amount shall be paid in accordance with Clause 4.2.

4.4 If any sum due under this Agreement is not paid by the due date, the Contractor shall be entitled to charge interest on the outstanding amount at the rate of [{{payment.interestRate}}]% per annum above the Bank of England base rate from time to time, from the due date until payment, whether before or after judgment.

5. EXPENSES

5.1 The Client shall reimburse the Contractor for pre-approved, reasonable, and necessary expenses properly incurred in the performance of the Services, subject to the Contractor's submission of receipts and compliance with the Client's expense policy.

5.2 The Contractor shall not incur expenses exceeding [{{expenses.preApprovalLimit}}] GBP without the Client's prior written approval.

6. BACKGROUND INTELLECTUAL PROPERTY

6.1 Each Party shall retain all rights in and to its Background Intellectual Property. Nothing in this Agreement shall be construed as transferring, assigning, or licensing any Background Intellectual Property from one Party to the other, except as expressly provided herein.

6.2 The Client grants to the Contractor a non-exclusive, revocable, royalty-free licence to use any Client Background Intellectual Property solely to the extent strictly necessary for the performance of the Services during the Term. The Contractor shall use such information only for the purpose of performing its obligations under this Agreement and shall promptly return or destroy (at the Client's election) all copies thereof upon termination.

7. FOREGROUND INTELLECTUAL PROPERTY

7.1 The Parties agree that all Foreground Intellectual Property shall be the sole and exclusive property of the Client. The Contractor hereby assigns to the Client all right, title, and interest in and to the Foreground Intellectual Property, including all intellectual property rights throughout the world, with full title guarantee.

7.2 The Contractor shall execute and deliver such documents and do such acts as the Client may reasonably require to perfect, register, or enforce the Client's ownership of the Foreground Intellectual Property, at the Client's expense.

7.3 The Contractor shall notify the Client promptly upon becoming aware of any actual, threatened, or suspected infringement of any Foreground Intellectual Property.

7.4 To the extent that any Foreground Intellectual Property incorporates any of the Contractor's Background Intellectual Property, the Contractor hereby grants to the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Background Intellectual Property for any purpose connected with the Foreground Intellectual Property.

8. CONFIDENTIALITY

8.1 Each Party (as "Receiving Party") shall:

(a) keep the Confidential Information of the other Party (the "Disclosing Party") in strict confidence and not disclose it to any third party without the Disclosing Party's prior written consent;

(b) use the Confidential Information solely for the purposes of this Agreement;

(c) protect the Confidential Information using at least the same degree of care as the Receiving Party applies to its own confidential information of like kind, and in any event no less than reasonable care;

(d) not copy or reproduce any Confidential Information except as strictly necessary for the purposes of this Agreement;

(e) on termination of this Agreement, return to the Disclosing Party all Confidential Information and all copies, summaries, and derivatives thereof (or certify in writing that all such materials have been destroyed).

8.2 The obligations of confidentiality in this Clause 8 shall not apply to Confidential Information that: (a) is or becomes generally available to the public through no act or omission of the Receiving Party; (b) was known to the Receiving Party prior to disclosure, as evidenced by written records; (c) is received by the Receiving Party from a third party without breach of any confidentiality obligation; or (d) is required to be disclosed by applicable law, provided the Receiving Party gives the Disclosing Party prompt notice (where permitted) and cooperates in seeking confidential treatment.

8.3 The Contractor acknowledges that the Client's Confidential Information may include personal data within the meaning of the UK GDPR and the Data Protection Act 2018, and the Contractor shall process such data only in accordance with the Client's written instructions and applicable data protection legislation.

9. DATA PROTECTION

9.1 Where the Contractor processes personal data on behalf of the Client in connection with the Services, the Contractor shall be a data processor (as defined in the UK GDPR) and the provisions of Schedule 3 shall apply.

9.2 The Contractor shall implement and maintain appropriate technical and organisational measures to ensure a level of security appropriate to the risk presented by the processing of personal data.

10. WARRANTIES

10.1 The Contractor warrants that: (a) the Contractor has the legal capacity and authority to enter into and perform its obligations under this Agreement; (b) the Services will be performed with reasonable skill and care and in accordance with applicable law; (c) no contract, arrangement, or understanding exists that materially interferes with the Contractor's ability to perform the Services; (d) the Services and the Deliverables will not infringe the intellectual property rights of any third party.

10.2 Each Party warrants to the other that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement, when executed, will constitute valid and binding obligations on it.

10.3 Except as expressly provided in this Agreement, all warranties, conditions, and representations, whether express or implied by statute, common law, or otherwise, are excluded to the fullest extent permitted by law.

11. LIABILITY

11.1 Each Party's total aggregate liability to the other under or in connection with this Agreement, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed [{{liability.capLimit}}] GBP.

11.2 Neither Party shall be liable to the other for: (a) indirect, consequential, incidental, special, or exemplary damages; (b) loss of revenue, profits, contracts, business, or anticipated savings; (c) loss of data or goodwill; in each case even if that Party has been advised of the possibility of such loss or damage.

11.3 The limitations in Clause 11.1 shall not apply to: (a) liability for death or personal injury caused by negligence; (b) fraud; (c) breach of the obligations implied by section 2 of the Supply of Goods and Services Act 1982 (title and quiet possession); or (d) any other liability that cannot be limited or excluded by law.

12. INSURANCE

12.1 The Contractor shall maintain at its own cost throughout the Term: (a) professional indemnity insurance with a limit of not less than [{{insurance.professionalIndemnityLimit}}] GBP per claim; (b) public liability insurance with a limit of not less than [{{insurance.publicLiabilityLimit}}] GBP per claim; and (c) [{{insurance.additionalInsurance}}].

12.2 The Contractor shall provide the Client with copies of insurance certificates or other evidence of currency upon the Client's reasonable written request.

13. RESTRICTIONS

[{{restrictions.restrictiveCovenantsText}}]

14. TERMINATION

14.1 Either Party may terminate this Agreement: (a) for material breach of a material term, by giving [{{termination.breachNoticeDays}}] days' written notice to the other Party, provided the breach is not remedied within that period; (b) immediately by written notice if the other Party becomes insolvent, compounds with creditors, or has a receiver or administrator appointed over all or any part of its assets.

14.2 The Client may terminate this Agreement for convenience by giving the Contractor not less than [{{termination.convenienceNoticeDays}}] days' written notice.

14.3 On termination: (a) the Contractor shall promptly deliver all completed and in-progress Deliverables to the Client; (b) the Client shall pay the Contractor all Fees properly due for Services performed up to the date of termination; (c) each Party shall return to the other all Confidential Information; (d) the Contractor shall cease all use of the Client's Background Intellectual Property.

14.4 The following Clauses shall survive termination: Clauses 6 (Background IP), 7 (Foreground IP), 8 (Confidentiality), 9 (Data Protection), 11 (Liability), 15 (General).

15. GENERAL

15.1 Entire Agreement. This Agreement, together with the Schedules and the Statement of Work, constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings relating to the subject matter hereof.

15.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing signed by authorised representatives of both Parties.

15.3 Waiver. No failure or delay by either Party in exercising any right or remedy shall constitute a waiver thereof.

15.4 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

15.5 Assignment. The Contractor may not assign or subcontract any of its rights or obligations under this Agreement without the Client's prior written consent. The Client may assign this Agreement to any successor or group company.

15.6 Notices. All notices shall be in writing and delivered by personal delivery, recorded delivery post, or email to the addresses set out above (or as updated in writing).

15.7 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.

15.8 Dispute Resolution. Any dispute that arises in connection with this Agreement shall first be referred to senior representatives of both Parties for resolution within [{{dispute.escalationDays}}] days of referral.

15.9 No Partnership. Nothing in this Agreement shall be construed as creating a partnership, joint venture, or agency relationship between the Parties.

15.10 Counterparts. This Agreement may be executed in counterparts, each of which shall constitute an original and all of which together shall constitute one instrument. Delivery of an executed counterpart by email or PDF shall be effective as delivery of an original.

IN WITNESS WHEREOF the Parties have executed this Agreement on the date first above written.

EXECUTED by [{{party.client.name}}]
by [{{signatures.clientSignatoryName}}], [{{signatures.clientSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED by [{{party.contractor.name}}]
by [{{signatures.contractorSignatoryName}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SCHEDULE 1 — SERVICES DESCRIPTION
[{{schedules.servicesDescription}}]

SCHEDULE 2 — STATEMENT OF WORK
[{{schedules.statementOfWork}}]

SCHEDULE 3 — DATA PROCESSING TERMS
[{{schedules.dataProcessingTerms}}]

---
Template document. Not legal advice. Not suitable if: the Contractor is in reality an employee or worker (HMRC IR35 / off-payroll working rules apply); the Services involve regulated activities requiring specific licensing; the arrangement is a contract of service rather than a contract for services. This template reflects general UK practice and must be reviewed by a qualified lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const CONTRACTOR_US = `INDEPENDENT CONTRACTOR AGREEMENT

Title: Independent Contractor Agreement
Version: 1
Jurisdiction: United States of America — [{{jurisdiction.stateName}}]

THIS AGREEMENT (the "Agreement") is entered into as of [{{dates.effectiveDate}}] (the "Effective Date")

BETWEEN:

(1) [{{party.client.name}}], a [{{party.client.legalEntityType}}] organised under the laws of [{{party.client.stateOfFormation}}], with its principal place of business at [{{party.client.businessAddress}}] (the "Client"); and

(2) [{{party.contractor.name}}], a [{{party.contractor.entityType}}] organised under the laws of [{{party.contractor.stateOfFormation}}], with its principal place of business at [{{party.contractor.businessAddress}}] (the "Contractor").

(collectively referred to as the "Parties")

RECITALS

WHEREAS, the Client wishes to engage the Contractor to provide the Services (as defined below) and the Contractor has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. DEFINITIONS

1.1 "Background Intellectual Property" means all Intellectual Property owned or controlled by a Party prior to the Effective Date or developed independently of this Agreement.

1.2 "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, whether written, oral, electronic, visual, or otherwise, including without limitation: technical data; trade secrets; know-how; business plans; financial information; customer data; pricing; and any analysis or compilation thereof.

1.3 "Deliverables" means the deliverables to be produced by the Contractor pursuant to the applicable Statement of Work.

1.4 "Foreground Intellectual Property" means all Intellectual Property created, developed, or reduced to practice by the Contractor in the performance of the Services.

1.5 "Intellectual Property" means all patents, trade secrets, copyrights, trade marks, design rights, database rights, and all other intellectual property rights throughout the world, whether registered or unregistered.

1.6 "Services" means the services described in Schedule 1 and the applicable Statement of Work.

1.7 "Statement of Work" means each statement of work in the form of Schedule 2, entered into by the Parties pursuant to this Agreement.

1.8 "Taxes" means all federal, state, and local taxes, levies, assessments, and other charges, excluding only taxes based on the Client's net income.

2. INDEPENDENT CONTRACTOR STATUS

2.1 The Contractor is an independent contractor. Nothing in this Agreement shall be construed as creating an employment, partnership, joint venture, or agency relationship between the Parties.

2.2 The Contractor shall not be entitled to participate in any employee benefit plan,Workers' compensation insurance, unemployment compensation, or any other benefit available to the Client's employees.

2.3 The Contractor shall be solely responsible for: (a) all Taxes applicable to the Contractor's compensation; (b) maintaining adequate health and disability insurance; (c) contributing to Social Security and Medicare taxes where applicable (self-employment tax); and (d) any other obligations imposed on self-employed persons under applicable federal, state, and local law.

2.4 The Contractor acknowledges that the Client will not withhold any amount for taxes from payments to the Contractor. The Contractor agrees to indemnify and hold harmless the Client from any liability for taxes, penalties, or interest arising from the Contractor's failure to pay taxes when due.

3. SERVICES

3.1 The Contractor shall provide the Services in accordance with: (a) this Agreement; (b) the applicable Statement of Work; and (c) any written instructions issued by the Client.

3.2 The Contractor shall: (a) perform the Services with reasonable skill and care consistent with industry standards; (b) comply with all applicable federal, state, and local laws and regulations; (c) not subcontract the Services or any portion thereof without the Client's prior written consent; and (d) promptly notify the Client of any circumstances that may affect the performance of the Services.

3.3 The Contractor shall have discretion over the manner and timing of the performance of the Services, subject to the requirements of the applicable Statement of Work. The Client shall not supervise or direct the Contractor with respect to the details of the Contractor's work.

4. COMPENSATION

4.1 The Client shall pay the Contractor the fees specified in the applicable Statement of Work (the "Fees").

4.2 Unless otherwise specified in the Statement of Work: (a) the Contractor shall invoice the Client monthly; (b) each invoice shall be payable within [{{payment.paymentDays}}] days of receipt; (c) all Fees are exclusive of any applicable Sales Tax, Use Tax, or similar taxes, which shall be added to the invoice at the prevailing rate.

4.3 If the Client disputes any invoice, the Client shall notify the Contractor within [{{payment.disputeNoticeDays}}] days, specifying the reasons. The Parties shall resolve any undisputed amount in good faith.

4.4 Late Payments. Any amount not paid when due shall bear interest at the rate of [{{payment.interestRate}}]% per month (or the maximum rate permitted by applicable law, whichever is less), from the due date until paid.

5. EXPENSES

5.1 The Client shall reimburse the Contractor for pre-approved, reasonable, and necessary expenses incurred in connection with the Services, subject to submission of receipts.

5.2 The Contractor shall obtain the Client's prior written approval before incurring any single expense exceeding USD [{{expenses.preApprovalLimit}}].

6. INTELLECTUAL PROPERTY

6.1 Background Intellectual Property. Each Party retains all rights in its Background Intellectual Property. No licence or right is granted by one Party to the other Party's Background Intellectual Property except as expressly stated in this Agreement.

6.2 Work Made for Hire. To the maximum extent permitted by applicable law, all Foreground Intellectual Property shall be considered "work made for hire" for the Client within the meaning of the United States Copyright Act. To the extent any Foreground Intellectual Property does not qualify as work made for hire, the Contractor hereby assigns to the Client all right, title, and interest in and to such Foreground Intellectual Property, including all copyrights, patents, trade secrets, and other intellectual property rights throughout the world.

6.3 Further Assurances. The Contractor shall execute and deliver such documents as the Client may reasonably request to perfect, register, or enforce the Client's ownership of the Foreground Intellectual Property.

6.4 Contractor Background IP. To the extent any Foreground Intellectual Property incorporates the Contractor's Background Intellectual Property, the Contractor hereby grants to the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Background Intellectual Property for any purpose related to the Foreground Intellectual Property.

6.5 No Challenge. The Contractor shall not challenge, or assist any third party in challenging, the validity or ownership of any Intellectual Property owned by the Client.

7. CONFIDENTIALITY

7.1 Each Party shall:

(a) hold the Confidential Information of the other Party in strict confidence;

(b) not disclose Confidential Information to any third party without the other Party's prior written consent;

(c) use Confidential Information solely for the purposes of this Agreement;

(d) protect Confidential Information with at least the same degree of care applied to its own confidential information, but in no event less than reasonable care;

(e) on termination of this Agreement, return or destroy all Confidential Information (at the other Party's election) and certify in writing such return or destruction.

7.2 Exclusions. The obligations of confidentiality shall not apply to information that: (a) is or becomes generally available to the public through no act of the Receiving Party; (b) was known to the Receiving Party prior to disclosure; (c) is received from a third party without breach of any confidentiality obligation; (d) is required to be disclosed by applicable law, provided the Receiving Party gives prompt notice (where permitted) and cooperates in seeking confidential treatment.

8. REPRESENTATIONS AND WARRANTIES

8.1 Each Party represents and warrants that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes valid and binding obligations; (c) the execution and performance of this Agreement will not breach any other agreement to which it is a party.

8.2 The Contractor represents and warrants that: (a) the Services and Deliverables will not infringe the intellectual property rights of any third party; (b) no contract or arrangement exists that materially interferes with the Contractor's ability to perform the Services; (c) the Contractor has the necessary skills, qualifications, and resources to perform the Services; (d) the Contractor will comply with all applicable laws and regulations.

8.3 EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, ALL INTELLECTUAL PROPERTY, WARRANTIES, REPRESENTATIONS, AND CONDITIONS, WHETHER EXPRESS OR IMPLIED BY STATUTE, COMMON LAW, OR OTHERWISE, ARE DISCLAIMED TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

9. LIMITATION OF LIABILITY

9.1 EXCEPT FOR LIABILITY FOR: (a) DEATH OR PERSONAL INJURY CAUSED BY NEGLIGENCE; (b) FRAUD; (c) BREACH OF THE OBLIGATIONS IMPLIED BY APPLICABLE LAW (TITLE AND QUIET POSSESSION); OR (d) ANY OTHER LIABILITY THAT CANNOT BE LIMITED OR EXCLUDED BY APPLICABLE LAW:

  (i) NEITHER PARTY SHALL BE LIABLE TO THE OTHER FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, OR LOST DATA, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES;

  (ii) EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER OR IN CONNECTION WITH THIS AGREEMENT SHALL NOT EXCEED USD [{{liability.capLimit}}].

9.2 The limitations in this Clause 9 shall apply regardless of the form of action, whether in contract, tort (including negligence), strict liability, or otherwise.

10. INDEMNIFICATION

10.1 Contractor Indemnification. The Contractor shall indemnify, defend, and hold harmless the Client and its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) the Contractor's breach of any representation, warranty, or obligation under this Agreement; (b) the Contractor's performance of the Services; (c) any claim that the Services or Deliverables infringe the intellectual property rights of a third party; (d) the Contractor's failure to pay taxes when due; (e) any act or omission of the Contractor in connection with this Agreement.

10.2 Client Indemnification. The Client shall indemnify, defend, and hold harmless the Contractor from and against any and all claims, damages, losses, costs, and expenses arising out of or relating to the Client's breach of this Agreement or the Client's negligence or wilful misconduct.

11. INSURANCE

11.1 The Contractor shall maintain throughout the Term: (a) commercial general liability insurance with limits of not less than USD [{{insurance.generalLiabilityLimit}}] per occurrence; (b) professional liability (errors and omissions) insurance with limits of not less than USD [{{insurance.professionalLiabilityLimit}}] per claim; (c) workers' compensation insurance as required by applicable law.

11.2 Upon request, the Contractor shall provide the Client with certificates of insurance evidencing the required coverage.

12. TERMINATION

12.1 Termination for Breach. Either Party may terminate this Agreement immediately upon written notice if the other Party materially breaches any provision and fails to cure such breach within [{{termination.breachCureDays}}] days after receipt of written notice specifying the breach.

12.2 Termination for Insolvency. Either Party may terminate this Agreement immediately upon written notice if the other Party becomes insolvent, files for bankruptcy, or has a receiver or trustee appointed over all or substantially all of its assets.

12.3 Termination for Convenience. The Client may terminate this Agreement for convenience upon [{{termination.convenienceNoticeDays}}] days' prior written notice to the Contractor.

12.4 Effect of Termination. Upon termination: (a) the Contractor shall deliver to the Client all completed and in-progress Deliverables; (b) the Client shall pay the Contractor all Fees properly due for Services performed through the date of termination; (c) each Party shall return or destroy the other Party's Confidential Information; (d) all licences granted by one Party to the other (other than licences of Foreground Intellectual Property assigned to the Client) shall terminate.

12.5 Surviving Obligations. The following provisions shall survive termination: Clauses 6 (IP), 7 (Confidentiality), 9 (Limitation of Liability), 10 (Indemnification), 13 (General).

13. GENERAL

13.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{jurisdiction.stateName}}], without regard to conflict of laws principles.

13.2 Dispute Resolution. [{{jurisdiction.disputeResolution}}]

13.3 Entire Agreement. This Agreement, together with the Schedules, constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings.

13.4 Amendment. This Agreement may not be amended except by a written instrument signed by authorised representatives of both Parties.

13.5 Waiver. No waiver by either Party of any breach shall constitute a waiver of any other or subsequent breach.

13.6 Severability. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

13.7 Assignment. The Contractor may not assign or transfer this Agreement without the Client's prior written consent. The Client may assign this Agreement to a successor in connection with a merger, acquisition, or sale of substantially all of its assets.

13.8 Notices. All notices shall be in writing and delivered by personal delivery, nationally recognised overnight courier, or email with confirmed receipt.

13.9 Counterparts. This Agreement may be executed in counterparts, each of which shall constitute an original and all of which together shall constitute one instrument.

13.10 No Third-Party Beneficiaries. This Agreement is for the sole benefit of the Parties and their respective successors and permitted assigns.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

[{{party.client.name}}]

By: _______________________________
Name: [{{signatures.clientSignatoryName}}]
Title: [{{signatures.clientSignatoryTitle}}]
Date: [{{dates.effectiveDate}}]

[{{party.contractor.name}}]

By: _______________________________
Name: [{{signatures.contractorSignatoryName}}]
Title: [{{signatures.contractorSignatoryTitle}}]
Date: [{{dates.effectiveDate}}]

SCHEDULE 1 — SERVICES DESCRIPTION
[{{schedules.servicesDescription}}]

SCHEDULE 2 — STATEMENT OF WORK
[{{schedules.statementOfWork}}]

---
Template document. Not legal advice. Not suitable if: the Contractor is a US employee misclassified as an independent contractor (applicable IRS factors, state ABC tests, and FLSA regulations must be considered); the arrangement is subject to the federal Worker Adjustment and Retraining Notification Act (WARN Act); the Contractor provides services in a regulated industry requiring specific licensing. Consult a qualified employment or business attorney in the applicable state before use. Jurisdiction: United States of America — [{{jurisdiction.stateName}}].`;

const CONTRACTOR_EU = `INDEPENDENT CONTRACTOR AGREEMENT

Title: Independent Contractor Agreement
Version: 1
Jurisdiction: European Union — [{{jurisdiction.country}}]

THIS AGREEMENT is made on [{{dates.agreementDate}}]

BETWEEN:

(1) [{{party.client.name}}], a [{{party.client.legalEntityType}}] incorporated and operating under the laws of [{{party.client.countryOfIncorporation}}], with its registered office at [{{party.client.registeredAddress}}] (the "Client"); and

(2) [{{party.contractor.name}}], a [{{party.contractor.entityType}}] incorporated and operating under the laws of [{{party.contractor.countryOfIncorporation}}], with its registered office at [{{party.contractor.businessAddress}}] (the "Contractor").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Client wishes to engage the Contractor to provide the Services and the Contractor has agreed to provide the Services on the terms and subject to the conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Background Intellectual Property" means all Intellectual Property owned or controlled by either Party prior to the Effective Date or developed independently of this Agreement;

(b) "Confidential Information" means all non-public information, in any form, disclosed by one Party to the other in connection with this Agreement that is designated as confidential or would reasonably be understood to be confidential, including without limitation: trade secrets; technical data; know-how; business plans; financial information; customer data; pricing; and any analysis or compilation thereof;

(c) "Deliverables" means the deliverables to be produced by the Contractor pursuant to the applicable Statement of Work;

(d) "Effective Date" means [{{terms.effectiveDate}}];

(e) "EU Processing Legislation" means the General Data Protection Regulation (EU) 2016/679 ("GDPR") and any applicable national data protection legislation of the relevant EU Member State;

(f) "Foreground Intellectual Property" means all Intellectual Property created, developed, or reduced to practice by the Contractor in the course of performing the Services;

(g) "Intellectual Property" means all patents, rights in inventions, copyright and related rights, trade marks, rights in business names, design rights, database rights, and all other intellectual property rights throughout the world, whether registered or unregistered;

(h) "Services" means the services to be provided by the Contractor as described in Schedule 1 and the applicable Statement of Work;

(i) "Statement of Work" means each statement of work entered into pursuant to this Agreement in the form of Schedule 2.

1.2 References to Clauses and Schedules are to clauses of and schedules to this Agreement. Headings are for convenience only.

2. CONTRACTOR STATUS

2.1 The Contractor is an independent contractor. Nothing in this Agreement shall be construed as creating an employment relationship, partnership, joint venture, or agency between the Parties.

2.2 The Contractor shall be solely responsible for: (a) the Contractor's own taxes, social security contributions, and similar charges; (b) any mandatory insurance required by applicable law; (c) all decisions regarding the manner and timing of the performance of the Services, subject to compliance with the Statement of Work and applicable law.

2.3 The Contractor shall indemnify and hold harmless the Client from any claim brought by any tax authority, social security body, or similar authority in connection with the Contractor's status or the misclassification of the Contractor's status.

3. SERVICES

3.1 The Contractor shall provide the Services in accordance with: (a) this Agreement; (b) the applicable Statement of Work; and (c) any written instructions issued by the Client.

3.2 The Contractor shall: (a) perform the Services with the care, skill, and diligence of a reasonably competent professional in the Contractor's field; (b) comply with all applicable EU and national laws and regulations relevant to the performance of the Services; (c) not subcontract the Services without the Client's prior written consent; (d) promptly notify the Client of any circumstances that may affect the performance of the Services.

3.3 The Contractor shall have discretion over the manner and timing of the performance of the Services, subject to the requirements of the applicable Statement of Work.

4. REMUNERATION

4.1 The Client shall pay the Contractor the fees specified in the applicable Statement of Work (the "Fees").

4.2 Unless otherwise specified in the Statement of Work: (a) the Contractor shall invoice the Client [{{payment.invoiceFrequency}}]; (b) each invoice shall be payable within [{{payment.paymentDays}}] days of the date of invoice; (c) all Fees are exclusive of Value Added Tax or similar tax, which shall be charged at the prevailing rate where applicable.

4.3 Late Payment. Any amount not paid when due shall bear interest at the rate of [{{payment.interestRate}}]% per annum above the European Central Bank main refinancing rate (or the applicable national reference rate), from the due date until payment.

5. EXPENSES

5.1 The Client shall reimburse the Contractor for pre-approved, reasonable, and necessary expenses properly incurred in the performance of the Services, subject to submission of receipts.

5.2 Pre-approval threshold: EUR [{{expenses.preApprovalLimit}}] per item.

6. INTELLECTUAL PROPERTY

6.1 Background Intellectual Property. Each Party retains all rights in its Background Intellectual Property. No licence is granted by one Party to the other Party's Background Intellectual Property except as expressly stated herein.

6.2 Assignment of Foreground IP. All Foreground Intellectual Property shall be the sole and exclusive property of the Client. To the extent permitted by applicable law, the Contractor hereby assigns to the Client all right, title, and interest in and to the Foreground Intellectual Property, including all intellectual property rights throughout the world, with full title guarantee.

6.3 Further Assurances. The Contractor shall execute and deliver such documents as the Client may reasonably require to perfect, register, or enforce the Client's ownership of the Foreground Intellectual Property.

6.4 Contractor Background IP Licence. To the extent any Foreground Intellectual Property incorporates the Contractor's Background Intellectual Property, the Contractor hereby grants to the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use such Background Intellectual Property.

7. CONFIDENTIALITY

7.1 Each Party shall: (a) keep the Confidential Information of the other Party in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the purposes of this Agreement; (d) protect it with at least the same degree of care applied to its own confidential information; (e) on termination, return or destroy all Confidential Information (at the other Party's election).

7.2 Exclusions. The obligations shall not apply to information that: (a) is or becomes generally available to the public through no act of the Receiving Party; (b) was lawfully known to the Receiving Party prior to disclosure; (c) is received from a third party without confidentiality obligations; (d) is required to be disclosed by applicable law, provided notice is given where permitted.

8. DATA PROTECTION

8.1 Where the Contractor processes personal data on behalf of the Client, the Contractor shall be a data processor within the meaning of the EU Processing Legislation. The Contractor shall process personal data only on documented instructions from the Client.

8.2 The Contractor shall implement appropriate technical and organisational security measures and assist the Client in ensuring compliance with the obligations under the EU Processing Legislation.

8.3 The Contractor shall notify the Client without undue delay after becoming aware of a personal data breach.

9. WARRANTIES

9.1 Each Party warrants that: (a) it has the legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes valid and binding obligations.

9.2 The Contractor warrants that: (a) the Services will be performed with reasonable skill and care; (b) no contract or arrangement exists that materially interferes with the performance of the Services; (c) the Services and Deliverables will not infringe the intellectual property rights of any third party.

9.3 Except as expressly provided herein, all warranties, representations, and conditions are excluded to the fullest extent permitted by applicable law.

10. LIABILITY

10.1 Neither Party shall be liable to the other for indirect, consequential, incidental, or special damages, including loss of profits, loss of revenue, or loss of data, even if advised of the possibility of such damages.

10.2 Each Party's total aggregate liability under this Agreement shall not exceed [{{liability.capLimit}}] EUR.

10.3 The limitations in this Clause 10 shall not apply to: (a) death or personal injury caused by negligence; (b) fraud; (c) breach of obligations implied by mandatory applicable law; or (d) any other liability that cannot be limited by applicable law.

11. INSURANCE

11.1 The Contractor shall maintain throughout the Term: (a) professional indemnity insurance with a limit of not less than [{{insurance.professionalIndemnityLimit}}] EUR per claim; (b) public liability insurance with a limit of not less than [{{insurance.publicLiabilityLimit}}] EUR per claim.

11.2 Upon request, the Contractor shall provide certificates of insurance as evidence of coverage.

12. TERMINATION

12.1 Either Party may terminate this Agreement: (a) for material breach, on [{{termination.breachCureDays}}] days' written notice, provided the breach is not remedied within that period; (b) immediately upon written notice if the other Party becomes insolvent.

12.2 The Client may terminate for convenience upon [{{termination.convenienceNoticeDays}}] days' written notice.

12.3 On termination: (a) the Contractor shall deliver all completed and in-progress Deliverables; (b) the Client shall pay all Fees properly due for Services performed up to the date of termination; (c) each Party shall return the other Party's Confidential Information.

12.4 Clauses 6 (IP), 7 (Confidentiality), 8 (Data Protection), 10 (Liability), 13 (General) shall survive termination.

13. GENERAL

13.1 Entire Agreement. This Agreement, together with the Schedules and Statement of Work, constitutes the entire agreement.

13.2 Amendment. No amendment unless agreed in writing signed by authorised representatives of both Parties.

13.3 Waiver and Severability as standard.

13.4 Assignment. Contractor may not assign without Client's prior written consent. Client may assign to any successor.

13.5 Notices. Written notices delivered by personal delivery, registered post, or confirmed email.

13.6 Governing Law and Jurisdiction. This Agreement shall be governed by the laws of [{{jurisdiction.country}}], and any disputes shall be subject to the exclusive jurisdiction of the courts of [{{jurisdiction.country}}].

13.7 This Agreement shall not be governed by the United Nations Convention on Contracts for the International Sale of Goods.

IN WITNESS WHEREOF the authorised representatives of the Parties have executed this Agreement.

EXECUTED by [{{party.client.name}}]
by [{{signatures.clientSignatoryName}}], [{{signatures.clientSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED by [{{party.contractor.name}}]
by [{{signatures.contractorSignatoryName}}], [{{signatures.contractorSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

SCHEDULE 1 — SERVICES
[{{schedules.servicesDescription}}]

SCHEDULE 2 — STATEMENT OF WORK
[{{schedules.statementOfWork}}]

---
Template document. Not legal advice. Not suitable if: the Contractor is in reality an employee (applicable EU and national employment law tests must be considered); the Services involve regulated activities; the arrangement triggers obligations under the EU Posted Workers Directive or national implementing legislation. Consult a qualified lawyer in the applicable EU Member State before use. Jurisdiction: European Union — [{{jurisdiction.country}}].`;

const LEGEND_CONTRACTOR: LegendItem[] = [
  { path: 'party.client.name', label: "Client's legal name", type: 'string', required: true, example: 'Vantage Consulting Ltd' },
  { path: 'party.client.companyNumber', label: "Client's company number", type: 'string', required: false, example: '11234567' },
  { path: 'party.client.registeredAddress', label: "Client's registered address", type: 'text', required: true, example: '1 Canada Square, London, E14 5AB' },
  { path: 'party.contractor.name', label: "Contractor's legal name", type: 'string', required: true, example: 'Harbour Digital Ltd' },
  { path: 'party.contractor.businessStructure', label: "Contractor's business structure", type: 'string', required: true, example: 'private limited company' },
  { path: 'party.contractor.businessAddress', label: "Contractor's business address", type: 'text', required: true, example: 'Unit 4, 12 Sovereign Park, Manchester, M14 6TD' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-04-01' },
  { path: 'terms.renewalNoticeDays', label: 'Renewal notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'payment.invoiceFrequency', label: 'Invoice frequency', type: 'enum', required: true, rules: { options: ['monthly in arrears', 'quarterly in arrears', 'upon completion of each milestone', 'in advance'] }, example: 'monthly in arrears' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.disputeNoticeDays', label: 'Invoice dispute notice period (days)', type: 'number', required: false, example: 10 },
  { path: 'payment.interestRate', label: 'Late payment interest rate (%)', type: 'number', required: false, example: 4 },
  { path: 'expenses.preApprovalLimit', label: 'Expense pre-approval limit (GBP/EUR/USD)', type: 'number', required: true, example: 500 },
  { path: 'liability.capLimit', label: 'Liability cap (GBP/EUR/USD)', type: 'number', required: true, example: 250000 },
  { path: 'insurance.professionalIndemnityLimit', label: 'PI insurance limit (GBP/EUR/USD)', type: 'number', required: true, example: 1000000 },
  { path: 'insurance.publicLiabilityLimit', label: 'Public liability limit (GBP/EUR/USD)', type: 'number', required: true, example: 500000 },
  { path: 'insurance.additionalInsurance', label: 'Additional insurance requirements', type: 'text', required: false, example: 'cyber liability insurance with a limit of GBP 500,000 per claim' },
  { path: 'restrictions.restrictiveCovenantsText', label: 'Restrictive covenants (if applicable)', type: 'text', required: false, example: 'The Contractor acknowledges that, given the nature of the Services, no restrictive covenants are imposed on the Contractor at this time.' },
  { path: 'termination.breachNoticeDays', label: 'Breach cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'termination.convenienceNoticeDays', label: 'Termination for convenience notice (days)', type: 'number', required: true, example: 30 },
  { path: 'dispute.escalationDays', label: 'Senior escalation dispute period (days)', type: 'number', required: false, example: 14 },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Catherine Anne Brooks' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.contractorSignatoryName', label: "Contractor signatory name", type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.contractorSignatoryTitle', label: "Contractor signatory title", type: 'string', required: false, example: 'Director' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-04-01' },
  { path: 'schedules.servicesDescription', label: 'Services description', type: 'text', required: true, example: 'The Contractor shall provide the following services: business process analysis and optimisation; software development and integration; project management and reporting. The Contractor shall deliver all work in accordance with the specifications agreed in the Statement of Work.' },
  { path: 'schedules.statementOfWork', label: 'Statement of Work template', type: 'text', required: false, example: 'Project: [Project Name] — Deliverables: [List of deliverables] — Timetable: [Start and end dates] — Fees: [Amount and payment schedule]' },
  { path: 'schedules.dataProcessingTerms', label: 'Data processing terms (GDPR)', type: 'text', required: false, example: 'The Contractor (as data processor) shall: process personal data only on documented instructions from the Client; ensure confidentiality of persons authorised to process personal data; implement appropriate security measures; not engage another processor without the Client\'s prior written authorisation; assist the Client in ensuring compliance with Articles 32-36 GDPR; delete or return all personal data upon termination; make available all information necessary to demonstrate compliance.' },
];

const LEGEND_US: LegendItem[] = [
  { path: 'party.client.name', label: "Client's legal name", type: 'string', required: true, example: 'Vantage Consulting LLC' },
  { path: 'party.client.legalEntityType', label: "Client's entity type", type: 'string', required: true, example: 'limited liability company' },
  { path: 'party.client.stateOfFormation', label: "Client's state of formation", type: 'string', required: true, example: 'Delaware' },
  { path: 'party.client.businessAddress', label: "Client's business address", type: 'text', required: true, example: '200 Park Avenue, New York, NY 10166' },
  { path: 'party.contractor.name', label: "Contractor's legal name", type: 'string', required: true, example: 'Harbour Digital LLC' },
  { path: 'party.contractor.entityType', label: "Contractor's entity type", type: 'string', required: true, example: 'limited liability company' },
  { path: 'party.contractor.stateOfFormation', label: "Contractor's state of formation", type: 'string', required: false, example: 'New York' },
  { path: 'party.contractor.businessAddress', label: "Contractor's business address", type: 'text', required: true, example: '55 Hudson Yards, New York, NY 10001' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.disputeNoticeDays', label: 'Invoice dispute notice period (days)', type: 'number', required: false, example: 10 },
  { path: 'payment.interestRate', label: 'Monthly late payment interest rate (%)', type: 'number', required: false, example: 1.5 },
  { path: 'expenses.preApprovalLimit', label: 'Expense pre-approval limit (USD)', type: 'number', required: true, example: 500 },
  { path: 'liability.capLimit', label: 'Liability cap (USD)', type: 'number', required: true, example: 250000 },
  { path: 'insurance.generalLiabilityLimit', label: 'General liability limit (USD)', type: 'number', required: true, example: 1000000 },
  { path: 'insurance.professionalLiabilityLimit', label: 'Professional liability limit (USD)', type: 'number', required: true, example: 1000000 },
  { path: 'termination.breachCureDays', label: 'Breach cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'termination.convenienceNoticeDays', label: 'Termination for convenience notice (days)', type: 'number', required: true, example: 30 },
  { path: 'jurisdiction.stateName', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'jurisdiction.disputeResolution', label: 'Dispute resolution', type: 'enum', required: true, rules: { options: ['binding arbitration in accordance with the rules of the American Arbitration Association in New York, New York', 'the state and federal courts located in New York County, New York'] }, example: 'the state and federal courts located in New York County, New York' },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Catherine Anne Brooks' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.contractorSignatoryName', label: "Contractor signatory name", type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.contractorSignatoryTitle', label: "Contractor signatory title", type: 'string', required: false, example: 'Managing Member' },
  { path: 'dates.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-04-01' },
  { path: 'schedules.servicesDescription', label: 'Services description', type: 'text', required: true, example: 'The Contractor shall provide the following services: business process analysis and optimisation; software development and integration; project management and reporting. The Contractor shall deliver all work in accordance with the specifications agreed in the Statement of Work.' },
  { path: 'schedules.statementOfWork', label: 'Statement of Work template', type: 'text', required: false, example: 'Project: [Project Name] — Deliverables: [List of deliverables] — Timetable: [Start and end dates] — Fees: [Amount and payment schedule]' },
];

const LEGEND_EU: LegendItem[] = [
  { path: 'party.client.name', label: "Client's legal name", type: 'string', required: true, example: 'Vantage Consulting GmbH' },
  { path: 'party.client.legalEntityType', label: "Client's entity type", type: 'string', required: true, example: 'Gesellschaft mit beschränkter Haftung (GmbH)' },
  { path: 'party.client.countryOfIncorporation', label: "Client's country of incorporation", type: 'string', required: true, example: 'Germany' },
  { path: 'party.client.registeredAddress', label: "Client's registered address", type: 'text', required: true, example: 'Friedrichstraße 85, 10117 Berlin, Germany' },
  { path: 'party.contractor.name', label: "Contractor's legal name", type: 'string', required: true, example: 'Harbour Digital OU' },
  { path: 'party.contractor.entityType', label: "Contractor's entity type", type: 'string', required: true, example: 'OÜ (private limited company)' },
  { path: 'party.contractor.countryOfIncorporation', label: "Contractor's country of incorporation", type: 'string', required: true, example: 'Estonia' },
  { path: 'party.contractor.businessAddress', label: "Contractor's business address", type: 'text', required: true, example: 'Valukoja 8, 11415 Tallinn, Estonia' },
  { path: 'terms.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-04-01' },
  { path: 'payment.invoiceFrequency', label: 'Invoice frequency', type: 'enum', required: true, rules: { options: ['monthly in arrears', 'quarterly in arrears', 'upon completion of each milestone'] }, example: 'monthly in arrears' },
  { path: 'payment.paymentDays', label: 'Payment term (days)', type: 'number', required: true, example: 30 },
  { path: 'payment.interestRate', label: 'Late payment interest rate (%)', type: 'number', required: false, example: 8 },
  { path: 'expenses.preApprovalLimit', label: 'Expense pre-approval limit (EUR)', type: 'number', required: true, example: 500 },
  { path: 'liability.capLimit', label: 'Liability cap (EUR)', type: 'number', required: true, example: 250000 },
  { path: 'insurance.professionalIndemnityLimit', label: 'PI insurance limit (EUR)', type: 'number', required: true, example: 1000000 },
  { path: 'insurance.publicLiabilityLimit', label: 'Public liability limit (EUR)', type: 'number', required: true, example: 500000 },
  { path: 'termination.breachCureDays', label: 'Breach cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'termination.convenienceNoticeDays', label: 'Termination for convenience notice (days)', type: 'number', required: true, example: 30 },
  { path: 'jurisdiction.country', label: 'Governing country (EU)', type: 'string', required: true, example: 'Germany' },
  { path: 'signatures.clientSignatoryName', label: "Client signatory name", type: 'string', required: true, example: 'Catherine Anne Brooks' },
  { path: 'signatures.clientSignatoryTitle', label: "Client signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.contractorSignatoryName', label: "Contractor signatory name", type: 'string', required: true, example: 'Daniel James Worthington' },
  { path: 'signatures.contractorSignatoryTitle', label: "Contractor signatory title", type: 'string', required: false, example: 'Managing Director' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-04-01' },
  { path: 'schedules.servicesDescription', label: 'Services description', type: 'text', required: true, example: 'The Contractor shall provide the following services: business process analysis and optimisation; software development and integration; project management and reporting. The Contractor shall deliver all work in accordance with the specifications agreed in the Statement of Work.' },
  { path: 'schedules.statementOfWork', label: 'Statement of Work template', type: 'text', required: false, example: 'Project: [Project Name] — Deliverables: [List of deliverables] — Timetable: [Start and end dates] — Fees: [Amount and payment schedule]' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seedProduct(slug: string, title: string, category: string, jurisdiction: string, label: string, bodyTemplate: string, legend: LegendItem[]) {
  const product = await prisma.product.upsert({
    where: { slug },
    update: { status: ProductStatus.PUBLISHED, title, category },
    create: { slug, title, category, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction } });
  if (!template) {
    template = await prisma.template.create({ data: { productId: product.id, jurisdiction, name: title, description: label } });
  }
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] ' + title + ' (' + jurisdiction + ')'); return; }
  const v = await prisma.templateVersion.create({
    data: {
      version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF,
      inputSchemaJson: {}, placeholderLegend: buildLegend(legend),
      bodyTemplate, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });
  const validation = validateTemplateVersion(v, payload(legend));
  if (validation.issues.length) console.warn('[WARN] ' + jurisdiction + ':', validation.issues[0]);
  console.log('[OK] ' + title + ' (' + jurisdiction + ') — v=' + v.id);
}

async function main() {
  const slug = 'contractor-agreement';
  await seedProduct(slug, 'Contractor Agreement', 'Employment & HR', 'UK', 'United Kingdom (England & Wales)', CONTRACTOR_UK, LEGEND_CONTRACTOR);
  await seedProduct(slug, 'Contractor Agreement', 'Employment & HR', 'US', 'United States of America', CONTRACTOR_US, LEGEND_US);
  await seedProduct(slug, 'Contractor Agreement', 'Employment & HR', 'EU', 'European Union', CONTRACTOR_EU, LEGEND_EU);
}

main().catch(console.error).finally(() => prisma.$disconnect());