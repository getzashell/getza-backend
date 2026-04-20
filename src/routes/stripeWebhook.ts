import { OrderStatus } from '@prisma/client';
import { Router } from 'express';
import Stripe from 'stripe';
import prisma from '../db';
import { verifyWebhook } from '../services/stripe';

const router = Router();

router.post('/', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event: Stripe.Event;
  try {
    event = verifyWebhook(req.body as Buffer, signature, webhookSecret);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed', err?.message || err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await prisma.order.findFirst({ where: { stripeCheckoutSessionId: session.id } });
        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: OrderStatus.PAID,
              stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
            },
          });

          if (order.userId && typeof session.customer === 'string') {
            await prisma.stripeCustomer.upsert({
              where: { stripeCustomerId: session.customer },
              update: {},
              create: {
                userId: order.userId,
                stripeCustomerId: session.customer,
              },
            });
          }

          if (session.mode === 'subscription' && order.userId && typeof session.subscription === 'string') {
            await prisma.stripeSubscription.upsert({
              where: { stripeSubscriptionId: session.subscription },
              update: { status: 'active' },
              create: {
                userId: order.userId,
                stripeSubscriptionId: session.subscription,
                status: 'active',
              },
            });
          }
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const periodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null;
        const userId = subscription.metadata?.userId;
        if (userId) {
          await prisma.stripeSubscription.upsert({
            where: { stripeSubscriptionId: subscription.id },
            update: { status: subscription.status, currentPeriodEnd: periodEnd || undefined },
            create: {
              userId,
              stripeSubscriptionId: subscription.id,
              status: subscription.status,
              currentPeriodEnd: periodEnd || undefined,
            },
          });
        } else {
          console.warn('Received subscription webhook without userId metadata; skipping persistence');
        }
        break;
      }
      default:
        break;
    }

    return res.json({ received: true });
  } catch (err) {
    console.error('Failed to process Stripe webhook', err);
    return res.status(500).json({ error: 'Failed to process webhook' });
  }
});

export default router;
