export const ANALYTICS_HISTORY_ROUTE = '/features/analytics-history';

export const ANALYTICS_HISTORY_TEST_ID = 'feature-analytics-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_HISTORY_FEATURE: FeatureMeta = {
  id: 'analytics-history',
  title: 'Analytics History',
  route: ANALYTICS_HISTORY_ROUTE,
  testId: ANALYTICS_HISTORY_TEST_ID,
  domain: 'analytics',
  kind: 'history',
  itemCount: 6,
};

export function analyticsHistoryItemPath(itemId: string): string {
  return `${ANALYTICS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
