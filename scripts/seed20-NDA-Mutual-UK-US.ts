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

// ─── MUTUAL NDA — UK ─────────────────────────────────────────────────────────

const MUTUAL_NDA_UK = `MUTUAL NON-DISCLOSURE AGREEMENT

Title: Mutual Non-Disclosure Agreement
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.agreementDate}}]

THIS AGREEMENT is made between:

(1) [{{party.disclosing.name}}] of [{{party.disclosing.address}}] (the "First Party"); and

(2) [{{party.receiving.name}}] of [{{party.receiving.address}}] (the "Second Party").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Parties wish to explore a potential business relationship concerning [{{business.description}}] (the "Purpose");

WHEREAS in connection with the Purpose, each Party may disclose to the other certain confidential and proprietary information;

NOW IT IS AGREED as follows:

1. DEFINITIONS

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliates" means, in relation to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Business Day" means a day other than a Saturday, Sunday, or public holiday in England and Wales;

(c) "Confidential Information" means all non-public information disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party") in connection with the Purpose, in any form, including without limitation: trade secrets; inventions; technical data; know-how; product designs; business plans; financial information; customer and supplier lists; pricing information; marketing strategies; and any other information designated as confidential or that would reasonably be understood to be confidential;

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

7.1 This Agreement shall commence on the date first written above and shall continue for a period of [{{terms.durationMonths}}] months, unless earlier terminated by either Party upon [{{terms.terminationNoticeDays}}] days' written notice to the other Party.

7.2 The obligations of confidentiality set out in this Agreement shall survive the termination or expiry of this Agreement for a period of [{{terms.postTerminationYears}}] years from the date of termination or expiry.

7.3 Clauses 1 (Definitions), 5 (Intellectual Property Rights), 7.2 (Survival), 8 (Remedies), and 9 (General) shall survive the termination or expiry of this Agreement.

8. REMEDIES

8.1 The Receiving Party acknowledges that the Disclosing Party's Confidential Information is valuable and proprietary and that unauthorised disclosure or use would cause irreparable harm to the Disclosing Party for which monetary damages would not be an adequate remedy.

8.2 The Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedy available at law or in equity, without the necessity of posting a bond or proving actual damages.

9. GENERAL

9.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements.

9.2 Amendment. No amendment to this Agreement shall be effective unless agreed in writing and signed by both Parties.

9.3 Waiver and Severability as standard.

9.4 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party. Either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets.

9.5 Notices. All notices shall be in writing and served by personal delivery, pre-paid post, or email to the addresses specified in this Agreement (or as updated in writing).

9.6 Governing Law and Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of England and Wales, and the Parties submit to the exclusive jurisdiction of the courts of England and Wales.

9.7 Counterparts. This Agreement may be executed in counterparts, each constituting an original.

IN WITNESS WHEREOF the Parties have executed this Agreement as a deed on the date first written above.

EXECUTED as a DEED by [{{party.disclosing.name}}]
by [{{signatures.disclosingSignatoryName}}], [{{signatures.disclosingSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

EXECUTED as a DEED by [{{party.receiving.name}}]
by [{{signatures.receivingSignatoryName}}], [{{signatures.receivingSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: either Party is a consumer (natural person acting for personal, family, or household purposes) — additional protections under the Consumer Rights Act 2015 and other consumer legislation may apply; the Purpose involves the disclosure of highly sensitive information such as trade secrets within the meaning of the Trade Secrets (Enforcement, etc.) Regulations 2018 (consider a dedicated Trade Secrets Agreement); the information exchange is regulated by the Financial Conduct Authority or another regulatory body with specific disclosure restrictions. This template reflects general UK commercial practice and must be reviewed by a qualified solicitor before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_MUTUAL_NDA_UK: LegendItem[] = [
  { path: 'party.disclosing.name', label: "First party's legal name", type: 'string', required: true, example: 'Westfield Commercial Properties Ltd' },
  { path: 'party.disclosing.address', label: "First party's address", type: 'text', required: true, example: '1 Canada Square, London, E14 5AB' },
  { path: 'party.receiving.name', label: "Second party's legal name", type: 'string', required: true, example: 'Cobalt Digital Media Ltd' },
  { path: 'party.receiving.address', label: "Second party's address", type: 'text', required: true, example: '200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'business.description', label: 'Purpose of the disclosure', type: 'string', required: true, example: 'a potential joint venture in relation to the development and marketing of a commercial property analytics platform' },
  { path: 'terms.durationMonths', label: 'Agreement duration (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.postTerminationYears', label: 'Post-termination confidentiality period (years)', type: 'number', required: false, example: 3 },
  { path: 'obligations.backupRetentionDays', label: 'Backup retention period (days)', type: 'number', required: false, example: 30 },
  { path: 'signatures.disclosingSignatoryName', label: "First party signatory name", type: 'string', required: true, example: 'Charles Edward Harrington' },
  { path: 'signatures.disclosingSignatoryTitle', label: "First party signatory title", type: 'string', required: true, example: 'Director' },
  { path: 'signatures.receivingSignatoryName', label: "Second party signatory name", type: 'string', required: true, example: 'Victoria Rose Ashworth' },
  { path: 'signatures.receivingSignatoryTitle', label: "Second party signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-06-30' },
];

// ─── MUTUAL NDA — US ─────────────────────────────────────────────────────────

const MUTUAL_NDA_US = `MUTUAL NON-DISCLOSURE AGREEMENT

