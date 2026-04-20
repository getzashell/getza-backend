import { OrderStatus, Role } from '@prisma/client';
import { Router } from 'express';
import prisma from '../db';
import { createCheckoutSession } from '../services/stripe';
import { getOrCreateAppSettings } from '../services/settings';
import { requireAuth, optionalAuth } from '../middleware/auth';

const router = Router();

// POST /api/checkout — create a Stripe Checkout session
// Supports both authenticated users and guest checkout (no account required)
router.post('/', optionalAuth, async (req, res) => {
  const { productId, successUrl, cancelUrl, customerEmail } = req.body;
  const userId = req.user?.id ?? null;

  if (!productId || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: 'productId, successUrl, and cancelUrl are required' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        stripePrices: { where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    if (!product || !product.stripePrices.length) {
      return res.status(404).json({ error: 'Product or active price not found' });
    }

    const price = product.stripePrices[0];
    const settings = await getOrCreateAppSettings();

    // Dev-mode bypass for admins (still works even without auth)
    if (settings.developerMode) {
      const isAdmin = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
      if (isAdmin?.role === Role.ADMIN) {
        const order = await prisma.order.create({
          data: {
            userId,
            productId,
            stripeCheckoutSessionId: 'DEV_MODE',
            status: OrderStatus.PAID,
          },
        });
        return res.status(201).json({ bypassed: true, orderId: order.id, url: null, sessionId: null });
      }
    }

    const mode = price.recurringInterval ? 'subscription' : 'payment';
    if (mode === 'subscription' && !userId) {
      return res.status(400).json({ error: 'userId is required for subscription checkout' });
    }

    const session = await createCheckoutSession({
      priceId: price.stripePriceId,
      mode,
      successUrl: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl,
      customerEmail,
      metadata: {
        ...(userId ? { userId } : {}),
        productId,
      },
    });

    await prisma.order.create({
      data: {
        userId,
        productId,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
        status: OrderStatus.PENDING,
      },
    });

    return res.status(201).json({ sessionId: session.id, url: session.url, orderId: null });
  } catch (err) {
    console.error('Failed to create checkout session', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export default router;