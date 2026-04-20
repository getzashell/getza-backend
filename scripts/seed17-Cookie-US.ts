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

// ─── COOKIE POLICY — US ───────────────────────────────────────────────────────

const COOKIE_US = `COOKIE POLICY

Title: Cookie Policy
Version: 1
Jurisdiction: United States of America

Last updated: [{{dates.lastUpdated}}]

1. INTRODUCTION

1.1 This Cookie Policy ("Policy") explains how [{{party.companyName}}] ("we", "us", "our", or the "Company") uses cookies and similar tracking technologies on our website at [{{party.websiteUrl}}] (the "Website").

1.2 A "cookie" is a small text file that a website places on your computer, mobile phone, tablet, or other device when you visit the Website. Cookies help to ensure the proper functioning of the Website, to improve your browsing experience, and to provide the Website operator with information about how you use the Website.

1.3 This Cookie Policy should be read alongside our Privacy Policy, which provides further information about how we use your personal information.

2. TYPES OF COOKIES WE USE

2.1 We use the following categories of cookies on the Website:

(a) Strictly Necessary Cookies: these cookies are essential for the Website to function properly. They enable core functionality such as security, network management, and accessibility. You may not opt out of Strictly Necessary Cookies as their removal may impair your ability to use the Website;

(b) Performance Cookies: these cookies collect information about how visitors use the Website, such as which pages are visited most frequently and whether visitors encounter error messages from web pages. All information collected by Performance Cookies is aggregated and anonymous. The data collected is used solely to improve the functionality and user experience of the Website;

(c) Functionality Cookies: these cookies allow the Website to remember choices you make (such as your username, language, or region) and provide enhanced, personalised features. Functionality Cookies may also be used to enable interactive features such as video playback and social media integration;

(d) Targeting or Advertising Cookies: these cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see a particular advertisement and to help measure the effectiveness of advertising campaigns. Targeting or Advertising Cookies may be placed by third-party advertising networks with our permission;

(e) [{{cookies.additionalCategoryText}}].

2.2 For more information about each category of cookie, see Section 4 below.

3. THIRD-PARTY COOKIES

3.1 Some cookies are placed by third-party services that appear on the Website. These third parties may include without limitation:

(a) Google Analytics: we use Google Analytics to help us understand how visitors interact with the Website. Google Analytics uses cookies to collect information about how visitors use the Website, including without limitation the pages visited, the time spent on each page, and the referring URL. The information collected by Google Analytics cookies will be transmitted to and stored by Google. For more information about Google Analytics cookies, visit [{{thirdParties.googleAnalyticsUrl}}];

(b) [{{thirdParties.otherServicesText}}].

3.2 Third-party cookies are governed by the privacy policies of the respective third-party providers. We do not accept any responsibility or liability for the privacy practices of any third-party cookie provider. We encourage you to review the privacy policies of such third parties.

4. SPECIFIC COOKIES WE USE

4.1 The following table sets out the specific cookies used on the Website, their providers, purposes, and durations:

| Cookie Name | Provider | Purpose | Category | Duration |
|-------------|----------|---------|----------|----------|
| [{{schedule.cookie1Name}}] | [{{schedule.cookie1Provider}}] | [{{schedule.cookie1Purpose}}] | [{{schedule.cookie1Category}}] | [{{schedule.cookie1Duration}}] |
| [{{schedule.cookie2Name}}] | [{{schedule.cookie2Provider}}] | [{{schedule.cookie2Purpose}}] | [{{schedule.cookie2Category}}] | [{{schedule.cookie2Duration}}] |
| [{{schedule.cookie3Name}}] | [{{schedule.cookie3Provider}}] | [{{schedule.cookie3Purpose}}] | [{{schedule.cookie3Category}}] | [{{schedule.cookie3Duration}}] |
| [{{schedule.cookie4Name}}] | [{{schedule.cookie4Provider}}] | [{{schedule.cookie4Purpose}}] | [{{schedule.cookie4Category}}] | [{{schedule.cookie4Duration}}] |
| [{{schedule.cookie5Name}}] | [{{schedule.cookie5Provider}}] | [{{schedule.cookie5Purpose}}] | [{{schedule.cookie5Category}}] | [{{schedule.cookie5Duration}}] |

4.2 We may update the information in the table above from time to time to reflect changes in the cookies we use.

5. MANAGING YOUR COOKIE PREFERENCES

5.1 You may refuse to accept cookies by activating the setting on your browser that allows you to refuse the setting of cookies. The following links provide information on how to manage cookies in popular browsers:

(a) Google Chrome: [{{browserHelp.googleChrome}}];

(b) Mozilla Firefox: [{{browserHelp.mozillaFirefox}}];

(c) Apple Safari: [{{browserHelp.appleSafari}}];

(d) Microsoft Edge: [{{browserHelp.microsoftEdge}}];

(e) Opera: [{{browserHelp.opera}}].

5.2 If you use different devices to access the Website, you will need to ensure that each browser on each device is set to reflect your cookie preferences.

5.3 Please note that disabling or refusing cookies may affect the functionality of the Website. In particular, you may not be able to access some parts of the Website or use some of the services we offer.

6. DO NOT TRACK

6.1 Some web browsers may transmit "Do Not Track" signals to the websites you visit. Because there is no industry standard for how Do Not Track signals should be interpreted, we do not currently respond to Do Not Track browser settings. For more information about Do Not Track, visit [{{browserHelp.doNotTrack}}].

7. CHANGES TO THIS POLICY

7.1 We may update this Cookie Policy from time to time. Any changes we make to this Cookie Policy will be posted on this page and, where appropriate, notified to you by email.

7.2 This Cookie Policy was last updated on the date indicated at the top of this page. We encourage you to review this Cookie Policy periodically for any changes.

8. CONTACT US

8.1 If you have any questions about this Cookie Policy or our use of cookies, please contact us at:

(a) Email: [{{contacts.cookieEmail}}];

(b) Mail: [{{contacts.cookieAddress}}].

---
Template document. Not legal advice. Not suitable if: your website is directed at children under 13 years of age (COPPA compliance required — additional disclosures, verifiable parental consent mechanisms, and data collection restrictions apply); your business is subject to state-specific privacy laws (e.g., California Online Privacy Protection Act (CalOPPA) requires conspicuous disclosure of cookie and tracking practices; California's CPRA and the California CCPA require specific cookie consent mechanisms for sale/sharing of personal information); your website uses significant third-party advertising or tracking cookies that constitute "selling" or "sharing" of personal information under applicable state privacy laws. This template reflects general U.S. commercial website practice and must be reviewed by a qualified privacy attorney before use. Jurisdiction: United States of America (state and federal laws apply).`;

