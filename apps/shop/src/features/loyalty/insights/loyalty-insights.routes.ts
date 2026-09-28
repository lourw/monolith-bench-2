export const LOYALTY_INSIGHTS_ROUTE = '/features/loyalty-insights';

export const LOYALTY_INSIGHTS_TEST_ID = 'feature-loyalty-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'loyalty-insights',
  title: 'Loyalty Insights',
  route: LOYALTY_INSIGHTS_ROUTE,
  testId: LOYALTY_INSIGHTS_TEST_ID,
  domain: 'loyalty',
  kind: 'insights',
  itemCount: 10,
};

export function loyaltyInsightsItemPath(itemId: string): string {
  return `${LOYALTY_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
