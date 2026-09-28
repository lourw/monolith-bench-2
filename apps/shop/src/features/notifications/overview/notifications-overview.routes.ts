export const NOTIFICATIONS_OVERVIEW_ROUTE = '/features/notifications-overview';

export const NOTIFICATIONS_OVERVIEW_TEST_ID = 'feature-notifications-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'notifications-overview',
  title: 'Notifications Overview',
  route: NOTIFICATIONS_OVERVIEW_ROUTE,
  testId: NOTIFICATIONS_OVERVIEW_TEST_ID,
  domain: 'notifications',
  kind: 'overview',
  itemCount: 11,
};

export function notificationsOverviewItemPath(itemId: string): string {
  return `${NOTIFICATIONS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
