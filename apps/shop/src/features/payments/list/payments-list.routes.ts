export const PAYMENTS_LIST_ROUTE = '/features/payments-list';

export const PAYMENTS_LIST_TEST_ID = 'feature-payments-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_LIST_FEATURE: FeatureMeta = {
  id: 'payments-list',
  title: 'Payments List',
  route: PAYMENTS_LIST_ROUTE,
  testId: PAYMENTS_LIST_TEST_ID,
  domain: 'payments',
  kind: 'list',
  itemCount: 7,
};

export function paymentsListItemPath(itemId: string): string {
  return `${PAYMENTS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
