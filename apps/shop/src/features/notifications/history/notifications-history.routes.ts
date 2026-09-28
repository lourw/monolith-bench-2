export const NOTIFICATIONS_HISTORY_ROUTE = '/features/notifications-history';

export const NOTIFICATIONS_HISTORY_TEST_ID = 'feature-notifications-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_HISTORY_FEATURE: FeatureMeta = {
  id: 'notifications-history',
  title: 'Notifications History',
  route: NOTIFICATIONS_HISTORY_ROUTE,
  testId: NOTIFICATIONS_HISTORY_TEST_ID,
  domain: 'notifications',
  kind: 'history',
  itemCount: 9,
};

export function notificationsHistoryItemPath(itemId: string): string {
  return `${NOTIFICATIONS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
