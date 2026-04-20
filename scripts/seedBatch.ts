import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DEFINITIONS
// Each product: slug, title, category, description, jurisdictions
// Each jurisdiction: label, bodyTemplate, legend
// ─────────────────────────────────────────────────────────────────────────────

type LegendItem = { path: string; label: string; type: string; required?: boolean; example?: any; description?: string; rules?: { options?: string[] } };

function makePayload(legend: LegendItem[]): Record<string, any> {
  const p: Record<string, any> = {};
  for (const item of legend) {
    let v = item.example;
    if (v === undefined || v === null) {
      if (item.type === 'number' || item.type === 'money') v = 1;
      else if (item.type === 'boolean') v = true;
      else if (item.type === 'date') v = '2025-01-01';
      else v = 'Example';
    }
    p[item.path] = v;
  }
  return p;
}

function buildLegend(items: LegendItem[]): any { return { version: 1, items }; }

// ─── PRODUCT 1: One-Way NDA ──────────────────────────────────────────────────

const ONEWAY_NDA_UK = `NON-DISCLOSURE AGREEMENT (ONE-WAY)

Title: One-Way Non-Disclosure Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

THIS AGREEMENT is made on [{{dates.agreementDate}}] (the "Effective Date")

BETWEEN:

(1) [{{party.discloser.name}}], a company incorporated in England and Wales with registered number [{{party.discloser.companyNumber}}] and having its registered office at [{{party.discloser.registeredAddress}}] (the "Discloser"); and

(2) [{{party.recipient.name}}], [{{party.recipient.entityType}}] [{{party.recipient.registeredNumber}}] whose [registered office/principal place of business] is at [{{party.recipient.address}}] (the "Recipient").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Discloser wishes to disclose to the Recipient certain Confidential Information (as defined below) for the Purpose (as defined below); and

WHEREAS the Recipient has agreed to receive such Confidential Information subject to the terms and conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Confidential Information" means all information, in any form (whether written, oral, electronic, visual, or otherwise), disclosed by the Discloser to the Recipient (whether directly or indirectly) that is designated by the Discloser as confidential or that would reasonably be understood to be confidential having regard to the nature of the information and the circumstances of disclosure, including without limitation: trade secrets; business plans; customer lists; financial information; pricing; technical data; software; inventions; processes; designs; drawings; know-how; and any analysis, compilation, or summary of any of the foregoing;

(b) "Purpose" means [{{purpose.description}}];

(c) "Recipient" includes the Recipient's directors, officers, employees, agents, advisers, and subcontractors who need to know the Confidential Information for the Purpose;

(d) the expression "including" means "including without limitation" and the expression "including without limitation" shall be construed accordingly;

(e) headings are for convenience only and shall not affect the interpretation of this Agreement;

(f) unless the context otherwise requires, references to Clauses are to clauses of this Agreement.

1.2 The Parties acknowledge that the definition of Confidential Information in Clause 1.1(a) is broad and is intended to encompass all information of a confidential nature relating to the Discloser's business, affairs, customers, clients, suppliers, and prospective business activities.

2. OBLIGATIONS OF THE RECIPIENT

2.1 The Recipient hereby undertakes and agrees:

(a) to hold the Confidential Information in strict confidence and not to disclose it to any third party without the prior written consent of the Discloser;

(b) to use the Confidential Information solely for the Purpose and for no other purpose whatsoever;

(c) to protect the Confidential Information using the same degree of care as the Recipient uses to protect its own confidential information of like kind, but in no event less than reasonable care;

(d) to disclose the Confidential Information within the Recipient's organisation only to those employees, agents, advisers, and subcontractors who: (i) have a genuine need to know for the Purpose; (ii) have been informed of the confidential nature of the Confidential Information; and (iii) are bound by confidentiality obligations no less protective than those contained in this Agreement;

(e) not to copy, reproduce, or retain any portion of the Confidential Information except as strictly necessary for the Purpose, and to destroy or return to the Discloser all copies of Confidential Information upon the earlier of: (i) the Discloser's written request; (ii) the Purpose being fulfilled or abandoned; or (iii) the termination of this Agreement;

(f) not to disclose to the Discloser any information that is not Confidential Information without the Discloser's prior written consent.

2.2 The Recipient shall be responsible to the Discloser for any breach of the obligations in this Clause 2 by any person to whom the Recipient has disclosed the Confidential Information, as if such breach were the Recipient's own breach.

3. EXCLUSIONS

3.1 The obligations of the Recipient under Clause 2 shall not apply to any Confidential Information that:

(a) is or becomes generally available to the public through no act or omission of the Recipient or any person to whom the Recipient has disclosed it;

(b) was known to the Recipient prior to disclosure by the Discloser, as evidenced by written records, and was not subject to any obligation of confidentiality at the time of disclosure;

(c) is received by the Recipient from a third party who is lawfully entitled to disclose it and who imposes no obligation of confidentiality on the Recipient in respect of such information;

(d) is independently developed by the Recipient without use of or reference to the Confidential Information, as evidenced by written records; or

(e) is required to be disclosed by applicable law, regulation, court order, or other legal process, provided that the Recipient shall: (i) give the Discloser prompt written notice of such requirement (where permitted by law); (ii) cooperate with the Discloser in seeking confidential treatment of the information; and (iii) disclose only the minimum amount of Confidential Information necessary to comply with the legal requirement.

3.2 Confidential Information shall not cease to be subject to confidentiality obligations under this Agreement merely because it is combined with other information of the Recipient or a third party, whether or not such combination creates an independent creation.

4. NO WARRANTY

4.1 The Discloser makes no representation or warranty as to the accuracy, completeness, or fitness for purpose of the Confidential Information. All representations and warranties, whether express or implied by statute, common law, or otherwise, are excluded to the fullest extent permitted by law.

5. OWNERSHIP

5.1 The Confidential Information and all intellectual property rights subsisting therein shall remain the exclusive property of the Discloser. Nothing in this Agreement shall be construed as granting to the Recipient any licence, right, title, or interest in or to any Confidential Information or intellectual property rights of the Discloser.

5.2 The disclosure of Confidential Information to the Recipient shall not constitute a publication or waiver of any privilege or right of the Discloser.

6. TERM

6.1 This Agreement shall commence on the Effective Date and shall continue in full force and effect until [{{terms.termEndDate}}] (the "Term"), unless earlier terminated by either Party by giving [{{terms.terminationNoticeDays}}] days' prior written notice to the other Party.

6.2 The obligations of confidentiality under this Agreement shall survive the termination of this Agreement for a period of [{{terms.postTerminationYears}}] years from the date of termination, except that obligations in respect of trade secrets shall continue for so long as the relevant information qualifies as a trade secret under applicable law.

7. REMEDIES

7.1 The Recipient acknowledges that the disclosure of Confidential Information in breach of this Agreement may cause irreparable harm to the Discloser for which monetary damages would not be an adequate remedy. Accordingly, the Discloser shall be entitled to seek equitable relief, including an injunction or specific performance, in addition to any other remedies available at law or in equity, without the need to prove actual damages.

7.2 The Discloser shall not be required to furnish any bond or other security in connection with any application for equitable relief.

8. GENERAL

8.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, and representations, whether written or oral, relating to such subject matter.

8.2 Variation. No variation or amendment to this Agreement shall be effective unless agreed in writing signed by duly authorised representatives of both Parties.

8.3 Waiver. No failure or delay by either Party in exercising any right, power, or remedy shall operate as a waiver thereof, nor shall any single or partial exercise of any right, power, or remedy preclude any other or further exercise thereof or the exercise of any other right, power, or remedy.

8.4 Severability. If any provision of this Agreement is held to be invalid or unenforceable in any jurisdiction, such invalidity or unenforceability shall not affect the validity or enforceability of the remaining provisions of this Agreement, and the Parties shall negotiate in good faith to replace the invalid provision with a valid provision that achieves, to the greatest extent possible, the economic and legal objectives of the invalid provision.

8.5 Assignment. The Recipient may not assign, transfer, or sublicense any of its rights or obligations under this Agreement without the prior written consent of the Discloser. The Discloser may assign this Agreement to any group company or in connection with a merger, acquisition, or sale of all or substantially all of its business.

8.6 Notices. All notices under this Agreement shall be in writing and shall be deemed delivered: (a) on personal delivery; (b) on the second business day after posting by recorded delivery to the addresses set out above (or as subsequently updated in writing); or (c) on confirmed transmission by email.

8.7 Third Party Rights. This Agreement is personal to the Parties. No third party shall have any rights to enforce any term of this Agreement pursuant to the Contracts (Rights of Third Parties) Act 1999 or otherwise.

8.8 Governing Law and Jurisdiction. This Agreement and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the laws of England and Wales, and the Parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.

IN WITNESS WHEREOF the duly authorised representatives of the Parties have executed this Agreement as a deed on the date first above written.

EXECUTED as a DEED by [{{party.discloser.name}}]
acting by [{{signatures.discloserSignatoryTitle}}]

Signature: _______________________________
Name: [{{signatures.discloserSignatoryName}}]
Title: [{{signatures.discloserSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

EXECUTED as a DEED by [{{party.recipient.name}}]
acting by [{{signatures.recipientSignatoryTitle}}]

Signature: _______________________________
Name: [{{signatures.recipientSignatoryName}}]
Title: [{{signatures.recipientSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Confidential Information includes personal data subject to the UK GDPR (consider a Data Processing Agreement instead); the arrangement involves consumer credit regulated under the Consumer Credit Act 1974; the Purpose requires regulatory approvals that have not been obtained. Local law may require additional steps; no liquidated damages provisions are included (enforceability uncertain in UK courts for NDA breach claims). Jurisdiction: United Kingdom (England & Wales).`;

