export const NOTIFICATIONS_DETAILS_ROUTE = '/features/notifications-details';

export const NOTIFICATIONS_DETAILS_TEST_ID = 'feature-notifications-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_DETAILS_FEATURE: FeatureMeta = {
  id: 'notifications-details',
  title: 'Notifications Details',
  route: NOTIFICATIONS_DETAILS_ROUTE,
  testId: NOTIFICATIONS_DETAILS_TEST_ID,
  domain: 'notifications',
  kind: 'details',
  itemCount: 10,
};

export function notificationsDetailsItemPath(itemId: string): string {
  return `${NOTIFICATIONS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
