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

// ─── PRIVACY POLICY — US ─────────────────────────────────────────────────────

const PRIVACY_US = `PRIVACY POLICY

Title: Privacy Policy
Version: 1
Jurisdiction: United States of America

Last updated: [{{dates.lastUpdated}}]

1. INTRODUCTION

1.1 [{{party.companyName}}] ("we", "us", "our", or the "Company") is committed to protecting the privacy and security of your personal information.

1.2 This Privacy Policy (together with our Cookie Policy and our Terms of Service) describes how we collect, use, disclose, and protect personal information about you when you visit our website at [{{party.websiteUrl}}] (the "Website"), purchase or use our products or services, or otherwise interact with us.

1.3 By accessing or using our Website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Website or services.

2. INFORMATION WE COLLECT

2.1 We may collect, use, store, and transfer various categories of personal information about you:

(a) Identity Data: first name, last name, maiden name, username or similar identifier, title, date of birth, gender, and signature;

(b) Contact Data: billing address, delivery address, email address, and telephone numbers;

(c) Financial Data: bank account details, payment card details, payment history, and other payment information;

(d) Transaction Data: details about payments to and from you and other details of products and services you have purchased from us;

(e) Technical Data: internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our Website;

(f) Usage Data: information about how you use our Website, products, and services;

(g) Marketing and Communications Data: your preferences in receiving marketing from us, your communication preferences, and your responses to our surveys and communications;

(h) [{{data.additionalCategoriesText}}].

2.2 We collect this information through: (a) direct interactions with you (when you fill in forms, create an account, make a purchase, or correspond with us); (b) automated technologies and cookies (as described in our Cookie Policy); (c) third-party sources, including without limitation business partners, advertising networks, analytics providers, and publicly available sources such as public databases and social media platforms.

3. SPECIAL CATEGORY DATA

3.1 We do not intentionally collect "special category data" under applicable U.S. state or federal law (such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, health data, biometric or genetic data, sexual orientation, or citizenship or immigration status) unless you voluntarily provide such information to us.

3.2 [{{data.specialCategoryText}}]

4. HOW WE USE YOUR INFORMATION

4.1 We will only use your personal information when the law permits us to do so. We rely on the following legal bases for processing your personal information:

(a) Performance of Contract: where we need to perform the contract we are about to enter into or have entered into with you;

(b) Legitimate Interests: where it is necessary for our legitimate business interests (or those of a third party) and your interests and fundamental rights do not override those interests;

(c) Legal Obligation: where we need to comply with a legal or regulatory obligation;

(d) Consent: where you have given us your express consent to the processing.

4.2 We may use your personal information for the following purposes:

(a) to register you as a new customer;

(b) to process and deliver your orders, including without limitation managing payments, fees, and charges, and collecting money owed to us;

(c) to manage our ongoing relationship with you, including without limitation notifying you about changes to our terms, this Privacy Policy, or our services;

(d) to administer and protect our business and our Website, including without limitation troubleshooting, system maintenance, data analysis, testing, and support;

(e) to deliver relevant content and advertising to you and to measure and understand the effectiveness of our advertising;

(f) to use data analytics to improve our Website, products, services, marketing, and customer relationships;

(g) to make suggestions and recommendations to you about goods or services that may be of interest to you;

(h) [{{use.additionalPurposesText}}].

5. MARKETING

5.1 We may use your personal information to form a view on what we believe you may want or need, or what may be of interest to you. We may send you marketing communications if you have: (a) requested information from us; (b) purchased goods or services from us; or (c) given us your consent to receive marketing communications, and in each case you have not subsequently opted out.

5.2 You can opt out of receiving marketing communications at any time by: (a) contacting us at [{{contacts.marketingOptOutEmail}}]; (b) updating your preferences in your account settings; or (c) clicking the unsubscribe link in any marketing email we send you.

5.3 Opting out of marketing communications will not affect personal information provided to us in connection with a product or service purchase or other transaction.

6. DISCLOSURES OF YOUR INFORMATION

6.1 We may share your personal information with the following categories of third parties:

(a) any member of our corporate group, including without limitation our parent company, subsidiaries, and affiliates;

(b) service providers acting on our behalf, including without limitation payment processors, delivery partners, IT service providers, cloud storage providers, and marketing platforms;

(c) professional advisers, including without limitation accountants, auditors, insurers, and attorneys;

(d) analytics and search engine providers that assist us in improving and optimising our Website;

(e) credit reference agencies and fraud prevention agencies;

(f) [{{sharing.additionalThirdPartiesText}}].

6.2 We may also disclose your personal information:

(a) to comply with any applicable law, regulation, court order, or other legal process;

(b) to enforce or apply our Terms of Service or any other agreement to which you are a party;

(c) to protect the rights, property, or safety of our company, our customers, or others;

(d) in connection with a corporate transaction, including without limitation a merger, acquisition, asset sale, or bankruptcy proceeding.

7. DATA SECURITY

7.1 We have implemented appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.

7.2 We limit access to your personal information to those employees, agents, contractors, and third parties who have a business need to know. They will only process your personal information on our instructions and are subject to a duty of confidentiality.

7.3 We have procedures to deal with any suspected personal data breach. We will notify you and any applicable regulator of a breach where we are legally required to do so under applicable U.S. state or federal law.

7.4 Our Website may include links to third-party websites and services. We are not responsible for the privacy practices of such third parties. We encourage you to review the privacy policies of those third parties.

8. DATA RETENTION

8.1 We will retain your personal information only for as long as reasonably necessary to fulfil the purposes we collected it for, including without limitation for the purposes of satisfying any legal, accounting, or reporting requirements.

8.2 To determine the appropriate retention period for personal information, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process your personal information, and the applicable legal requirements.

8.3 You may request that we delete your personal information — see Section 10 below.

9. YOUR STATE PRIVACY RIGHTS

9.1 Depending on your state of residence, you may have the following rights under applicable U.S. state privacy law:

(a) Right to Know: to request that we disclose the categories of personal information we have collected about you, the categories of sources of such information, the purposes for which we use such information, and whether we have sold or disclosed such information;

(b) Right to Delete: to request that we delete personal information we have collected about you, subject to certain exceptions;

(c) Right to Correct: to request that we correct inaccurate personal information we maintain about you;

(d) Right to Portability: to request a copy of your personal information in a structured, commonly used, machine-readable format;

(e) Right to Opt Out: to opt out of the sale of your personal information to third parties (if applicable);

(f) Right to Non-Discrimination: to not be discriminated against because you exercised any privacy rights.

9.2 To exercise any of your rights, please contact us at [{{contacts.rightsEmail}}] or [{{contacts.rightsTollFree}}]. We will respond to your request within the time period required by applicable law.

9.3 [{{rights.additionalStateRightsText}}]

10. CHANGES TO THIS PRIVACY POLICY

10.1 We may update this Privacy Policy from time to time. Any changes we make to this Privacy Policy in the future will be posted on this page and, where appropriate, notified to you by email.

10.2 This Privacy Policy was last updated on the date indicated at the top of this page. We encourage you to review this Privacy Policy periodically for any changes.

11. CONTACT US

11.1 If you have any questions about this Privacy Policy, including without limitation any requests to exercise your legal rights, please contact us at:

(a) Email: [{{contacts.generalEmail}}];

(b) Mail: [{{contacts.generalAddress}}];

(c) Telephone: [{{contacts.telephone}}].

---
Template document. Not legal advice. Not suitable if: your business is subject to specific federal privacy laws (HIPAA for health information, GLBA for financial information, FERPA for student education records, COPPA for children's data — each requires specific policy disclosures); your business operates in California, Virginia, Colorado, Connecticut, Utah, or other states with comprehensive consumer privacy laws (CCPA/CPRA, VCDPA, CPA, CTDPA, UCPA respectively — additional rights disclosures and opt-out mechanisms required); your business sells or shares personal information with third parties for cross-context behavioural advertising. This template reflects general U.S. commercial website practice and must be reviewed by a qualified privacy attorney before use. Jurisdiction: United States of America (state and federal laws apply).`;

