import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = secretKey ? new Stripe(secretKey, { apiVersion: '2022-11-15' }) : null;

export function getStripe() {
  if (!stripeClient) {
    throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY.');
  }
  return stripeClient;
}

export async function createCheckoutSession(params: {
  priceId: string;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}) {
  const stripe = getStripe();
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: params.mode,
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.customerEmail,
    metadata: params.metadata,
  };

  if (params.mode === 'subscription' && params.metadata) {
    sessionParams.subscription_data = { metadata: params.metadata };
  }

  return stripe.checkout.sessions.create(sessionParams);
}

export function verifyWebhook(payload: Buffer, signature: string | string[] | undefined, webhookSecret: string) {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature as string, webhookSecret);
}