const ONEWAY_NDA_US = `NON-DISCLOSURE AGREEMENT (ONE-WAY)

Title: One-Way Non-Disclosure Agreement
Version: 1
Jurisdiction: United States of America — [{{jurisdiction.stateName}}]

THIS NON-DISCLOSURE AGREEMENT (the "Agreement") is entered into as of [{{dates.effectiveDate}}] (the "Effective Date")

BETWEEN:

(1) [{{party.discloser.name}}], a [{{party.discloser.legalEntityType}}] organised under the laws of [{{party.discloser.stateOfFormation}}], with its principal place of business at [{{party.discloser.address}}] (the "Discloser"); and

(2) [{{party.recipient.name}}], [{{party.recipient.entityType}}] organised under the laws of [{{party.recipient.stateOfFormation}}], with its principal place of business at [{{party.recipient.address}}] (the "Recipient").

(collectively referred to as the "Parties")

RECITALS

WHEREAS, the Discloser wishes to disclose to the Recipient certain Confidential Information (as defined below) for the Purpose; and

WHEREAS, the Recipient has agreed to receive such Confidential Information subject to the terms and conditions of this Agreement;

NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. DEFINITIONS

1.1 "Confidential Information" means all information, in any form (whether written, oral, electronic, visual, or otherwise), disclosed by the Discloser to the Recipient that: (a) is designated as confidential by the Discloser; or (b) would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information includes, without limitation: trade secrets; inventions; technical data; know-how; business plans; customer lists; financial information; pricing; software; and any analysis, compilation, or summary of any of the foregoing.

1.2 "Purpose" means [{{purpose.description}}].

1.3 "Representative" means, with respect to a Party, that Party's directors, officers, employees, agents, advisers, and subcontractors who have a need to know the Confidential Information for the Purpose and who are bound by written confidentiality obligations at least as protective as those contained in this Agreement.

2. OBLIGATIONS OF RECIPIENT

2.1 Recipient shall:

(a) hold all Confidential Information in strict confidence and not disclose any Confidential Information to any third party without the prior written consent of Discloser;

(b) use the Confidential Information solely for the Purpose and for no other purpose whatsoever;

(c) protect the Confidential Information using the same degree of care as Recipient uses to protect its own confidential information of like kind, but in no event less than reasonable care;

(d) disclose Confidential Information within Recipient's organisation only to those Representatives who have a need to know for the Purpose;

(e) not copy or reproduce Confidential Information except as strictly necessary for the Purpose;

(f) promptly, upon the earlier of: (i) Discloser's written request; (ii) completion or abandonment of the Purpose; or (iii) termination of this Agreement, return to Discloser all Confidential Information and all copies, summaries, and derivatives thereof, or certify in writing that all such materials have been destroyed;

(g) not use the Confidential Information for any purpose that would constitute a violation of any law, statute, regulation, or ordinance;

(h) not disclose to Discloser any information that is not Confidential Information without Discloser's prior written consent.

2.2 Recipient shall be liable for any breach of the obligations set forth in this Agreement by any Representative to whom Recipient disclosed Confidential Information.

3. EXCLUSIONS

3.1 The obligations under Clause 2 shall not apply to Confidential Information that:

(a) is or becomes generally available to the public through no act or omission of Recipient or any Representative;

(b) was known to Recipient prior to disclosure by Discloser, as evidenced by written records maintained by Recipient;

(c) is received by Recipient from a third party who is lawfully entitled to disclose it and who imposes no confidentiality obligation on Recipient;

(d) is independently developed by Recipient without use of or reference to Discloser's Confidential Information, as evidenced by written records;

(e) is required to be disclosed by applicable law, regulation, court order, subpoena, or other legal process, provided that Recipient shall: (i) provide Discloser with prompt written notice of such requirement (to the extent legally permitted); (ii) cooperate with Discloser in seeking confidential treatment; and (iii) disclose only the minimum information legally required.

4. OWNERSHIP

4.1 All Confidential Information shall remain the exclusive property of Discloser. Nothing in this Agreement shall be construed as granting to Recipient any licence, right, title, or interest in or to any Confidential Information or any intellectual property right of Discloser.

4.2 The disclosure of Confidential Information shall not constitute a publication or waiver of any privilege or right of Discloser.

5. TERM AND TERMINATION

5.1 This Agreement shall be effective as of the Effective Date and shall continue in full force and effect until [{{terms.termEndDate}}] (the "Term"), unless earlier terminated by either Party upon [{{terms.terminationNoticeDays}}] days' prior written notice to the other Party.

5.2 The obligations of confidentiality shall survive termination of this Agreement for a period of [{{terms.postTerminationYears}}] years, except that obligations with respect to trade secrets shall continue for so long as such information qualifies as a trade secret under applicable law.

6. REMEDIES AND ENFORCEMENT

6.1 Recipient acknowledges that: (a) Discloser's Confidential Information is unique and valuable; and (b) breach of this Agreement may cause irreparable harm to Discloser for which monetary damages may be an inadequate remedy. Accordingly, Discloser shall be entitled to seek injunctive or other equitable relief, without the necessity of posting a bond or proving actual damages, in addition to any other remedies available at law or in equity.

6.2 [{{jurisdiction.injunctiveReliefClause}}]

7. GENERAL PROVISIONS

7.1 No Warranty. Discloser makes no representation or warranty as to the accuracy, completeness, or fitness for purpose of the Confidential Information. All representations and warranties, whether express or implied, are hereby disclaimed to the fullest extent permitted by applicable law.

7.2 Entire Agreement. This Agreement constitutes the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior agreements, representations, and understandings, whether written or oral.

7.3 Amendment. This Agreement may not be amended except by a written instrument signed by duly authorised representatives of both Parties.

7.4 Waiver. No waiver by either Party of any breach shall constitute a waiver of any other or subsequent breach.

7.5 Severability. If any provision of this Agreement is held to be invalid or unenforceable in any jurisdiction, the remaining provisions shall continue in full force and effect.

7.6 Assignment. Recipient may not assign or transfer this Agreement without the prior written consent of Discloser. Discloser may assign this Agreement to a successor in connection with a merger, acquisition, or sale of substantially all of its assets.

7.7 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{jurisdiction.stateName}}], without regard to conflict of laws principles.

7.8 Dispute Resolution. [{{jurisdiction.disputeResolution}}]

7.9 Notices. All notices shall be in writing and delivered by: (a) personal delivery; (b) nationally recognised overnight courier; or (c) email with confirmed receipt, addressed to the respective Parties at the addresses set forth above.

7.10 Counterparts. This Agreement may be executed in counterparts, each of which shall constitute an original and all of which together shall constitute one instrument.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

[{{party.discloser.name}}]

By: _______________________________
Name: [{{signatures.discloserSignatoryName}}]
Title: [{{signatures.discloserSignatoryTitle}}]
Date: [{{dates.effectiveDate}}]

[{{party.recipient.name}}]

By: _______________________________
Name: [{{signatures.recipientSignatoryName}}]
Title: [{{signatures.recipientSignatoryTitle}}]
Date: [{{dates.effectiveDate}}]

---
Template document. Not legal advice. Not suitable if: the Confidential Information includes protected health information subject to HIPAA (consider a Business Associate Agreement); the arrangement involves securities law considerations; the Purpose involves a transaction subject to federal or state securities regulations. Consult a licensed attorney in the applicable state before use. Jurisdiction: United States of America — [{{jurisdiction.stateName}}].`;

