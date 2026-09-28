export const TRACKING_LIST_ROUTE = '/features/tracking-list';

export const TRACKING_LIST_TEST_ID = 'feature-tracking-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_LIST_FEATURE: FeatureMeta = {
  id: 'tracking-list',
  title: 'Tracking List',
  route: TRACKING_LIST_ROUTE,
  testId: TRACKING_LIST_TEST_ID,
  domain: 'tracking',
  kind: 'list',
  itemCount: 5,
};

export function trackingListItemPath(itemId: string): string {
  return `${TRACKING_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
