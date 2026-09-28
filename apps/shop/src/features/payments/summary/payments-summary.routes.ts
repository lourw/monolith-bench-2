export const PAYMENTS_SUMMARY_ROUTE = '/features/payments-summary';

export const PAYMENTS_SUMMARY_TEST_ID = 'feature-payments-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'payments-summary',
  title: 'Payments Summary',
  route: PAYMENTS_SUMMARY_ROUTE,
  testId: PAYMENTS_SUMMARY_TEST_ID,
  domain: 'payments',
  kind: 'summary',
  itemCount: 8,
};

export function paymentsSummaryItemPath(itemId: string): string {
  return `${PAYMENTS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
