export const TRACKING_HISTORY_ROUTE = '/features/tracking-history';

export const TRACKING_HISTORY_TEST_ID = 'feature-tracking-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_HISTORY_FEATURE: FeatureMeta = {
  id: 'tracking-history',
  title: 'Tracking History',
  route: TRACKING_HISTORY_ROUTE,
  testId: TRACKING_HISTORY_TEST_ID,
  domain: 'tracking',
  kind: 'history',
  itemCount: 10,
};

export function trackingHistoryItemPath(itemId: string): string {
  return `${TRACKING_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
