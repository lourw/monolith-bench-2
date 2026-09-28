export const NOTIFICATIONS_DASHBOARD_ROUTE =
  '/features/notifications-dashboard';

export const NOTIFICATIONS_DASHBOARD_TEST_ID =
  'feature-notifications-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'notifications-dashboard',
  title: 'Notifications Dashboard',
  route: NOTIFICATIONS_DASHBOARD_ROUTE,
  testId: NOTIFICATIONS_DASHBOARD_TEST_ID,
  domain: 'notifications',
  kind: 'dashboard',
  itemCount: 7,
};

export function notificationsDashboardItemPath(itemId: string): string {
  return `${NOTIFICATIONS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
