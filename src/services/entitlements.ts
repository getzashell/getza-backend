/**
 * Placeholder entitlement helper. This will later check orders/subscriptions
 * to determine if a user can access a product or generated document.
 */
export async function hasEntitlement(_userId: string | undefined | null, _productId: string) {
  // TODO: implement entitlement lookup based on paid orders/subscriptions
  return false;
}