const LEGEND_COOKIE_US: LegendItem[] = [
  { path: 'party.companyName', label: 'Company legal name', type: 'string', required: true, example: 'Cobalt Digital Media Inc.' },
  { path: 'party.websiteUrl', label: 'Website URL', type: 'string', required: true, example: 'https://www.cobaltdigitalmedia.com' },
  { path: 'dates.lastUpdated', label: 'Last updated date', type: 'date', required: true, example: '2025-06-01' },
  { path: 'cookies.additionalCategoryText', label: 'Additional cookie category text', type: 'text', required: false, example: 'Social Media Cookies: these cookies allow you to share content from our Website on social media platforms. These cookies are governed by the privacy policies of the respective social media platforms, including without limitation Facebook, Twitter, and LinkedIn.' },
  { path: 'thirdParties.googleAnalyticsUrl', label: 'Google Analytics cookie info URL', type: 'string', required: false, example: 'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage' },
  { path: 'thirdParties.otherServicesText', label: 'Other third party services text', type: 'text', required: false, example: 'Hotjar: to understand how users interact with our Website and to identify areas for improvement. Hotjar uses cookies to collect non-personal information about how visitors use our Website. For more information, visit Hotjar\'s privacy policy at https://www.hotjar.com/legal/policies/privacy.' },
  { path: 'browserHelp.googleChrome', label: 'Google Chrome cookie help URL', type: 'string', required: false, example: 'https://support.google.com/chrome/answer/95647' },
  { path: 'browserHelp.mozillaFirefox', label: 'Mozilla Firefox cookie help URL', type: 'string', required: false, example: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
  { path: 'browserHelp.appleSafari', label: 'Apple Safari cookie help URL', type: 'string', required: false, example: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { path: 'browserHelp.microsoftEdge', label: 'Microsoft Edge cookie help URL', type: 'string', required: false, example: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
  { path: 'browserHelp.opera', label: 'Opera cookie help URL', type: 'string', required: false, example: 'https://www.opera.com/help/tutorials/security/privacy' },
  { path: 'browserHelp.doNotTrack', label: 'Do Not Track info URL', type: 'string', required: false, example: 'https://www.allaboutdnt.com' },
  { path: 'contacts.cookieEmail', label: 'Cookie enquiry email', type: 'string', required: true, example: 'privacy@cobaltdigitalmedia.com' },
  { path: 'contacts.cookieAddress', label: 'Cookie enquiry mailing address', type: 'text', required: false, example: '200 Aldersgate Street, Suite 1200, New York, NY 10022' },
  { path: 'schedule.cookie1Name', label: 'Cookie 1 name', type: 'string', required: false, example: '_ga' },
  { path: 'schedule.cookie1Provider', label: 'Cookie 1 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie1Purpose', label: 'Cookie 1 purpose', type: 'string', required: false, example: 'Distinguishes unique users. Performance cookie.' },
  { path: 'schedule.cookie1Category', label: 'Cookie 1 category', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Performance' },
  { path: 'schedule.cookie1Duration', label: 'Cookie 1 duration', type: 'string', required: false, example: '2 years' },
  { path: 'schedule.cookie2Name', label: 'Cookie 2 name', type: 'string', required: false, example: '_gid' },
  { path: 'schedule.cookie2Provider', label: 'Cookie 2 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie2Purpose', label: 'Cookie 2 purpose', type: 'string', required: false, example: 'Distinguishes users within a session. Performance cookie.' },
  { path: 'schedule.cookie2Category', label: 'Cookie 2 category', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Performance' },
  { path: 'schedule.cookie2Duration', label: 'Cookie 2 duration', type: 'string', required: false, example: '24 hours' },
  { path: 'schedule.cookie3Name', label: 'Cookie 3 name', type: 'string', required: false, example: '_gat_UA-12345678-1' },
  { path: 'schedule.cookie3Provider', label: 'Cookie 3 provider', type: 'string', required: false, example: 'Google Analytics' },
  { path: 'schedule.cookie3Purpose', label: 'Cookie 3 purpose', type: 'string', required: false, example: 'Throttles request rate. Performance cookie.' },
  { path: 'schedule.cookie3Category', label: 'Cookie 3 category', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Performance' },
  { path: 'schedule.cookie3Duration', label: 'Cookie 3 duration', type: 'string', required: false, example: '1 minute' },
  { path: 'schedule.cookie4Name', label: 'Cookie 4 name', type: 'string', required: false, example: 'cookie_consent_status' },
  { path: 'schedule.cookie4Provider', label: 'Cookie 4 provider', type: 'string', required: false, example: 'First party' },
  { path: 'schedule.cookie4Purpose', label: 'Cookie 4 purpose', type: 'string', required: false, example: 'Records user\'s cookie consent preferences. Strictly Necessary.' },
  { path: 'schedule.cookie4Category', label: 'Cookie 4 category', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Strictly Necessary' },
  { path: 'schedule.cookie4Duration', label: 'Cookie 4 duration', type: 'string', required: false, example: '1 year' },
  { path: 'schedule.cookie5Name', label: 'Cookie 5 name', type: 'string', required: false, example: 'session_id' },
  { path: 'schedule.cookie5Provider', label: 'Cookie 5 provider', type: 'string', required: false, example: 'First party' },
  { path: 'schedule.cookie5Purpose', label: 'Cookie 5 purpose', type: 'string', required: false, example: 'Maintains user session state. Strictly Necessary.' },
  { path: 'schedule.cookie5Category', label: 'Cookie 5 category', type: 'enum', required: false, rules: { options: ['Strictly Necessary', 'Performance', 'Functionality', 'Targeting/Advertising', 'Social Media'] }, example: 'Strictly Necessary' },
  { path: 'schedule.cookie5Duration', label: 'Cookie 5 duration', type: 'string', required: false, example: 'Session' },
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
  await seedProduct('cookie-policy', 'Cookie Policy', 'Compliance & Regulatory', 'US', 'United States of America', COOKIE_US, LEGEND_COOKIE_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());