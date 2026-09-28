export const TRACKING_INSIGHTS_ROUTE = '/features/tracking-insights';

export const TRACKING_INSIGHTS_TEST_ID = 'feature-tracking-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'tracking-insights',
  title: 'Tracking Insights',
  route: TRACKING_INSIGHTS_ROUTE,
  testId: TRACKING_INSIGHTS_TEST_ID,
  domain: 'tracking',
  kind: 'insights',
  itemCount: 8,
};

export function trackingInsightsItemPath(itemId: string): string {
  return `${TRACKING_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
