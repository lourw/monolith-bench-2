export const ANALYTICS_OVERVIEW_ROUTE = '/features/analytics-overview';

export const ANALYTICS_OVERVIEW_TEST_ID = 'feature-analytics-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'analytics-overview',
  title: 'Analytics Overview',
  route: ANALYTICS_OVERVIEW_ROUTE,
  testId: ANALYTICS_OVERVIEW_TEST_ID,
  domain: 'analytics',
  kind: 'overview',
  itemCount: 12,
};

export function analyticsOverviewItemPath(itemId: string): string {
  return `${ANALYTICS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
