export const PAYMENTS_INSIGHTS_ROUTE = '/features/payments-insights';

export const PAYMENTS_INSIGHTS_TEST_ID = 'feature-payments-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'payments-insights',
  title: 'Payments Insights',
  route: PAYMENTS_INSIGHTS_ROUTE,
  testId: PAYMENTS_INSIGHTS_TEST_ID,
  domain: 'payments',
  kind: 'insights',
  itemCount: 11,
};

export function paymentsInsightsItemPath(itemId: string): string {
  return `${PAYMENTS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
