export const SUBSCRIPTIONS_INSIGHTS_ROUTE = '/features/subscriptions-insights';

export const SUBSCRIPTIONS_INSIGHTS_TEST_ID = 'feature-subscriptions-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'subscriptions-insights',
  title: 'Subscriptions Insights',
  route: SUBSCRIPTIONS_INSIGHTS_ROUTE,
  testId: SUBSCRIPTIONS_INSIGHTS_TEST_ID,
  domain: 'subscriptions',
  kind: 'insights',
  itemCount: 8,
};

export function subscriptionsInsightsItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
