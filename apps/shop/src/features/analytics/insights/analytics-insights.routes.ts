export const ANALYTICS_INSIGHTS_ROUTE = '/features/analytics-insights';

export const ANALYTICS_INSIGHTS_TEST_ID = 'feature-analytics-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'analytics-insights',
  title: 'Analytics Insights',
  route: ANALYTICS_INSIGHTS_ROUTE,
  testId: ANALYTICS_INSIGHTS_TEST_ID,
  domain: 'analytics',
  kind: 'insights',
  itemCount: 11,
};

export function analyticsInsightsItemPath(itemId: string): string {
  return `${ANALYTICS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
