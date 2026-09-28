export const ANALYTICS_DETAILS_ROUTE = '/features/analytics-details';

export const ANALYTICS_DETAILS_TEST_ID = 'feature-analytics-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_DETAILS_FEATURE: FeatureMeta = {
  id: 'analytics-details',
  title: 'Analytics Details',
  route: ANALYTICS_DETAILS_ROUTE,
  testId: ANALYTICS_DETAILS_TEST_ID,
  domain: 'analytics',
  kind: 'details',
  itemCount: 10,
};

export function analyticsDetailsItemPath(itemId: string): string {
  return `${ANALYTICS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
