/**
 * Getza — Create Stripe products and prices for all priced products
 * Run: cd /home/shell/Desktop/Getza/backend && npx ts-node --transpile-only scripts/createStripeProducts.ts
 *
 * Creates real Stripe products + prices, then updates the DB.
 * Stripe secret key must be set in backend/.env
 */
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const prisma = new PrismaClient();

const PRODUCT_STRIPE_NAMES: Record<string, string> = {
  'nda-mutual':                'Mutual NDA',
  'one-way-nda':               'One-Way NDA',
  'employment-offer-letter':   'Employment Offer Letter',
  'job-offer-letter':          'Job Offer Letter',
  'part-time-zero-hours-contract': 'Part-Time / Zero-Hours Contract',
  'full-time-employment-contract':  'Full-Time Employment Contract',
  'contractor-agreement':       'Contractor Agreement',
  'settlement-agreement':       'Settlement Agreement',
  'freelance-service-agreement': 'Freelance Service Agreement',
  'subscription-legal-pack':    'Subscription Legal Pack',
  'partnership-agreement':      'Partnership Agreement',
  'master-services-agreement':  'Master Services Agreement',
  'commercial-lease':          'Commercial Lease',
  'residential-tenancy-agreement': 'Residential Tenancy Agreement',
  'last-will-testament':        'Last Will & Testament',
  'power-of-attorney':          'Power of Attorney',
  'cookie-policy':              'Cookie Policy',
  'privacy-policy':             'Privacy Policy',
  'data-processing-addendum':   'Data Processing Addendum',
};

async function createStripeProduct(slug: string, name: string, pence: number): Promise<string> {
  // Create product in Stripe
  const product = await stripe.products.create({
    name: `Getza — ${name}`,
    description: `Legal document template: ${name}`,
    metadata: { slug },
  });

  // Create price for that product
  const price = await stripe.prices.create({
    product: product.id,
    unitAmount: pence,
    currency: 'gbp',
    billing_scheme: 'per_unit',
  });

  return price.id; // Stripe price ID to store in DB
}

async function main() {
  const products = await prisma.product.findMany();
  const results: string[] = [];
  const errors: string[] = [];

  for (const product of products) {
    const dbPrice = await prisma.stripePrice.findFirst({ where: { productId: product.id } });
    if (!dbPrice) {
      console.log(`⚠️  No DB price for ${product.slug}, skipping`);
      continue;
    }

    try {
      console.log(`Creating Stripe product for: ${product.slug} …`);
      const stripePriceId = await createStripeProduct(
        product.slug,
        PRODUCT_STRIPE_NAMES[product.slug] ?? product.title,
        dbPrice.unitAmount
      );

      // Update DB with real Stripe price ID
      await prisma.stripePrice.update({
        where: { id: dbPrice.id },
        data: { stripePriceId },
      });

      results.push(`${product.slug.padEnd(42)} → ${stripePriceId}`);
    } catch (err: any) {
      console.error(`✗ Error for ${product.slug}: ${err.message}`);
      errors.push(`${product.slug}: ${err.message}`);
    }
  }

  console.log('\n=== Stripe Products Created ===');
  results.forEach(r => console.log(' ', r));
  if (errors.length) {
    console.log('\n=== Errors ===');
    errors.forEach(e => console.log(' ', e));
  }
  console.log(`\n${results.length} created, ${errors.length} failed`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());