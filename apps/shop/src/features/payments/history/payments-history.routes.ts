export const PAYMENTS_HISTORY_ROUTE = '/features/payments-history';

export const PAYMENTS_HISTORY_TEST_ID = 'feature-payments-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_HISTORY_FEATURE: FeatureMeta = {
  id: 'payments-history',
  title: 'Payments History',
  route: PAYMENTS_HISTORY_ROUTE,
  testId: PAYMENTS_HISTORY_TEST_ID,
  domain: 'payments',
  kind: 'history',
  itemCount: 6,
};

export function paymentsHistoryItemPath(itemId: string): string {
  return `${PAYMENTS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
