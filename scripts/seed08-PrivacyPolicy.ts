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

const PRIVACY_UK = `PRIVACY POLICY

Title: Privacy Policy
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Last updated: [{{dates.lastUpdated}}]

1. INTRODUCTION

1.1 [{{party.companyName}}] ("we", "us", "our") is committed to protecting and respecting your privacy.

1.2 This Privacy Policy (together with our Cookie Policy and any other documents referred to herein) sets out the basis on which we collect, process, store, and share personal data about you.

1.3 For the purposes of the UK General Data Protection Regulation (the "UK GDPR") and the Data Protection Act 2018, we are the data controller of your personal data. Our registered office is at [{{party.companyAddress}}] and our company registration number is [{{party.companyNumber}}].

1.4 We have appointed a Data Protection Officer ("DPO") who can be contacted at [{{contacts.dpoEmail}}] or [{{contacts.dpoAddress}}].

1.5 Please read this Privacy Policy carefully to understand our practices regarding your personal data. By accessing or using our services, website, or applications, you acknowledge that you have read and understood this Privacy Policy.

2. PERSONAL DATA WE COLLECT ABOUT YOU

2.1 We may collect, process, store, and use the following categories of personal data about you:

(a) Identity Data: first name, last name, username or similar identifier, title, date of birth, gender, and marital status;

(b) Contact Data: billing address, delivery address, email address, and telephone numbers;

(c) Financial Data: bank account details, payment card details, and other payment information;

(d) Transaction Data: details about payments to and from you and other details of services you have purchased from us;

(e) Technical Data: internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our services;

(f) Profile Data: your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses;

(g) Usage Data: information about how you use our services, products, and websites;

(h) Marketing and Communications Data: your preferences in receiving marketing from us and your communication preferences;

(i) [{{data.additionalCategoriesText}}].

2.2 We collect this data through various channels, including without limitation: direct interactions (when you fill in forms or correspond with us); automated technologies (through cookies and similar tracking technologies); third-party sources (including business partners, sub-contractors, advertising networks, analytics providers, and publicly available sources).

2.3 We also collect, use, and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data may be derived from your personal data but is not considered personal data under law as it does not directly or indirectly reveal your identity.

3. SPECIAL CATEGORY DATA

3.1 Where we need to process special category data (as defined in Article 9 of the UK GDPR), such as data revealing racial or ethnic origin, political opinions, religious beliefs, biometric data, or health data, we will do so only:

(a) with your explicit written consent; or

(b) as otherwise permitted or required by applicable law.

3.2 [{{data.specialCategoryText}}]

4. HOW WE USE YOUR PERSONAL DATA

4.1 We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:

(a) Performance of Contract: where we need to perform the contract we are about to enter into or have entered into with you;

(b) Legitimate Interests: where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests;

(c) Legal Obligation: where we need to comply with a legal or regulatory obligation;

(d) Consent: where you have given explicit consent to the processing.

4.2 We may process your personal data for the following purposes:

(a) to register you as a new customer or user;

(b) to process and deliver your orders, including without limitation managing payments, fees, charges, and collecting money owed to us;

(c) to manage our relationship with you, including without limitation notifying you about changes to our terms, this Privacy Policy, or our services;

(d) to administer and protect our business, website, and systems, including without limitation troubleshooting, data analysis, testing, system maintenance, support, reporting, and hosting of data;

(e) to deliver relevant website content and advertisements to you, and to measure or understand the effectiveness of the advertising we serve to you;

(f) to use data analytics to improve our website, services, marketing, customer relationships, and experiences;

(g) to make suggestions and recommendations to you about goods or services that may be of interest to you;

(h) [{{use.additionalPurposesText}}].

4.3 We will not use your personal data for any purpose that is incompatible with the purposes set out in this Privacy Policy without your prior written consent.

5. MARKETING

5.1 We may use your Identity, Contact, Technical, Usage, and Profile Data to form a view on what we think you may want or need, or what may be of interest to you. This is how we decide which products, services, and offers may be relevant to you.

5.2 You will receive marketing communications from us if you have: (a) requested information from us; or (b) purchased goods or services from us; or (c) otherwise given us your consent to receive marketing communications, and in each case you have not subsequently opted out of receiving such communications.

5.3 You can ask us to stop sending you marketing communications at any time by: (a) contacting us at [{{contacts.marketingOptOutEmail}}]; (b) updating your preferences in your account; or (c) using the unsubscribe link in any marketing email we send you.

5.4 Opting out of marketing communications will not apply to personal data provided to us as a result of a product or service purchase, warranty registration, or other transactions.

6. DISCLOSURES OF YOUR PERSONAL DATA

6.1 We may share your personal data with the following categories of third parties for the purposes set out in this Privacy Policy:

(a) any member of our corporate group, including without limitation our parent undertaking, subsidiaries, and affiliates;

(b) service providers and sub-contractors acting on our behalf, including without limitation payment processors, delivery partners, IT service providers, cloud storage providers, and marketing platforms;

(c) professional advisers, including without limitation solicitors, barristers, accountants, insurers, and auditors;

(d) analytics and search engine providers that assist us in the improvement and optimisation of our website;

(e) credit reference agencies and fraud prevention agencies;

(f) [{{sharing.additionalThirdPartiesText}}].

6.2 We may also share your personal data with third parties:

(a) in the event that we sell or buy any business or assets, in which case we may disclose your personal data to the prospective seller or buyer of such business or assets;

(b) if we or substantially all of our assets are acquired by a third party, in which case personal data held by us about our customers will be one of the transferred assets;

(c) if we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our terms of use or terms and conditions of supply; or to protect our rights, property, safety, or those of our customers or others.

7. INTERNATIONAL TRANSFERS

7.1 We may transfer your personal data to third parties located in countries outside the United Kingdom, including without limitation countries that may not provide the same level of data protection as the United Kingdom.

7.2 Where we transfer personal data outside the United Kingdom or the European Economic Area (EEA), we will ensure that appropriate safeguards are in place, such as:

(a) transfers to countries that have been deemed to provide an adequate level of protection for personal data by the Information Commissioner's Office (ICO);

(b) the use of Standard Contractual Clauses (SCCs) approved by the ICO;

(c) transfers with your explicit consent;

(d) other mechanisms permitted by applicable data protection law.

7.3 [{{international.safeguardsText}}]

8. DATA SECURITY

8.1 We have implemented appropriate technical and organisational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access, in particular without limitation:

(a) encryption of data where appropriate;

(b) regular penetration testing and vulnerability assessments;

(c) access controls and authentication measures;

(d) staff training on data protection and security;

(e) incident response and data breach notification procedures.

8.2 We have procedures in place to deal with any suspected personal data breach. We will notify you and any applicable regulator of a breach where we are legally required to do so.

8.3 Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.

9. DATA RETENTION

9.1 We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including without limitation for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.

9.2 To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure, the purposes for which we process your personal data, whether we can achieve those purposes through other means, and the applicable legal requirements.

9.3 Details of retention periods for different aspects of your personal data are available from us on request.

9.4 In some circumstances you can ask us to delete your data (see Clause 11 below).

10. YOUR LEGAL RIGHTS

10.1 Under certain circumstances, you have the following rights under data protection laws in relation to your personal data:

(a) Right of Access: to request access to your personal data (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it;

(b) Right of Rectification: to request correction of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected;

(c) Right to Erasure: to request erasure of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it;

(d) Right to Restriction of Processing: to request restriction of processing of your personal data. This enables you to ask us to suspend the processing of your personal data, for example if you want us to establish its accuracy or the reason for processing it;

(e) Right to Data Portability: to request the transfer of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format;

(f) Right to Object: to object to processing of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation that makes you want to object to processing on this ground;

(g) Right to Withdraw Consent: where we are processing your personal data based on your consent, you have the right to withdraw that consent at any time.

10.2 You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority for data protection matters, at [{{contacts.icoWebsite}}] or [{{contacts.icoAddress}}].

10.3 To exercise any of your rights, please contact us at [{{contacts.dataRightsEmail}}].

11. AUTOMATED DECISION-MAKING

11.1 We may use automated decision-making processes (including profiling) in the following circumstances:

(a) [{{automated.creditCheckText}}];

(b) [{{automated.fraudPreventionText}}];

(c) [{{automated.otherCircumstancesText}}].

11.2 You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you, unless an exception applies.

11.3 [{{automated.manualReviewText}}]

12. CHANGES TO THIS PRIVACY POLICY

12.1 We may update this Privacy Policy from time to time. Any changes we make to this Privacy Policy in the future will be posted on our website at [{{party.websiteUrl}}] and, where appropriate, notified to you by email.

12.2 This Privacy Policy was last updated on the date indicated at the top of this page. We encourage you to review this Privacy Policy periodically for any changes.

13. CONTACT US

13.1 If you have any questions about this Privacy Policy, including without limitation any requests to exercise your legal rights, please contact us at:

(a) Email: [{{contacts.generalEmail}}];

(b) Post: [{{contacts.generalAddress}}];

(c) Telephone: [{{contacts.telephone}}].

---
Template document. Not legal advice. This Privacy Policy template is for general commercial websites and online services. Not suitable if: you process large volumes of special category data (health, biometric, financial, children's data — additional policies and safeguards required); you operate in regulated sectors (financial services, healthcare, legal) with specific data protection obligations; you operate across multiple EU member states (consider GDPR Article 27 representative requirements); you use significant third-party data sharing arrangements (consider data processing agreements). This template must be reviewed by a qualified data protection lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND: LegendItem[] = [
  { path: 'party.companyName', label: 'Company legal name', type: 'string', required: true, example: 'Cobalt Digital Media Ltd' },
  { path: 'party.companyAddress', label: 'Company registered address', type: 'text', required: true, example: '200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'party.companyNumber', label: 'Company registration number', type: 'string', required: false, example: '12345678' },
  { path: 'party.websiteUrl', label: 'Website URL', type: 'string', required: false, example: 'https://www.cobaltdigitalmedia.co.uk' },
  { path: 'dates.lastUpdated', label: 'Last updated date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'contacts.dpoEmail', label: 'DPO email address', type: 'string', required: true, example: 'privacy@cobaltdigitalmedia.co.uk' },
  { path: 'contacts.dpoAddress', label: 'DPO postal address', type: 'text', required: false, example: 'Data Protection Officer, 200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'contacts.marketingOptOutEmail', label: 'Marketing opt-out email', type: 'string', required: false, example: 'unsubscribe@cobaltdigitalmedia.co.uk' },
  { path: 'contacts.generalEmail', label: 'General contact email', type: 'string', required: true, example: 'hello@cobaltdigitalmedia.co.uk' },
  { path: 'contacts.generalAddress', label: 'General contact address', type: 'text', required: false, example: '200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'contacts.telephone', label: 'Contact telephone', type: 'string', required: false, example: '+44 (0)20 7946 0958' },
  { path: 'contacts.icoWebsite', label: 'ICO website URL', type: 'string', required: false, example: 'www.ico.org.uk' },
  { path: 'contacts.icoAddress', label: 'ICO postal address', type: 'text', required: false, example: 'Information Commissioner\'s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF' },
  { path: 'contacts.dataRightsEmail', label: 'Data rights request email', type: 'string', required: false, example: 'dataprights@cobaltdigitalmedia.co.uk' },
  { path: 'data.additionalCategoriesText', label: 'Additional data categories text', type: 'text', required: false, example: 'Location Data: geographic location data collected when you enable location-based services on your device.' },
  { path: 'data.specialCategoryText', label: 'Special category data text', type: 'text', required: false, example: 'We may collect and process health data where you provide this information to us in connection with a service you have requested, for example in connection with accessibility requirements or dietary restrictions at events.' },
  { path: 'use.additionalPurposesText', label: 'Additional processing purposes text', type: 'text', required: false, example: 'to comply with our obligations under the Modern Slavery Act 2015 and to report on our supply chain practices.' },
  { path: 'sharing.additionalThirdPartiesText', label: 'Additional third parties text', type: 'text', required: false, example: 'government or regulatory authorities, law enforcement agencies, courts, or tribunals as required by applicable law.' },
  { path: 'international.safeguardsText', label: 'International transfer safeguards text', type: 'text', required: false, example: 'Where we transfer data to the United States, we rely on the EU-U.S. Data Privacy Framework as an appropriate safeguard under UK GDPR.' },
  { path: 'automated.creditCheckText', label: 'Automated credit check text', type: 'text', required: false, example: 'We may use credit reference agencies to assess your creditworthiness as part of our account application process, using automated decision-making to determine whether to offer you a credit account and the associated credit limit.' },
  { path: 'automated.fraudPreventionText', label: 'Fraud prevention text', type: 'text', required: false, example: 'We use automated systems to detect and prevent fraudulent transactions and to protect our customers and our business from fraudulent activity.' },
  { path: 'automated.otherCircumstancesText', label: 'Other automated decision-making text', type: 'text', required: false, example: 'We may use automated profiling to personalise your experience on our website and to recommend products and services that may be of interest to you.' },
  { path: 'automated.manualReviewText', label: 'Manual review text', type: 'text', required: false, example: 'Where we make decisions based solely on automated processing that significantly affect you, you have the right to request human intervention and to contest the decision. To exercise this right, please contact us at the details in Clause 13.' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const SLUG = 'privacy-policy';
  const TITLE = 'Privacy Policy';
  const CATEGORY = 'Compliance & Regulatory';
  const JURISDICTION = 'UK';
  const LABEL = 'United Kingdom (England & Wales)';

  const product = await prisma.product.upsert({
    where: { slug: SLUG },
    update: { status: ProductStatus.PUBLISHED, title: TITLE, category: CATEGORY },
    create: { slug: SLUG, title: TITLE, category: CATEGORY, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction: JURISDICTION } });
  if (!template) template = await prisma.template.create({ data: { productId: product.id, jurisdiction: JURISDICTION, name: TITLE, description: LABEL } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] ' + SLUG); return; }
  const v = await prisma.templateVersion.create({
    data: { version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(LEGEND), bodyTemplate: PRIVACY_UK, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(LEGEND)).issues;
  if (issues.length) console.warn('[WARN]', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + SLUG + ' (UK) — v=' + v.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());