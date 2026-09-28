export const ORDERS_WIZARD_ROUTE = '/features/orders-wizard';

export const ORDERS_WIZARD_TEST_ID = 'feature-orders-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_WIZARD_FEATURE: FeatureMeta = {
  id: 'orders-wizard',
  title: 'Orders Wizard',
  route: ORDERS_WIZARD_ROUTE,
  testId: ORDERS_WIZARD_TEST_ID,
  domain: 'orders',
  kind: 'wizard',
  itemCount: 5,
};

export function ordersWizardItemPath(itemId: string): string {
  return `${ORDERS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
