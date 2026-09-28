export const ANALYTICS_SUMMARY_ROUTE = '/features/analytics-summary';

export const ANALYTICS_SUMMARY_TEST_ID = 'feature-analytics-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'analytics-summary',
  title: 'Analytics Summary',
  route: ANALYTICS_SUMMARY_ROUTE,
  testId: ANALYTICS_SUMMARY_TEST_ID,
  domain: 'analytics',
  kind: 'summary',
  itemCount: 6,
};

export function analyticsSummaryItemPath(itemId: string): string {
  return `${ANALYTICS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