Title: Mutual Non-Disclosure Agreement
Version: 1
Jurisdiction: United States of America

Date: [{{dates.agreementDate}}]

THIS MUTUAL NON-DISCLOSURE AGREEMENT (this "Agreement") is entered into as of [{{dates.agreementDate}}] (the "Effective Date")

BETWEEN:

[{{party.disclosing.name}}] ("First Party"); and

[{{party.receiving.name}}] ("Second Party").

(collectively referred to as the "Parties")

RECITALS

WHEREAS the Parties wish to explore a potential business relationship concerning [{{business.description}}] (the "Purpose");

WHEREAS in connection with the Purpose, each Party may disclose to the other certain confidential and proprietary information;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. DEFINITIONS

1.1 In this Agreement, unless the context otherwise requires:

(a) "Affiliate" means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party;

(b) "Confidential Information" means all non-public information disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party") in connection with the Purpose, in any form, including without limitation: trade secrets; inventions; technical data; know-how; product designs; business plans; financial information; customer and supplier lists; pricing information; marketing strategies; and any other information that a reasonable person would understand to be confidential in the circumstances;

(c) "Intellectual Property Rights" means all patents, copyrights, trade secrets, trade marks, service marks, design rights, database rights, rights in Confidential Information, and all other intellectual property rights throughout the world;

(d) "including" means "including without limitation".

1.2 Confidential Information does not include information that:

(a) is or becomes generally available to the public through no act or omission of the Receiving Party;

(b) was known to the Receiving Party prior to disclosure by the Disclosing Party, as evidenced by written records;

(c) is received by the Receiving Party from a third party without breach of any confidentiality obligation;

