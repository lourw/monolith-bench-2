export const PAYMENTS_OVERVIEW_ROUTE = '/features/payments-overview';

export const PAYMENTS_OVERVIEW_TEST_ID = 'feature-payments-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'payments-overview',
  title: 'Payments Overview',
  route: PAYMENTS_OVERVIEW_ROUTE,
  testId: PAYMENTS_OVERVIEW_TEST_ID,
  domain: 'payments',
  kind: 'overview',
  itemCount: 7,
};

export function paymentsOverviewItemPath(itemId: string): string {
  return `${PAYMENTS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
