export const NOTIFICATIONS_SETTINGS_ROUTE = '/features/notifications-settings';

export const NOTIFICATIONS_SETTINGS_TEST_ID = 'feature-notifications-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'notifications-settings',
  title: 'Notifications Settings',
  route: NOTIFICATIONS_SETTINGS_ROUTE,
  testId: NOTIFICATIONS_SETTINGS_TEST_ID,
  domain: 'notifications',
  kind: 'settings',
  itemCount: 11,
};

export function notificationsSettingsItemPath(itemId: string): string {
  return `${NOTIFICATIONS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
