export const ANALYTICS_LIST_ROUTE = '/features/analytics-list';

export const ANALYTICS_LIST_TEST_ID = 'feature-analytics-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_LIST_FEATURE: FeatureMeta = {
  id: 'analytics-list',
  title: 'Analytics List',
  route: ANALYTICS_LIST_ROUTE,
  testId: ANALYTICS_LIST_TEST_ID,
  domain: 'analytics',
  kind: 'list',
  itemCount: 9,
};

export function analyticsListItemPath(itemId: string): string {
  return `${ANALYTICS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
