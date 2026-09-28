export const NOTIFICATIONS_SUMMARY_ROUTE = '/features/notifications-summary';

export const NOTIFICATIONS_SUMMARY_TEST_ID = 'feature-notifications-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'notifications-summary',
  title: 'Notifications Summary',
  route: NOTIFICATIONS_SUMMARY_ROUTE,
  testId: NOTIFICATIONS_SUMMARY_TEST_ID,
  domain: 'notifications',
  kind: 'summary',
  itemCount: 7,
};

export function notificationsSummaryItemPath(itemId: string): string {
  return `${NOTIFICATIONS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
