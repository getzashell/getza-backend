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

const COOKIE_UK = `COOKIE POLICY

Title: Cookie Policy
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Last updated: [{{dates.lastUpdated}}]

1. INTRODUCTION

1.1 This Cookie Policy explains what cookies are and how [{{party.companyName}}] ("we", "us", "our") uses them on our website at [{{party.websiteUrl}}] (the "Website") and any related services.

1.2 A cookie is a small text file that is placed on your computer, tablet, mobile phone, or other device (each a "Device") when you visit a website. Cookies are widely used to make websites work or work more efficiently, as well as to provide information to the website operator.

1.3 This Cookie Policy should be read alongside our Privacy Policy, which explains how we use your personal data more generally.

2. TYPES OF COOKIES WE USE

2.1 We use the following categories of cookies on our Website:

(a) Strictly Necessary Cookies: these cookies are essential for the operation of our Website. They include, for example, cookies that enable you to log into secure areas of our Website, use a shopping cart, or make use of online payment services;

(b) Analytical or Performance Cookies: these cookies allow us to recognise and count the number of visitors to our Website and to see how visitors move around our Website. This helps us to improve the way our Website works, for example by ensuring that users are finding what they are looking for easily;

(c) Functionality Cookies: these cookies are used to recognise you when you return to our Website. This enables us to personalise our content for you, greet you by name, and remember your preferences (for example, your choice of language or region);

(d) Targeting or Advertising Cookies: these cookies record your visit to our Website, the pages you have visited, and the links you have followed. We will use this information to make our Website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose;

(e) [{{cookies.additionalCategoryText}}].

2.2 The specific cookies used on our Website, their purposes, and their providers are set out in Schedule 1 to this Cookie Policy.

3. THIRD-PARTY COOKIES

3.1 Some cookies are placed by third-party services that appear on our Website. We use third-party services including without limitation:

(a) Google Analytics: to analyse the use of our Website and to understand how visitors interact with our Website. Google Analytics uses cookies to collect information about how visitors use our Website. The information collected by these cookies will be transmitted to and stored by Google. For more information about Google Analytics cookies, see [{{thirdParties.googleAnalyticsInfoUrl}}];

(b) [{{thirdParties.otherServicesText}}].

3.2 Third-party cookies are governed by the privacy policies of the respective third parties. We do not accept any responsibility or liability for the privacy practices of any third-party services. You should review the relevant privacy policies of such third parties to understand how they use your personal data.

4. SPECIFIC COOKIES WE USE

4.1 The specific cookies used on our Website are described in Schedule 1. Schedule 1 forms part of this Cookie Policy and should be read in conjunction with it.

4.2 We may update the information contained in Schedule 1 from time to time to reflect changes in the cookies we use. We will endeavour to notify you of any significant changes, but we encourage you to review Schedule 1 regularly.

5. MANAGING YOUR COOKIE PREFERENCES

5.1 You may refuse to accept cookies by activating the setting on your browser that allows you to refuse the setting of cookies. The following links provide information on how to manage cookies in popular browsers:

(a) Google Chrome: [{{browserHelp.googleChrome}}];

(b) Mozilla Firefox: [{{browserHelp.mozillaFirefox}}];

(c) Apple Safari: [{{browserHelp.appleSafari}}];

(d) Microsoft Edge: [{{browserHelp.microsoftEdge}}];

(e) Opera: [{{browserHelp.opera}}].

5.2 If you use different devices to access our Website, you will need to ensure that each browser on each device is set to reflect your cookie preferences.

5.3 Disabling or refusing cookies may affect the functionality of our Website. In particular, you may not be able to access some parts of our Website or use some of the services we offer. If you block strictly necessary cookies, certain features of our Website may not function correctly.

6. UPDATES TO THIS COOKIE POLICY

6.1 We may update this Cookie Policy from time to time. Any changes we make to this Cookie Policy will be posted on our Website and, where appropriate, notified to you by email.

6.2 This Cookie Policy was last updated on the date indicated at the top of this page. We encourage you to review this Cookie Policy periodically for any changes.

7. CONTACT US

7.1 If you have any questions about this Cookie Policy or our use of cookies, please contact us at:

(a) Email: [{{contacts.cookieEmail}}];

(b) Post: [{{contacts.cookieAddress}}];

SCHEDULE 1: COOKIES USED ON THIS WEBSITE

The following table sets out the specific cookies used on this Website:

| Cookie Name | Provider | Purpose | Type | Duration |
|-------------|----------|---------|------|----------|
| [{{schedule.cookie1Name}}] | [{{schedule.cookie1Provider}}] | [{{schedule.cookie1Purpose}}] | [{{schedule.cookie1Type}}] | [{{schedule.cookie1Duration}}] |
| [{{schedule.cookie2Name}}] | [{{schedule.cookie2Provider}}] | [{{schedule.cookie2Purpose}}] | [{{schedule.cookie2Type}}] | [{{schedule.cookie2Duration}}] |
| [{{schedule.cookie3Name}}] | [{{schedule.cookie3Provider}}] | [{{schedule.cookie3Purpose}}] | [{{schedule.cookie3Type}}] | [{{schedule.cookie3Duration}}] |
| [{{schedule.cookie4Name}}] | [{{schedule.cookie4Provider}}] | [{{schedule.cookie4Purpose}}] | [{{schedule.cookie4Type}}] | [{{schedule.cookie4Duration}}] |
| [{{schedule.cookie5Name}}] | [{{schedule.cookie5Provider}}] | [{{schedule.cookie5Purpose}}] | [{{schedule.cookie5Type}}] | [{{schedule.cookie5Duration}}] |

---
Template document. Not legal advice. This Cookie Policy template is for general commercial websites. Not suitable if: your website uses a significant number of third-party advertising or tracking cookies (additional disclosures and consent mechanisms required under the Privacy and Electronic Communications Regulations 2003 and the UK GDPR); you operate in regulated sectors with specific cookie and tracking requirements; your website uses cookies to process children's data (additional age-gating and consent requirements apply under the Age Appropriate Design Code). This template must be reviewed by a qualified lawyer before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND: LegendItem[] = [
  { path: 'party.companyName', label: 'Company legal name', type: 'string', required: true, example: 'Cobalt Digital Media Ltd' },
  { path: 'party.websiteUrl', label: 'Website URL', type: 'string', required: true, example: 'https://www.cobaltdigitalmedia.co.uk' },
  { path: 'dates.lastUpdated', label: 'Last updated date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'cookies.additionalCategoryText', label: 'Additional cookie category text', type: 'text', required: false, example: 'Social Media Cookies: these cookies allow you to share content from our Website on social media platforms such as Facebook, Twitter, and LinkedIn. These cookies are governed by the privacy policies of the respective social media platforms.' },
  { path: 'thirdParties.googleAnalyticsInfoUrl', label: 'Google Analytics cookie info URL', type: 'string', required: false, example: 'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage' },
  { path: 'thirdParties.otherServicesText', label: 'Other third party services text', type: 'text', required: false, example: 'Hotjar: to understand how users interact with our Website and to identify areas for improvement. Hotjar uses cookies to collect non-personal information about how visitors use our Website, including without limitation the pages visited, the links clicked, and the time spent on each page. For more information, see Hotjar\'s privacy policy at https://www.hotjar.com/legal/policies/privacy.' },
  { path: 'browserHelp.googleChrome', label: 'Google Chrome cookie help URL', type: 'string', required: false, example: 'https://support.google.com/chrome/answer/95647' },
  { path: 'browserHelp.mozillaFirefox', label: 'Mozilla Firefox cookie help URL', type: 'string', required: false, example: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
  { path: 'browserHelp.appleSafari', label: 'Apple Safari cookie help URL', type: 'string', required: false, example: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { path: 'browserHelp.microsoftEdge', label: 'Microsoft Edge cookie help URL', type: 'string', required: false, example: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
  { path: 'browserHelp.opera', label: 'Opera cookie help URL', type: 'string', required: false, example: 'https://www.opera.com/help/tutorials/security/privacy' },
  { path: 'contacts.cookieEmail', label: 'Cookie enquiry email', type: 'string', required: true, example: 'privacy@cobaltdigitalmedia.co.uk' },
  { path: 'contacts.cookieAddress', label: 'Cookie enquiry address', type: 'text', required: false, example: '200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'schedule.cookie1Name', label: 'Cookie 1 name', type: 'string', required: false, example: '_ga' },
  { path: 'schedule.cookie1Provider', label: 'Cookie 1 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie1Purpose', label: 'Cookie 1 purpose', type: 'string', required: false, example: 'Used to distinguish users. Analytical/performance cookie.' },
  { path: 'schedule.cookie1Type', label: 'Cookie 1 type', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Analytical/Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Analytical/Performance' },
  { path: 'schedule.cookie1Duration', label: 'Cookie 1 duration', type: 'string', required: false, example: '2 years' },
  { path: 'schedule.cookie2Name', label: 'Cookie 2 name', type: 'string', required: false, example: '_gid' },
  { path: 'schedule.cookie2Provider', label: 'Cookie 2 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie2Purpose', label: 'Cookie 2 purpose', type: 'string', required: false, example: 'Used to distinguish users. Analytical/performance cookie.' },
  { path: 'schedule.cookie2Type', label: 'Cookie 2 type', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Analytical/Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Analytical/Performance' },
  { path: 'schedule.cookie2Duration', label: 'Cookie 2 duration', type: 'string', required: false, example: '24 hours' },
  { path: 'schedule.cookie3Name', label: 'Cookie 3 name', type: 'string', required: false, example: '_gat_UA-12345678-1' },
  { path: 'schedule.cookie3Provider', label: 'Cookie 3 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie3Purpose', label: 'Cookie 3 purpose', type: 'string', required: false, example: 'Used to throttle request rate. Analytical/performance cookie.' },
  { path: 'schedule.cookie3Type', label: 'Cookie 3 type', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Analytical/Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Analytical/Performance' },
  { path: 'schedule.cookie3Duration', label: 'Cookie 3 duration', type: 'string', required: false, example: '1 minute' },
  { path: 'schedule.cookie4Name', label: 'Cookie 4 name', type: 'string', required: false, example: 'cookie_consent_status' },
  { path: 'schedule.cookie4Provider', label: 'Cookie 4 provider', type: 'string', required: false, example: 'First party' },
  { path: 'schedule.cookie4Purpose', label: 'Cookie 4 purpose', type: 'string', required: false, example: 'Records user\'s cookie consent preferences. Strictly necessary.' },
  { path: 'schedule.cookie4Type', label: 'Cookie 4 type', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Analytical/Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Strictly Necessary' },
  { path: 'schedule.cookie4Duration', label: 'Cookie 4 duration', type: 'string', required: false, example: '1 year' },
  { path: 'schedule.cookie5Name', label: 'Cookie 5 name', type: 'string', required: false, example: 'session_id' },
  { path: 'schedule.cookie5Provider', label: 'Cookie 5 provider', type: 'string', required: false, example: 'First party' },
  { path: 'schedule.cookie5Purpose', label: 'Cookie 5 purpose', type: 'string', required: false, example: 'Maintains user session state. Strictly necessary.' },
  { path: 'schedule.cookie5Type', label: 'Cookie 5 type', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Analytical/Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Strictly Necessary' },
  { path: 'schedule.cookie5Duration', label: 'Cookie 5 duration', type: 'string', required: false, example: 'Session' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seed() {
  const SLUG = 'cookie-policy';
  const TITLE = 'Cookie Policy';
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
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(LEGEND), bodyTemplate: COOKIE_UK, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(LEGEND)).issues;
  if (issues.length) console.warn('[WARN]', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + SLUG + ' (UK) — v=' + v.id);
}

seed().catch(console.error).finally(() => prisma.$disconnect());