(d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information, as evidenced by written records.

2. DISCLOSURE OF CONFIDENTIAL INFORMATION

2.1 In connection with the Purpose, each Party may disclose Confidential Information to the other Party. Each Party shall be a Disclosing Party and a Receiving Party with respect to the information it discloses and receives, respectively.

2.2 The Disclosing Party shall, where practicable, clearly mark or designate its Confidential Information as "Confidential," "Proprietary," or with a similar legend. The failure to mark or designate information as confidential shall not exclude such information from the scope of this Agreement if a reasonable person would understand such information to be confidential in the context of its disclosure.

3. OBLIGATIONS OF THE RECEIVING PARTY

3.1 The Receiving Party shall:

(a) keep the Disclosing Party's Confidential Information in strict confidence;

(b) not disclose the Disclosing Party's Confidential Information to any third party without the prior written consent of the Disclosing Party;

(c) use the Disclosing Party's Confidential Information solely for the Purpose;

(d) protect the Disclosing Party's Confidential Information with at least the same degree of care as it applies to its own confidential information of similar kind, and in any event no less than reasonable care;

(e) limit disclosure of the Disclosing Party's Confidential Information to those employees, agents, advisers, and contractors who: (i) have a genuine need to know such information for the Purpose; (ii) have been informed of the confidential nature of such information; and (iii) are bound by confidentiality obligations at least as protective as those set forth in this Agreement;

(f) not copy or reproduce the Disclosing Party's Confidential Information except as reasonably necessary for the Purpose;

(g) promptly notify the Disclosing Party upon becoming aware of any unauthorized disclosure or use of the Disclosing Party's Confidential Information.

3.2 The Receiving Party shall ensure that its Affiliates and representatives comply with the obligations in this Section 3 as if they were the Receiving Party.

4. PERMITTED DISCLOSURES

4.1 The Receiving Party may disclose the Disclosing Party's Confidential Information to the extent required by applicable law, regulation, court order, or other legal process, provided that: (a) the Receiving Party gives the Disclosing Party prompt written notice of such requirement (to the extent permitted by law); (b) the Receiving Party cooperates with the Disclosing Party in seeking a protective order or other appropriate remedy; (c) the Receiving Party discloses only such portion of the Confidential Information as is legally required; (d) the Receiving Party uses reasonable efforts to obtain confidential treatment for any Confidential Information so disclosed.

5. INTELLECTUAL PROPERTY RIGHTS

5.1 Nothing in this Agreement shall be construed as granting any licence or other right under any Intellectual Property Rights of the Disclosing Party. No license is granted herein by implication, estoppel, or otherwise.

5.2 The Receiving Party acknowledges that the Disclosing Party retains all right, title, and interest in and to its Confidential Information and all Intellectual Property Rights therein. The Receiving Party shall not contest or challenge the validity or ownership of any Intellectual Property Rights of the Disclosing Party.

6. RETURN OF CONFIDENTIAL INFORMATION

6.1 Upon the request of the Disclosing Party, or upon the termination or expiry of this Agreement, the Receiving Party shall, at the Disclosing Party's election: (a) return to the Disclosing Party all documents, materials, and other tangible items containing or reflecting the Disclosing Party's Confidential Information; or (b) destroy all such documents, materials, and other tangible items and certify such destruction in writing to the Disclosing Party.

6.2 The foregoing shall not require the Receiving Party to return or destroy any Confidential Information that: (a) is required to be retained by applicable law or regulation (subject to the obligations of confidentiality continuing); or (b) is stored in routine electronic backup systems, provided that such information is deleted in accordance with the Receiving Party's standard backup rotation procedures within [{{obligations.backupRetentionDays}}] days.

7. TERM AND TERMINATION

7.1 This Agreement shall commence on the Effective Date and shall continue for a period of [{{terms.durationMonths}}] months, unless earlier terminated by either Party upon [{{terms.terminationNoticeDays}}] days' written notice to the other Party.

7.2 The obligations of confidentiality set forth in this Agreement shall survive the termination or expiry of this Agreement for a period of [{{terms.postTerminationYears}}] years from the date of termination or expiry.

7.3 Sections 1 (Definitions), 5 (Intellectual Property Rights), 7.2 (Survival), 8 (Remedies), and 9 (General) shall survive the termination or expiry of this Agreement.

8. REMEDIES

8.1 The Receiving Party acknowledges that the Disclosing Party's Confidential Information is valuable and proprietary and that unauthorized disclosure or use would cause irreparable harm to the Disclosing Party for which monetary damages may not be an adequate remedy.

8.2 The Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedy available at law or in equity, without the necessity of posting a bond.

9. GENERAL

9.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements relating to such subject matter.

9.2 Amendment. No amendment or modification of this Agreement shall be effective unless in writing and signed by both Parties.

9.3 Waiver and Severability. No waiver by either Party of any breach shall be construed as a waiver of any subsequent breach. If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

9.4 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party, except that either Party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets. Any purported assignment in violation of this Section shall be void.

9.5 Notices. All notices shall be in writing and shall be deemed delivered: (a) upon personal delivery; (b) upon receipt if sent by certified or registered mail, return receipt requested; (c) upon confirmation of transmission if sent by email (with a copy sent by another method in this Section).

9.6 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}], without regard to its conflict of laws principles.

