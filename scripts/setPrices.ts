/**
 * Getza — Price all products
 * Run: cd /home/shell/Desktop/Getza/backend && npx ts-node --transpile-only scripts/setPrices.ts
 *
 * One StripePrice per product. Jurisdiction is selected on the product page
 * before purchase (stored on the Template model, not on StripePrice).
 *
 * Price matrix (GBP):
 *   Confidentiality (NDA):              £15  — simple, high volume
 *   Employment / HR (offer letters):    £15  — simple
 *   Employment (contracts):              £19–£25
 *   Settlement Agreement:               £35  — moderate complexity
 *   Corporate & Commercial:            £45  — complex
 *   Property & Real Estate:          £35–£49
 *   Wills, Trusts & Estate:           £35  — specialist
 *   Compliance (GDPR/cookies):         £25–£35
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PRODUCT_PRICES: Record<string, number> = {
  'nda-mutual':                1500,
  'one-way-nda':               1500,
  'employment-offer-letter':   1500,
  'job-offer-letter':          1900,
  'part-time-zero-hours-contract': 1900,
  'full-time-employment-contract':  2500,
  'contractor-agreement':         2500,
  'settlement-agreement':          3500,
  'freelance-service-agreement':   1900,
  'subscription-legal-pack':        4900,
  'partnership-agreement':         4500,
  'master-services-agreement':     4500,
  'commercial-lease':             4900,
  'residential-tenancy-agreement': 3500,
  'last-will-testament':          3500,
  'power-of-attorney':            3500,
  'cookie-policy':                2500,
  'privacy-policy':               3500,
  'data-processing-addendum':     3500,
};

async function upsertPrice(productId: string, pence: number) {
  const existing = await prisma.stripePrice.findFirst({
    where: { productId },
  });

  if (existing) {
    return prisma.stripePrice.update({
      where: { id: existing.id },
      data: { unitAmount: pence, currency: 'gbp', isActive: true },
    });
  } else {
    return prisma.stripePrice.create({
      data: {
        productId,
        stripePriceId: `price_${productId.replace(/-/g, '')}`,
        currency: 'gbp',
        unitAmount: pence,
        isActive: true,
      },
    });
  }
}

async function main() {
  const products = await prisma.product.findMany();
  const results: string[] = [];
  let skipped = 0;

  for (const product of products) {
    const pence = PRODUCT_PRICES[product.slug];
    if (pence === undefined) {
      console.log(`⚠️  No price for: ${product.slug}`);
      skipped++;
      continue;
    }

    await upsertPrice(product.id, pence);
    results.push(`${product.slug.padEnd(42)} £${(pence / 100).toFixed(2)}`);
  }

  console.log('=== Getza — Prices Applied ===');
  results.forEach(r => console.log(' ', r));
  console.log(`\n${results.length} products priced, ${skipped} skipped`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());