"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const inputSchema = {
    type: 'object',
    properties: {
        fullName: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        address: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },
        startDate: { type: 'string', format: 'date' },
        role: { type: 'string' },
    },
    required: ['fullName', 'email', 'country'],
};
const products = [
    {
        slug: 'freelance-service-agreement',
        title: 'Freelance Service Agreement',
        category: 'Legal',
        subcategory: 'Contracts',
        descriptionRte: { kind: 'doc', content: [{ type: 'paragraph', content: [{ text: 'Service agreement between a freelancer and client.', type: 'text' }] }] },
        type: client_1.ProductType.SINGLE,
        status: client_1.ProductStatus.PUBLISHED,
        templates: [
            {
                name: 'Freelance Service Agreement (UK)',
                jurisdiction: client_1.Jurisdiction.UK,
                description: 'Standard freelance engagement terms for UK-based work.',
                versions: [
                    {
                        version: 1,
                        inputSchemaJson: inputSchema,
                        promptTemplate: 'Draft a service agreement between {{fullName}} and a client based in {{country}} starting {{startDate}}.',
                        outputFormat: client_1.OutputFormat.PDF,
                        isActive: true,
                    },
                ],
            },
        ],
        stripePrice: { stripePriceId: 'price_freelance_service', currency: 'usd', unitAmount: 9900 },
    },
    {
        slug: 'employment-offer-letter',
        title: 'Employment Offer Letter',
        category: 'HR',
        subcategory: 'Hiring',
        descriptionRte: { kind: 'doc', content: [{ type: 'paragraph', content: [{ text: 'Offer letter template with role, comp, and start date.', type: 'text' }] }] },
        type: client_1.ProductType.SINGLE,
        status: client_1.ProductStatus.PUBLISHED,
        templates: [
            {
                name: 'Offer Letter (US)',
                jurisdiction: client_1.Jurisdiction.US,
                description: 'US compliant offer letter for full-time employees.',
                versions: [
                    {
                        version: 1,
                        inputSchemaJson: {
                            type: 'object',
                            properties: {
                                fullName: { type: 'string' },
                                role: { type: 'string' },
                                startDate: { type: 'string', format: 'date' },
                                salary: { type: 'number' },
                                location: { type: 'string' },
                            },
                            required: ['fullName', 'role', 'startDate', 'salary'],
                        },
                        promptTemplate: 'Write an offer letter for {{fullName}} to join as {{role}} in {{location}} on {{startDate}} with salary {{salary}}.',
                        outputFormat: client_1.OutputFormat.BOTH,
                        isActive: true,
                    },
                ],
            },
        ],
        stripePrice: { stripePriceId: 'price_offer_letter', currency: 'usd', unitAmount: 5900 },
    },
    {
        slug: 'nda-mutual',
        title: 'Mutual NDA',
        category: 'Legal',
        subcategory: 'Compliance',
        descriptionRte: { kind: 'doc', content: [{ type: 'paragraph', content: [{ text: 'Mutual confidentiality agreement for partners.', type: 'text' }] }] },
        type: client_1.ProductType.SINGLE,
        status: client_1.ProductStatus.PUBLISHED,
        templates: [
            {
                name: 'Mutual NDA (EU)',
                jurisdiction: client_1.Jurisdiction.EU,
                description: 'Covers confidentiality and data handling for EU teams.',
                versions: [
                    {
                        version: 1,
                        inputSchemaJson: {
                            type: 'object',
                            properties: {
                                discloserName: { type: 'string' },
                                recipientName: { type: 'string' },
                                purpose: { type: 'string' },
                                governingLaw: { type: 'string', enum: ['UK', 'DE', 'FR', 'ES', 'IT', 'NL'] },
                                termMonths: { type: 'integer', minimum: 1 },
                            },
                            required: ['discloserName', 'recipientName', 'purpose', 'governingLaw'],
                        },
                        promptTemplate: 'Create a mutual NDA between {{discloserName}} and {{recipientName}} for {{purpose}} governed by {{governingLaw}} law.',
                        outputFormat: client_1.OutputFormat.PDF,
                        isActive: true,
                    },
                ],
            },
        ],
        stripePrice: { stripePriceId: 'price_mutual_nda', currency: 'usd', unitAmount: 4900 },
    },
    {
        slug: 'data-processing-addendum',
        title: 'Data Processing Addendum',
        category: 'Compliance',
        subcategory: 'Privacy',
        descriptionRte: { kind: 'doc', content: [{ type: 'paragraph', content: [{ text: 'DPA aligned with GDPR/UK GDPR.', type: 'text' }] }] },
        type: client_1.ProductType.BUNDLE,
        status: client_1.ProductStatus.PUBLISHED,
        templates: [
            {
                name: 'DPA (EU/UK)',
                jurisdiction: client_1.Jurisdiction.EU,
                description: 'Standard data processing terms for controllers/processors.',
                versions: [
                    {
                        version: 1,
                        inputSchemaJson: {
                            type: 'object',
                            properties: {
                                controllerName: { type: 'string' },
                                processorName: { type: 'string' },
                                dataTypes: { type: 'array', items: { type: 'string' } },
                                transferMechanism: { type: 'string', enum: ['SCCs', 'BCRs', 'Not applicable'] },
                            },
                            required: ['controllerName', 'processorName', 'dataTypes'],
                        },
                        promptTemplate: 'Draft a DPA between {{controllerName}} and {{processorName}} covering {{dataTypes}}.',
                        outputFormat: client_1.OutputFormat.DOCX,
                        isActive: true,
                    },
                ],
            },
        ],
        stripePrice: { stripePriceId: 'price_dpa_bundle', currency: 'usd', unitAmount: 12900 },
    },
    {
        slug: 'subscription-legal-pack',
        title: 'Subscription Legal Pack',
        category: 'Legal',
        subcategory: 'Subscription',
        descriptionRte: { kind: 'doc', content: [{ type: 'paragraph', content: [{ text: 'Ongoing access to template updates and support.', type: 'text' }] }] },
        type: client_1.ProductType.SUBSCRIPTION,
        status: client_1.ProductStatus.PUBLISHED,
        templates: [
            {
                name: 'Template Library Access',
                jurisdiction: client_1.Jurisdiction.US,
                description: 'Access to library of evolving templates.',
                versions: [
                    {
                        version: 1,
                        inputSchemaJson: {
                            type: 'object',
                            properties: {
                                companyName: { type: 'string' },
                                adminEmail: { type: 'string', format: 'email' },
                                seats: { type: 'integer', minimum: 1 },
                            },
                            required: ['companyName', 'adminEmail'],
                        },
                        promptTemplate: 'Configure subscription access for {{companyName}} with {{seats}} seats.',
                        outputFormat: client_1.OutputFormat.BOTH,
                        isActive: true,
                    },
                ],
            },
        ],
        stripePrice: { stripePriceId: 'price_subscription_pack', currency: 'usd', unitAmount: 2900, recurringInterval: 'month' },
    },
];
async function main() {
    for (const seed of products) {
        const product = await prisma.product.upsert({
            where: { slug: seed.slug },
            update: {
                title: seed.title,
                category: seed.category,
                subcategory: seed.subcategory,
                descriptionRte: seed.descriptionRte,
                type: seed.type,
                status: seed.status || client_1.ProductStatus.PUBLISHED,
            },
            create: {
                slug: seed.slug,
                title: seed.title,
                category: seed.category,
                subcategory: seed.subcategory,
                descriptionRte: seed.descriptionRte,
                type: seed.type,
                status: seed.status || client_1.ProductStatus.PUBLISHED,
            },
        });
        for (const tmpl of seed.templates) {
            const template = (await prisma.template.findFirst({ where: { productId: product.id, name: tmpl.name } })) ||
                (await prisma.template.create({
                    data: {
                        productId: product.id,
                        name: tmpl.name,
                        jurisdiction: tmpl.jurisdiction,
                        description: tmpl.description,
                    },
                }));
            for (const version of tmpl.versions) {
                await prisma.templateVersion.upsert({
                    where: {
                        templateId_version: { templateId: template.id, version: version.version },
                    },
                    update: {
                        inputSchemaJson: version.inputSchemaJson,
                        promptTemplate: version.promptTemplate,
                        outputFormat: version.outputFormat,
                        isActive: version.isActive ?? false,
                    },
                    create: {
                        templateId: template.id,
                        version: version.version,
                        inputSchemaJson: version.inputSchemaJson,
                        promptTemplate: version.promptTemplate,
                        outputFormat: version.outputFormat,
                        isActive: version.isActive ?? false,
                    },
                });
            }
        }
        if (seed.stripePrice) {
            await prisma.stripePrice.upsert({
                where: { stripePriceId: seed.stripePrice.stripePriceId },
                update: {
                    productId: product.id,
                    currency: seed.stripePrice.currency,
                    unitAmount: seed.stripePrice.unitAmount,
                    recurringInterval: seed.stripePrice.recurringInterval || null,
                    isActive: true,
                },
                create: {
                    productId: product.id,
                    stripePriceId: seed.stripePrice.stripePriceId,
                    currency: seed.stripePrice.currency,
                    unitAmount: seed.stripePrice.unitAmount,
                    recurringInterval: seed.stripePrice.recurringInterval || null,
                    isActive: true,
                },
            });
        }
    }
}
main()
    .catch((e) => {
    console.error('Seed failed', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
