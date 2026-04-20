import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─── Fix 5: Subscription Legal Pack US (pre-existing, no body) ────────────────

const BODY = `SUBSCRIPTION LEGAL PACK

Title: Subscription Legal Pack
Version: 2
Jurisdiction: United States of America

Date: [{{dates.packDate}}]

IMPORTANT NOTICES

This Subscription Legal Pack (the "Pack") has been prepared for use by businesses operating in the United States of America. It consists of standard-form legal documents that have been reviewed for general commercial applicability.

Each document in this Pack is accompanied by guidance notes indicating its purpose, key provisions, and any material limitations or considerations. Users should read the guidance notes carefully before executing any document.

None of the documents in this Pack constitutes legal advice. The documents have been drafted for general informational purposes only and may not be suitable for your specific circumstances. You should consult a qualified attorney admitted in the relevant jurisdiction before executing any document contained in this Pack.

PART 1 — MASTER SERVICES AGREEMENT

This Master Services Agreement (the "MSA") is a framework agreement that governs the relationship between a service provider and its clients. It sets out standard terms and conditions under which services will be delivered, and provides a mechanism for the parties to enter into specific project engagements from time to time.

Key provisions include:

(a) Scope of Services: defines the general categories of services to be provided under the MSA;

(b) Payment Terms: establishes the commercial framework for compensation, invoicing, and payment;

(c) Intellectual Property: allocates ownership of work product and pre-existing intellectual property;

(d) Confidentiality: imposes mutual obligations of confidentiality on both parties;

(e) Limitation of Liability: caps each party's aggregate liability at a specified amount;

(f) Term and Termination: sets out the duration of the MSA and the circumstances in which either party may terminate.

Guidance Notes — MSA:

• This MSA is suitable for use between a service provider and its commercial clients. It is not suitable for consumer engagements, where additional protections under applicable state consumer protection laws may be required.
• The MSA does not itself obligate either party to enter into any specific engagement. Specific projects are governed by individual Statements of Work executed under the MSA.
• The limitation of liability cap should be set at a level appropriate to the value of the services and the potential risks involved.
• Governing law and jurisdiction provisions should be selected carefully, taking into account the locations of both parties and the applicable law.

PART 2 — MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the "NDA") is a bilateral confidentiality agreement under which both parties may disclose Confidential Information to each other. It is appropriate for use in early-stage commercial discussions where both parties may be sharing sensitive information.

Key provisions include:

(a) Definition of Confidential Information: broad definition covering information disclosed in any form that a reasonable person would understand to be confidential;

(b) Obligations of the Receiving Party: obligations to maintain confidentiality, use only for the Purpose, and not disclose to third parties without consent;

(c) Permitted Disclosures: carves out disclosures required by law, regulation, or court order, subject to procedural safeguards;

(d) Intellectual Property: clarifies that disclosure of Confidential Information does not grant any licence to the receiving party's intellectual property;

(e) Return of Information: requires return or certified destruction of Confidential Information upon termination or request;

(f) Term and Termination: sets the duration of confidentiality obligations, which survive termination.

Guidance Notes — NDA:

• This NDA is bilateral — both parties are simultaneously a Disclosing Party and a Receiving Party. For one-way disclosures, a unilateral NDA should be used.
• The confidentiality obligations survive the termination or expiry of the NDA for a period of [X] years. The length of the survival period should reflect the sensitivity and useful life of the information being disclosed.
• This NDA does not address trade secrets specifically. If the information exchange involves trade secrets as defined under the Defend Trade Secrets Act (DTSA), 18 U.S.C. § 1836 et seq., consider whether additional DTSA-specific provisions are required.
• The NDA does not grant either party any rights to the other's intellectual property beyond the right to use the information for the stated Purpose.

PART 3 — INVOICE Template

This standard invoice template may be used by service providers to bill clients under the MSA or any other services agreement.

Key fields include:

(a) Invoice number and date: unique identifier and issue date for record-keeping and payment tracking;

(b) Bill-to details: client name, address, and contact information;

(c) Description of services: itemised description of services rendered, referencing the applicable Statement of Work or project reference;

(d) Rate and quantity: applicable rate per unit (hour, day, fixed fee) and quantity;

(e) Expenses: reimbursable expenses incurred in connection with the services, supported by receipts;

(f) Payment terms: due date and preferred payment method;

(g) Tax: applicable sales or use tax, if any.

Guidance Notes — Invoice:

• Invoices should be submitted in accordance with the invoicing requirements specified in the applicable services agreement or Statement of Work.
• Most U.S. states impose sales or use tax on certain services. Service providers should consult a qualified tax advisor to determine the applicable tax treatment of their services.
• Payment terms of net 30 are standard in most commercial contexts. Shorter or longer terms may be appropriate depending on the nature of the services and the practices in the relevant industry.

PART 4 — BUSINESS TERMS SUMMARY

This section provides a template for a Business Terms Summary, which is typically attached as an exhibit or schedule to the MSA. It summarises the key commercial terms in a concise format for easy reference.

Key fields include:

(a) Parties: full legal names and addresses of the service provider and the client;

(b) Effective Date: the date from which the MSA comes into force;

(c) Services: description of the categories of services to be provided;

(d) Fees: compensation structure (time and materials, fixed fee, retainer, etc.);

(e) Payment Terms: frequency of invoicing, due date, and late payment interest rate;

(f) Term: initial term and renewal mechanics;

(g) Key Contacts: named relationship managers or points of contact for each party.

Guidance Notes — Business Terms Summary:

• This summary is a convenience document for reference purposes only. In the event of any conflict between this summary and the MSA, the MSA prevails.
• Ensure all blanks are completed in full before execution. Omitted or ambiguous terms are a common source of commercial disputes.

---
Template document. Not legal advice. Not suitable if: your business is engaged in regulated industries (financial services, healthcare, telecommunications, etc.) that are subject to specific federal or state regulatory requirements that may not be addressed by these standard documents; you are entering into engagements with consumers, where additional protections under applicable state and federal consumer protection laws may be required; you are operating in a state with specific formalities requirements (e.g., California Civil Code requirements for certain contracts to be in writing and signed). This Pack reflects general U.S. commercial practice and should be reviewed by a qualified attorney admitted in your state before use. Jurisdiction: United States of America.`;

const LEGEND = [
  { path: 'dates.packDate', label: 'Pack preparation date', type: 'date', required: true, example: '2025-06-01' },
];

async function main() {
  const slug = 'subscription-legal-pack';
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
  console.log('[OK] subscription-legal-pack (US) v' + next + ' — ' + v.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());