const LEGEND_PRIVACY_US: LegendItem[] = [
  { path: 'party.companyName', label: 'Company legal name', type: 'string', required: true, example: 'Cobalt Digital Media Inc.' },
  { path: 'party.websiteUrl', label: 'Website URL', type: 'string', required: false, example: 'https://www.cobaltdigitalmedia.com' },
  { path: 'dates.lastUpdated', label: 'Last updated date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'data.additionalCategoriesText', label: 'Additional data categories text', type: 'text', required: false, example: 'Geolocation Data: precise geolocation data from your device when you enable location-based services in connection with our mobile application.' },
  { path: 'data.specialCategoryText', label: 'Special category data text', type: 'text', required: false, example: 'If you voluntarily provide us with health-related information in connection with a service or accommodation request, we will use such information solely for the purpose of providing the requested service or accommodation.' },
  { path: 'use.additionalPurposesText', label: 'Additional processing purposes text', type: 'text', required: false, example: 'to comply with our obligations under applicable anti-discrimination and accessibility laws, including without limitation the Americans with Disabilities Act.' },
  { path: 'sharing.additionalThirdPartiesText', label: 'Additional third parties text', type: 'text', required: false, example: 'government or regulatory authorities, law enforcement agencies, courts, and tribunals as required by applicable law.' },
  { path: 'contacts.marketingOptOutEmail', label: 'Marketing opt-out email', type: 'string', required: false, example: 'unsubscribe@cobaltdigitalmedia.com' },
  { path: 'contacts.generalEmail', label: 'General contact email', type: 'string', required: true, example: 'privacy@cobaltdigitalmedia.com' },
  { path: 'contacts.generalAddress', label: 'General contact mailing address', type: 'text', required: false, example: '200 Aldersgate Street, Suite 1200, New York, NY 10022' },
  { path: 'contacts.telephone', label: 'Contact telephone', type: 'string', required: false, example: '+1 (212) 555-0100' },
  { path: 'contacts.rightsEmail', label: 'Privacy rights request email', type: 'string', required: false, example: 'privacyrights@cobaltdigitalmedia.com' },
  { path: 'contacts.rightsTollFree', label: 'Privacy rights toll-free number', type: 'string', required: false, example: '1-800-555-0100' },
  { path: 'rights.additionalStateRightsText', label: 'Additional state rights text', type: 'text', required: false, example: 'California residents have the right to request information about our disclosure of certain categories of personal information to third parties for their direct marketing purposes. To exercise this right, contact us at the address set forth in Section 11.' },
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
  await seedProduct('privacy-policy', 'Privacy Policy', 'Compliance & Regulatory', 'US', 'United States of America', PRIVACY_US, LEGEND_PRIVACY_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());