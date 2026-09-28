export const SHIPPING_WIZARD_ROUTE = '/features/shipping-wizard';

export const SHIPPING_WIZARD_TEST_ID = 'feature-shipping-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_WIZARD_FEATURE: FeatureMeta = {
  id: 'shipping-wizard',
  title: 'Shipping Wizard',
  route: SHIPPING_WIZARD_ROUTE,
  testId: SHIPPING_WIZARD_TEST_ID,
  domain: 'shipping',
  kind: 'wizard',
  itemCount: 11,
};

export function shippingWizardItemPath(itemId: string): string {
  return `${SHIPPING_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