const ONEWAY_NDA_EU = `NON-DISCLOSURE AGREEMENT (ONE-WAY)

Title: One-Way Non-Disclosure Agreement
Version: 1
Jurisdiction: European Union — [{{jurisdiction.country}}]

THIS AGREEMENT is made on [{{dates.agreementDate}}] (the "Effective Date")

BETWEEN:

(1) [{{party.discloser.name}}], a [{{party.discloser.legalEntityType}}] incorporated and operating under the laws of [{{party.discloser.countryOfIncorporation}}], with its registered office at [{{party.discloser.registeredAddress}}] (the "Discloser"); and

(2) [{{party.recipient.name}}], a [{{party.recipient.legalEntityType}}] incorporated and operating under the laws of [{{party.recipient.countryOfIncorporation}}], with its registered office at [{{party.recipient.address}}] (the "Recipient").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Discloser wishes to disclose to the Recipient certain Confidential Information for the Purpose; and

WHEREAS the Recipient has agreed to receive such Confidential Information subject to the terms and conditions of this Agreement;

NOW IT IS AGREED as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires:

(a) "Confidential Information" means all information, in any form (whether written, oral, electronic, visual, or otherwise), disclosed by the Discloser to the Recipient that: (i) is designated as confidential by the Discloser; or (ii) would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure, including without limitation: trade secrets; business plans; financial information; technical data; know-how; customer information; pricing; inventions; and any analysis, compilation, or summary of any of the foregoing;

(b) "Purpose" means [{{purpose.description}}];

(c) "Recipient's Representatives" means the Recipient's directors, officers, employees, agents, advisers, and subcontractors who: (i) need to know the Confidential Information for the Purpose; (ii) have been informed of its confidential nature; and (iii) are subject to confidentiality obligations at least as protective as those in this Agreement;

(d) "EU Processing Legislation" means the General Data Protection Regulation (EU) 2016/679 ("GDPR") and any applicable national data protection legislation of the relevant EU Member State.

1.2 References to Clauses are to clauses of this Agreement. Headings are for convenience only and shall not affect interpretation.

2. OBLIGATIONS OF THE RECIPIENT

2.1 The Recipient hereby undertakes and agrees:

(a) to hold the Confidential Information in strict confidence and not to disclose it to any third party without the prior written consent of the Discloser;

(b) to use the Confidential Information solely for the Purpose and for no other purpose whatsoever;

(c) to protect the Confidential Information with at least the same degree of care as the Recipient applies to its own confidential information of like kind, and in any event no less than reasonable care;

(d) to disclose Confidential Information within the Recipient's organisation only to those of the Recipient's Representatives who need to know it for the Purpose and who are subject to binding confidentiality obligations;

(e) not to copy or reproduce Confidential Information except as strictly necessary for the Purpose;

(f) upon the earlier of: (i) the Discloser's written request; (ii) the completion or abandonment of the Purpose; or (iii) the termination of this Agreement, to return to the Discloser all Confidential Information and all copies, summaries, and derivatives thereof, or to certify in writing that all such materials have been securely destroyed;

(g) to ensure that the Recipient's Representatives comply with the obligations in this Clause 2 as if they were parties to this Agreement, and the Recipient shall be liable for any breach by any of the Recipient's Representatives.

2.2 Where the Confidential Information constitutes personal data within the meaning of the EU Processing Legislation, the Recipient shall: (a) process such data only for the Purpose; (b) implement appropriate technical and organisational security measures to protect such data; and (c) comply with all applicable obligations under the EU Processing Legislation.

3. EXCLUSIONS

3.1 The obligations under Clause 2 shall not apply to any Confidential Information that:

(a) is or becomes generally available to the public through no act or omission of the Recipient or any of the Recipient's Representatives;

(b) was lawfully known to the Recipient prior to disclosure by the Discloser, as evidenced by written records;

(c) is received by the Recipient from a third party who is lawfully entitled to disclose it without restriction;

(d) is independently developed by the Recipient without use of or reference to the Confidential Information, as evidenced by written records;

(e) is required to be disclosed by applicable law, regulation, court order, or official directive of a competent authority, provided that the Recipient shall: (i) notify the Discloser prior to such disclosure (to the extent permitted by law); (ii) cooperate with the Discloser in seeking confidential treatment; and (iii) disclose only the minimum necessary.

4. OWNERSHIP

4.1 The Confidential Information and all intellectual property rights subsisting therein shall remain the exclusive property of the Discloser. Nothing in this Agreement shall be construed as granting to the Recipient any licence, right, title, or interest in or to the Confidential Information or any intellectual property right of the Discloser.

4.2 The disclosure of Confidential Information shall not constitute a waiver of any privilege or right of the Discloser.

5. TERM

5.1 This Agreement shall commence on the Effective Date and shall continue in full force and effect until [{{terms.termEndDate}}] (the "Term"), unless earlier terminated by either Party on not less than [{{terms.terminationNoticeDays}}] days' written notice to the other Party.

5.2 The obligations of confidentiality shall survive the termination of this Agreement for a period of [{{terms.postTerminationYears}}] years from the date of termination, without prejudice to any accrued rights or remedies of the Discloser.

6. REMEDIES

6.1 The Recipient acknowledges that the disclosure of Confidential Information in breach of this Agreement may cause irreparable harm to the Discloser for which monetary damages would not be an adequate remedy, and accordingly the Discloser shall be entitled to seek injunctive or other equitable relief in addition to any other remedies available at law or in equity.

6.2 The foregoing shall not limit the right of the Discloser to claim damages for breach of this Agreement.

7. GENERAL

7.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, and representations.

7.2 Amendment. No amendment or variation shall be effective unless agreed in writing signed by duly authorised representatives of both Parties.

7.3 Waiver. No failure or delay by either Party in exercising any right or remedy shall constitute a waiver thereof.

7.4 Severability. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the Parties shall negotiate in good faith to replace the invalid provision with a valid provision achieving the same economic and legal effect.

7.5 Assignment. The Recipient may not assign or transfer this Agreement without the prior written consent of the Discloser.

7.6 Notices. All notices shall be in writing and delivered by personal delivery, registered post, or confirmed email to the addresses of the Parties set out above or as subsequently updated in writing.

7.7 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of [{{jurisdiction.country}}], and any dispute shall be subject to the exclusive jurisdiction of the courts of [{{jurisdiction.country}}].

7.8 This Agreement shall not be governed by the United Nations Convention on Contracts for the International Sale of Goods.

IN WITNESS WHEREOF the duly authorised representatives of the Parties have executed this Agreement as of the date first above written.

EXECUTED by [{{party.discloser.name}}]
by [{{signatures.discloserSignatoryName}}], [{{signatures.discloserSignatoryTitle}}]

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED by [{{party.recipient.name}}]
by [{{signatures.recipientSignatoryName}}], [{{signatures.recipientSignatoryTitle}}]

Signature: _______________________________
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: the Confidential Information includes personal data requiring processing under the GDPR (consider a Data Processing Agreement pursuant to Article 28 GDPR); the arrangement involves a regulated industry subject to sector-specific EU legislation; the Purpose requires prior regulatory approvals that have not been obtained. Consult a qualified attorney in the applicable EU Member State before use. Jurisdiction: European Union — [{{jurisdiction.country}}].`;

