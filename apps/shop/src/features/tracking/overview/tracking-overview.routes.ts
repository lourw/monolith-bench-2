export const TRACKING_OVERVIEW_ROUTE = '/features/tracking-overview';

export const TRACKING_OVERVIEW_TEST_ID = 'feature-tracking-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'tracking-overview',
  title: 'Tracking Overview',
  route: TRACKING_OVERVIEW_ROUTE,
  testId: TRACKING_OVERVIEW_TEST_ID,
  domain: 'tracking',
  kind: 'overview',
  itemCount: 11,
};

export function trackingOverviewItemPath(itemId: string): string {
  return `${TRACKING_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
