export const NOTIFICATIONS_LIST_ROUTE = '/features/notifications-list';

export const NOTIFICATIONS_LIST_TEST_ID = 'feature-notifications-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_LIST_FEATURE: FeatureMeta = {
  id: 'notifications-list',
  title: 'Notifications List',
  route: NOTIFICATIONS_LIST_ROUTE,
  testId: NOTIFICATIONS_LIST_TEST_ID,
  domain: 'notifications',
  kind: 'list',
  itemCount: 12,
};

export function notificationsListItemPath(itemId: string): string {
  return `${NOTIFICATIONS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
