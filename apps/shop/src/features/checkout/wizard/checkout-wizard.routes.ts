export const CHECKOUT_WIZARD_ROUTE = '/features/checkout-wizard';

export const CHECKOUT_WIZARD_TEST_ID = 'feature-checkout-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_WIZARD_FEATURE: FeatureMeta = {
  id: 'checkout-wizard',
  title: 'Checkout Wizard',
  route: CHECKOUT_WIZARD_ROUTE,
  testId: CHECKOUT_WIZARD_TEST_ID,
  domain: 'checkout',
  kind: 'wizard',
  itemCount: 5,
};

export function checkoutWizardItemPath(itemId: string): string {
  return `${CHECKOUT_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
