import { ProductStatus, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─── Fix 2: Mutual NDA EU (v1 empty — create v2) ─────────────────────────────

const MUTUAL_NDA_EU_V2 = `MUTUAL NON-DISCLOSURE AGREEMENT

Title: Mutual Non-Disclosure Agreement
Version: 2
Jurisdiction: European Union

Date: [{{dates.agreementDate}}]

THIS MUTUAL NON-DISCLOSURE AGREEMENT (this "Agreement") is made as of [{{dates.agreementDate}}] (the "Effective Date")

BETWEEN:

[{{party.disclosing.name}}] ("First Party"); and

[{{party.receiving.name}}] ("Second Party").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Parties wish to explore a potential business relationship concerning [{{business.description}}] (the "Purpose");

WHEREAS in connection with the Purpose, each Party may disclose to the other certain confidential and proprietary information;

NOW IT IS AGREED as follows:

1. DEFINITIONS

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliates" means, in relation to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Business Day" means a day other than a Saturday, Sunday, or public holiday in the jurisdiction of the Disclosing Party;

(c) "Confidential Information" means all non-public information disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party") in connection with the Purpose, in any form, including without limitation: trade secrets; inventions; technical data; know-how; product designs; business plans; financial information; customer and supplier lists; pricing information; marketing strategies; and any other information designated as confidential or that would reasonably be understood to be confidential in the circumstances;

(d) "Disclosing Party" has the meaning given in Clause 1.1(c);

(e) "Intellectual Property Rights" means all patents, registered and unregistered trade marks, design rights, copyright, database rights, rights in Confidential Information, and all other intellectual property rights throughout the world;

(f) "including" means "including without limitation".

1.2 Confidential Information does not include information that:

(a) is or becomes generally available to the public through no act or omission of the Receiving Party;

(b) was known to the Receiving Party prior to disclosure by the Disclosing Party, as evidenced by written records;

(c) is received by the Receiving Party from a third party without breach of any confidentiality obligation;

(d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information, as evidenced by written records.

2. DISCLOSURE OF CONFIDENTIAL INFORMATION

2.1 In connection with the Purpose, each Party may disclose Confidential Information to the other Party. Each Party shall be a Disclosing Party and a Receiving Party with respect to the information it discloses and receives, respectively.

2.2 The Disclosing Party shall, where practicable, clearly mark or designate its Confidential Information as "Confidential" or with a similar legend. The failure to mark or designate information as confidential shall not exclude such information from the scope of this Agreement if a reasonable person would understand such information to be confidential in the context of its disclosure.

3. OBLIGATIONS OF THE RECEIVING PARTY

3.1 The Receiving Party shall:

(a) keep the Disclosing Party's Confidential Information in strict confidence;

(b) not disclose the Disclosing Party's Confidential Information to any third party without the prior written consent of the Disclosing Party;

(c) use the Disclosing Party's Confidential Information solely for the Purpose;

(d) protect the Disclosing Party's Confidential Information with at least the same degree of care as it applies to its own confidential information, and in any event no less than reasonable care;

(e) limit disclosure of the Disclosing Party's Confidential Information to those of its employees, agents, and advisers who: (i) have a genuine need to know such information for the Purpose; (ii) have been informed of the confidential nature of such information; and (iii) are bound by confidentiality obligations at least as protective as those set out in this Agreement;

(f) not copy or reproduce the Disclosing Party's Confidential Information except as reasonably necessary for the Purpose;

(g) promptly notify the Disclosing Party upon becoming aware of any unauthorised disclosure or use of the Disclosing Party's Confidential Information.

3.2 The Receiving Party shall ensure that its Affiliates and representatives comply with the obligations in this Clause 3 as if they were the Receiving Party.

4. PERMITTED DISCLOSURES

4.1 The Receiving Party may disclose the Disclosing Party's Confidential Information to the extent required by applicable law, regulation, court order, or other legal process, provided that:

(a) the Receiving Party gives the Disclosing Party prompt written notice of such requirement (where permitted by law);

(b) the Receiving Party cooperates with the Disclosing Party, at the Disclosing Party's cost, in seeking a protective order or other appropriate remedy;

(c) the Receiving Party discloses only such portion of the Confidential Information as is legally required;

(d) the Receiving Party uses reasonable efforts to obtain confidential treatment for any Confidential Information so disclosed.

5. INTELLECTUAL PROPERTY RIGHTS

5.1 Nothing in this Agreement shall be construed as granting any licence or other right under any Intellectual Property Rights of the Disclosing Party.

5.2 The Receiving Party acknowledges that the Disclosing Party retains all right, title, and interest in and to its Confidential Information and all Intellectual Property Rights therein. The Receiving Party shall not contest or challenge the validity or ownership of any Intellectual Property Rights of the Disclosing Party.

5.3 If any Confidential Information of the Disclosing Party is incorporated in any work product, report, or analysis produced by the Receiving Party, such incorporation shall not affect the ownership of such Confidential Information, which shall remain vested in the Disclosing Party.

6. RETURN OF CONFIDENTIAL INFORMATION

6.1 Upon the request of the Disclosing Party, or upon the termination or expiry of this Agreement, the Receiving Party shall, at the Disclosing Party's election:

(a) return to the Disclosing Party all documents, materials, and other tangible items containing or reflecting the Disclosing Party's Confidential Information; or

(b) destroy all such documents, materials, and other tangible items and certify such destruction in writing to the Disclosing Party.

6.2 The foregoing shall not require the Receiving Party to return or destroy any Confidential Information that: (a) is required to be retained by applicable law or regulation (subject to the obligations of confidentiality continuing); or (b) is stored in routine electronic backup systems, provided that such information is deleted in accordance with the Receiving Party's standard backup rotation procedures within [{{obligations.backupRetentionDays}}] days.

7. TERM AND TERMINATION

7.1 This Agreement shall commence on the Effective Date and shall continue for a period of [{{terms.durationMonths}}] months, unless earlier terminated by either Party upon [{{terms.terminationNoticeDays}}] days' written notice to the other Party.

7.2 The obligations of confidentiality set out in this Agreement shall survive the termination or expiry of this Agreement for a period of [{{terms.postTerminationYears}}] years from the date of termination or expiry.

7.3 Clauses 1 (Definitions), 5 (Intellectual Property Rights), 7.2 (Survival), 8 (Remedies), and 9 (General) shall survive the termination or expiry of this Agreement.

8. REMEDIES

8.1 The Receiving Party acknowledges that the Disclosing Party's Confidential Information is valuable and proprietary and that unauthorised disclosure or use would cause irreparable harm to the Disclosing Party for which monetary damages would not be an adequate remedy.

8.2 The Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedy available at law or in equity, without the necessity of posting a bond or proving actual damages.

9. GENERAL

9.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements.

9.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by both Parties.

9.3 Waiver and Severability. No waiver by either Party of any breach shall be construed as a waiver of any subsequent breach. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

9.4 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party. Either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets.

9.5 Notices. All notices shall be in writing and served by personal delivery, pre-paid post, or email to the addresses specified in this Agreement or as updated in writing.

9.6 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of [{{legal.governingLaw}}]. The Parties submit to the non-exclusive jurisdiction of the courts of [{{legal.jurisdictionCourt}}].

9.7 Counterparts. This Agreement may be executed in counterparts, each constituting an original. Electronic signatures shall be deemed original signatures for all purposes.

IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above.

For and on behalf of [{{party.disclosing.name}}]:

Signature: _______________________________
Name: [{{signatures.disclosingSignatoryName}}]
Title: [{{signatures.disclosingSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

For and on behalf of [{{party.receiving.name}}]:

Signature: _______________________________
Name: [{{signatures.receivingSignatoryName}}]
Title: [{{signatures.receivingSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: either Party is a consumer (natural person acting for personal, family, or household purposes) — additional protections under applicable consumer protection legislation may apply; the Purpose involves the disclosure of trade secrets within the meaning of Directive 2016/943 on the protection of undisclosed know-how and business information (consider a dedicated Trade Secrets Agreement); the information exchange is regulated by a supervisory authority or subject to specific disclosure restrictions. This template reflects general EU commercial practice and must be reviewed by a qualified lawyer before use, particularly in relation to the applicable governing law. Jurisdiction: European Union (governing law: [{{legal.governingLaw}}]).`;

const LEGEND_MUTUAL_NDA_EU = [
  { path: 'party.disclosing.name', label: "First party's legal name", type: 'string', required: true, example: 'Westfield Commercial Properties GmbH' },
  { path: 'party.receiving.name', label: "Second party's legal name", type: 'string', required: true, example: 'Cobalt Digital Media GmbH' },
  { path: 'business.description', label: 'Purpose of the disclosure', type: 'string', required: true, example: 'a potential joint venture in relation to the development and marketing of a commercial property analytics platform' },
  { path: 'terms.durationMonths', label: 'Agreement duration (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.postTerminationYears', label: 'Post-termination confidentiality period (years)', type: 'number', required: false, example: 3 },
  { path: 'obligations.backupRetentionDays', label: 'Backup retention period (days)', type: 'number', required: false, example: 30 },
  { path: 'signatures.disclosingSignatoryName', label: "First party signatory name", type: 'string', required: true, example: 'Franz Wilhelm Hartmann' },
  { path: 'signatures.disclosingSignatoryTitle', label: "First party signatory title", type: 'string', required: true, example: 'Geschäftsführer (Managing Director)' },
  { path: 'signatures.receivingSignatoryName', label: "Second party signatory name", type: 'string', required: true, example: 'Victoria Rose Ashworth' },
  { path: 'signatures.receivingSignatoryTitle', label: "Second party signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-06-30' },
  { path: 'legal.governingLaw', label: 'Governing law (EU Member State)', type: 'string', required: true, example: 'Germany' },
  { path: 'legal.jurisdictionCourt', label: 'Jurisdiction court', type: 'string', required: false, example: 'the courts of Frankfurt am Main, Germany' },
];

async function main() {
  const PRODUCT = await prisma.product.findUnique({ where: { slug: 'nda-mutual' } });
  const TEMPLATE = await prisma.template.findFirst({ where: { productId: PRODUCT.id, jurisdiction: 'EU' } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: TEMPLATE.id }, orderBy: { version: 'desc' } });
  if (existing && existing.isActive && existing.bodyTemplate && existing.bodyTemplate.length > 100) {
    console.log('[SKIP] nda-mutual (EU) already has content');
    return;
  }
  const v2 = await prisma.templateVersion.create({
    data: {
      templateId: TEMPLATE.id, version: 2, isActive: true,
      rendererType: 'HANDLEBARS', outputFormat: 'PDF', inputSchemaJson: {},
      placeholderLegend: { version: 1, items: LEGEND_MUTUAL_NDA_EU },
      bodyTemplate: MUTUAL_NDA_EU_V2, promptTemplate: '',
      lastValidatedAt: new Date(), lastValidationErrors: [],
    },
  });
  if (existing) await prisma.templateVersion.update({ where: { id: existing.id }, data: { isActive: false } });
  console.log('[OK] nda-mutual (EU) v2 — ' + v2.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());