9.7 Jurisdiction and Venue. Each Party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in [{{legal.jurisdictionCity}}], [{{legal.governingState}}] for any action or proceeding arising out of or relating to this Agreement.

9.8 Counterparts. This Agreement may be executed in counterparts, each constituting an original. Electronic signatures shall be deemed original signatures for all purposes.

9.9 No Partnership. Nothing in this Agreement shall be construed as creating a partnership, joint venture, or agency relationship between the Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

FIRST PARTY:

[{{party.disclosing.name}}]

By: _______________________________
Name: [{{signatures.disclosingSignatoryName}}]
Title: [{{signatures.disclosingSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

SECOND PARTY:

[{{party.receiving.name}}]

By: _______________________________
Name: [{{signatures.receivingSignatoryName}}]
Title: [{{signatures.receivingSignatoryTitle}}]
Date: [{{dates.agreementDate}}]

---
Template document. Not legal advice. Not suitable if: either Party is an individual (consumer) acting for personal, family, or household purposes — state consumer protection laws may impose additional obligations; the Purpose involves the disclosure of trade secrets within the meaning of the Defend Trade Secrets Act (DTSA), 18 U.S.C. § 1836 et seq. (consider a dedicated Trade Secrets Agreement with DTSA-compliant provisions); the disclosure is regulated by federal or state securities laws (Reg FD, state blue sky laws, SEC regulations). This template reflects general U.S. commercial practice and must be reviewed by a qualified attorney before use. Jurisdiction: United States of America (adapt for specific state law).`;

const LEGEND_MUTUAL_NDA_US: LegendItem[] = [
  { path: 'party.disclosing.name', label: "First party's legal name", type: 'string', required: true, example: 'Capstone Property Holdings LLC' },
  { path: 'party.receiving.name', label: "Second party's legal name", type: 'string', required: true, example: 'Meridian Consulting Group Inc.' },
  { path: 'business.description', label: 'Purpose of the disclosure', type: 'string', required: true, example: 'a potential strategic partnership for the joint development and commercialisation of a commercial real estate analytics platform for institutional investors' },
  { path: 'terms.durationMonths', label: 'Agreement duration (months)', type: 'number', required: true, example: 24 },
  { path: 'terms.terminationNoticeDays', label: 'Termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.postTerminationYears', label: 'Post-termination confidentiality period (years)', type: 'number', required: false, example: 3 },
  { path: 'obligations.backupRetentionDays', label: 'Backup retention period (days)', type: 'number', required: false, example: 30 },
  { path: 'signatures.disclosingSignatoryName', label: "First party signatory name", type: 'string', required: true, example: 'Jonathan Reed Patterson' },
  { path: 'signatures.disclosingSignatoryTitle', label: "First party signatory title", type: 'string', required: true, example: 'Managing Member' },
  { path: 'signatures.receivingSignatoryName', label: "Second party signatory name", type: 'string', required: true, example: 'Alexandra Bennett Chen' },
  { path: 'signatures.receivingSignatoryTitle', label: "Second party signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.agreementDate', label: 'Agreement date', type: 'date', required: true, example: '2025-06-30' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'legal.jurisdictionCity', label: 'Jurisdiction city and state', type: 'string', required: false, example: 'New York County, New York' },
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
  await seedProduct('nda-mutual', 'Mutual NDA', 'Confidentiality', 'UK', 'United Kingdom (England & Wales)', MUTUAL_NDA_UK, LEGEND_MUTUAL_NDA_UK);
  await seedProduct('nda-mutual', 'Mutual NDA', 'Confidentiality', 'US', 'United States of America', MUTUAL_NDA_US, LEGEND_MUTUAL_NDA_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());