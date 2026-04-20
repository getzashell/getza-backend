import { Prisma, ProductStatus } from '@prisma/client';
import { Router } from 'express';
import prisma from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { status: ProductStatus.PUBLISHED },
      include: {
        stripePrices: { where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 1 },
        templates: {
          select: {
            id: true,
            name: true,
            jurisdiction: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    const withPrices = products.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      subcategory: p.subcategory,
      descriptionRte: p.descriptionRte,
      type: p.type,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      templates: p.templates,
      price: p.stripePrices[0]
        ? {
            currency: p.stripePrices[0].currency,
            unitAmount: p.stripePrices[0].unitAmount,
            recurringInterval: p.stripePrices[0].recurringInterval,
            stripePriceId: p.stripePrices[0].stripePriceId,
          }
        : null,
    }));
    return res.json(withPrices);
  } catch (err) {
    console.error('Failed to list products', err);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        templates: {
          select: {
            id: true,
            name: true,
            jurisdiction: true,
            description: true,
          },
        },
        stripePrices: { where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!product || product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    const price = product.stripePrices[0]
      ? {
          currency: product.stripePrices[0].currency,
          unitAmount: product.stripePrices[0].unitAmount,
          recurringInterval: product.stripePrices[0].recurringInterval,
          stripePriceId: product.stripePrices[0].stripePriceId,
        }
      : null;
    return res.json({ ...product, price, stripePrices: undefined });
  } catch (err) {
    console.error('Failed to fetch product by slug', err);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        templates: {
          select: {
            id: true,
            name: true,
            jurisdiction: true,
            description: true,
          },
        },
        stripePrices: { where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!product || product.status !== ProductStatus.PUBLISHED) {
      return res.status(404).json({ error: 'Not found' });
    }
    const price = product.stripePrices[0]
      ? {
          currency: product.stripePrices[0].currency,
          unitAmount: product.stripePrices[0].unitAmount,
          recurringInterval: product.stripePrices[0].recurringInterval,
          stripePriceId: product.stripePrices[0].stripePriceId,
        }
      : null;
    return res.json({ ...product, price, stripePrices: undefined });
  } catch (err) {
    console.error('Failed to fetch product', err);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', async (req, res) => {
  // TODO: require admin/role-based auth before allowing writes
  const { slug, title, category, subcategory, descriptionRte, type, status } = req.body;
  if (!slug || !title || !category || !type) {
    return res.status(400).json({ error: 'slug, title, category, and type are required' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        slug,
        title,
        category,
        subcategory,
        descriptionRte,
        type,
        status: status || ProductStatus.DRAFT,
      },
    });
    return res.status(201).json(product);
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ error: 'A product with this slug already exists' });
    }
    console.error('Failed to create product', err);
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/:id', async (req, res) => {
  // TODO: require admin/role-based auth before allowing writes
  const { slug, title, category, subcategory, descriptionRte, type, status } = req.body;
  const data: Prisma.ProductUpdateInput = {};
  if (slug !== undefined) data.slug = slug;
  if (title !== undefined) data.title = title;
  if (category !== undefined) data.category = category;
  if (subcategory !== undefined) data.subcategory = subcategory;
  if (descriptionRte !== undefined) data.descriptionRte = descriptionRte;
  if (type !== undefined) data.type = type;
  if (status !== undefined) data.status = status;

  if (!Object.keys(data).length) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  try {
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data,
    });
    return res.json(updated);
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ error: 'Not found' });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ error: 'A product with this slug already exists' });
    }
    console.error('Failed to update product', err);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {
  // TODO: require admin/role-based auth before allowing writes
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ error: 'Not found' });
    }
    console.error('Failed to delete product', err);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
