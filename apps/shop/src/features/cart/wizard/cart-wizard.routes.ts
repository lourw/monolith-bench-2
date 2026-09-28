export const CART_WIZARD_ROUTE = '/features/cart-wizard';

export const CART_WIZARD_TEST_ID = 'feature-cart-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_WIZARD_FEATURE: FeatureMeta = {
  id: 'cart-wizard',
  title: 'Cart Wizard',
  route: CART_WIZARD_ROUTE,
  testId: CART_WIZARD_TEST_ID,
  domain: 'cart',
  kind: 'wizard',
  itemCount: 6,
};

export function cartWizardItemPath(itemId: string): string {
  return `${CART_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