// ─── LEGENDS ─────────────────────────────────────────────────────────────────

const legendOneWayNDA: LegendItem[] = [
  { path: 'party.discloser.name', label: "Discloser's legal name", type: 'string', required: true, example: 'Meridian Capital Ltd' },
  { path: 'party.discloser.entityType', label: "Discloser's entity type", type: 'string', required: true, example: 'private limited company' },
  { path: 'party.discloser.registeredNumber', label: "Discloser's company registration number", type: 'string', required: false, example: '12345678' },
  { path: 'party.discloser.registeredAddress', label: "Discloser's registered office address", type: 'text', required: true, example: '1 London Wall, London, EC2Y 5AA' },
  { path: 'party.recipient.name', label: "Recipient's legal name", type: 'string', required: true, example: 'Nexus Advisory GmbH' },
  { path: 'party.recipient.entityType', label: "Recipient's entity type", type: 'string', required: true, example: 'Gesellschaft mit beschränkter Haftung (GmbH)' },
  { path: 'party.recipient.registeredNumber', label: "Recipient's registration number", type: 'string', required: false, example: 'HRB 123456 B' },
  { path: 'party.recipient.address', label: "Recipient's address", type: 'text', required: true, example: 'Friedrichstraße 123, 10117 Berlin, Germany' },
  { path: 'purpose.description', label: 'Purpose of disclosure', type: 'text', required: true, example: 'Evaluating a potential strategic partnership and investment opportunity' },
  { path: 'terms.termEndDate', label: 'Agreement expiry date', type: 'date', required: true, example: '2027-12-31' },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.postTerminationYears', label: 'Post-termination confidentiality (years)', type: 'number', required: true, example: 3 },
  { path: 'signatures.discloserSignatoryName', label: "Discloser signatory name", type: 'string', required: true, example: 'James Robert Elliot' },
  { path: 'signatures.discloserSignatoryTitle', label: "Discloser signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.recipientSignatoryName', label: "Recipient signatory name", type: 'string', required: true, example: 'Klaus Friedrich Weber' },
  { path: 'signatures.recipientSignatoryTitle', label: "Recipient signatory title", type: 'string', required: true, example: 'Managing Director' },
  { path: 'dates.agreementDate', label: 'Effective date', type: 'date', required: true, example: '2025-01-15' },
];

const legendOneWayNDA_US_EU: LegendItem[] = [
  { path: 'party.discloser.name', label: "Discloser's legal name", type: 'string', required: true, example: 'Meridian Capital LLC' },
  { path: 'party.discloser.legalEntityType', label: "Discloser's entity type", type: 'string', required: true, example: 'limited liability company' },
  { path: 'party.discloser.stateOfFormation', label: "Discloser's state of formation", type: 'string', required: true, example: 'Delaware' },
  { path: 'party.discloser.address', label: "Discloser's principal business address", type: 'text', required: true, example: '350 Fifth Avenue, New York, NY 10118' },
  { path: 'party.recipient.name', label: "Recipient's legal name", type: 'string', required: true, example: 'Nexus Advisory GmbH' },
  { path: 'party.recipient.entityType', label: "Recipient's entity type", type: 'string', required: true, example: 'Gesellschaft mit beschränkter Haftung (GmbH)' },
  { path: 'party.recipient.stateOfFormation', label: "Recipient's country/state of formation", type: 'string', required: false, example: 'Germany' },
  { path: 'party.recipient.countryOfIncorporation', label: "Recipient's country of incorporation", type: 'string', required: true, example: 'Germany' },
  { path: 'party.recipient.address', label: "Recipient's registered office address", type: 'text', required: true, example: 'Friedrichstraße 123, 10117 Berlin, Germany' },
  { path: 'purpose.description', label: 'Purpose of disclosure', type: 'text', required: true, example: 'Evaluating a potential strategic partnership and investment opportunity' },
  { path: 'terms.termEndDate', label: 'Agreement expiry date', type: 'date', required: true, example: '2027-12-31' },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.postTerminationYears', label: 'Post-termination confidentiality (years)', type: 'number', required: true, example: 3 },
  { path: 'jurisdiction.stateName', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'jurisdiction.country', label: 'Governing country (EU)', type: 'string', required: true, example: 'Germany' },
  { path: 'jurisdiction.injunctiveReliefClause', label: 'Injunctive relief clause text', type: 'text', required: false, example: 'Recipient expressly acknowledges that breach of this Agreement may cause irreparable harm and that Discloser shall be entitled to seek injunctive relief in any court of competent jurisdiction without the necessity of posting a bond.' },
  { path: 'jurisdiction.disputeResolution', label: 'Dispute resolution', type: 'enum', required: true, rules: { options: ['binding arbitration in accordance with the rules of the American Arbitration Association', 'the state and federal courts located in the State of STATE'] }, example: 'the state and federal courts located in the State of New York' },
  { path: 'signatures.discloserSignatoryName', label: "Discloser signatory name", type: 'string', required: true, example: 'Robert James Whitfield' },
  { path: 'signatures.discloserSignatoryTitle', label: "Discloser signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'signatures.recipientSignatoryName', label: "Recipient signatory name", type: 'string', required: true, example: 'Klaus Friedrich Weber' },
  { path: 'signatures.recipientSignatoryTitle', label: "Recipient signatory title", type: 'string', required: true, example: 'Managing Director' },
  { path: 'dates.effectiveDate', label: 'Effective date', type: 'date', required: true, example: '2025-01-15' },
];

// ─── SEED FUNCTION ───────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    slug: 'one-way-nda',
    title: 'One-Way Non-Disclosure Agreement',
    category: 'Confidentiality',
    description: 'Unilateral NDA for situations where only one party discloses confidential information to the other, for a defined commercial purpose.',
    jurisdictions: [
      { code: 'UK', label: 'United Kingdom (England & Wales)', bodyTemplate: ONEWAY_NDA_UK, legend: legendOneWayNDA },
      { code: 'US', label: 'United States of America', bodyTemplate: ONEWAY_NDA_US, legend: legendOneWayNDA_US_EU },
      { code: 'EU', label: 'European Union', bodyTemplate: ONEWAY_NDA_EU, legend: legendOneWayNDA_US_EU },
    ],
  },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seedProduct(p: typeof PRODUCTS[0]) {
  const product = await prisma.product.upsert({
    where: { slug: p.slug },
    update: { status: ProductStatus.PUBLISHED, title: p.title, category: p.category },
    create: { slug: p.slug, title: p.title, category: p.category, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });

  for (const j of p.jurisdictions) {
    let template = await prisma.template.findFirst({
      where: { productId: product.id, jurisdiction: j.code as any },
    });
    if (!template) {
      template = await prisma.template.create({
        data: { productId: product.id, jurisdiction: j.code as any, name: p.title, description: j.label },
      });
    }

    const existingActive = await prisma.templateVersion.findFirst({
      where: { templateId: template.id, isActive: true },
      orderBy: { version: 'desc' },
    });
    if (existingActive) {
      console.log('[SKIP] ' + p.title + ' (' + j.code + ') — active version exists');
      continue;
    }

    const version = await prisma.templateVersion.create({
      data: {
        version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true,
        rendererType: 'HANDLEBARS',
        outputFormat: OutputFormat.PDF,
        inputSchemaJson: {},
        placeholderLegend: buildLegend(j.legend),
        bodyTemplate: j.bodyTemplate,
        promptTemplate: '',
        lastValidatedAt: new Date(),
        lastValidationErrors: [],
      },
    });

    const validation = validateTemplateVersion(version, makePayload(j.legend));
    if (validation.issues.length) console.warn('[WARN] ' + p.title + ' (' + j.code + '):', validation.issues.slice(0, 2));

    console.log('[OK] ' + p.title + ' (' + j.code + ') — template=' + template.id + ', version=' + version.id);
  }
}

async function main() {
  for (const p of PRODUCTS) {
    await seedProduct(p);
  }
  console.log('\nBatch complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
