export const TRACKING_SUMMARY_ROUTE = '/features/tracking-summary';

export const TRACKING_SUMMARY_TEST_ID = 'feature-tracking-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_SUMMARY_FEATURE: FeatureMeta = {
  id: 'tracking-summary',
  title: 'Tracking Summary',
  route: TRACKING_SUMMARY_ROUTE,
  testId: TRACKING_SUMMARY_TEST_ID,
  domain: 'tracking',
  kind: 'summary',
  itemCount: 11,
};

export function trackingSummaryItemPath(itemId: string): string {
  return `${TRACKING_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
