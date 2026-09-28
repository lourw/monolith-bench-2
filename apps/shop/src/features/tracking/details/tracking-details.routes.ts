export const TRACKING_DETAILS_ROUTE = '/features/tracking-details';

export const TRACKING_DETAILS_TEST_ID = 'feature-tracking-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_DETAILS_FEATURE: FeatureMeta = {
  id: 'tracking-details',
  title: 'Tracking Details',
  route: TRACKING_DETAILS_ROUTE,
  testId: TRACKING_DETAILS_TEST_ID,
  domain: 'tracking',
  kind: 'details',
  itemCount: 12,
};

export function trackingDetailsItemPath(itemId: string): string {
  return `${TRACKING_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
