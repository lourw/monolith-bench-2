export const NOTIFICATIONS_WIZARD_ROUTE = '/features/notifications-wizard';

export const NOTIFICATIONS_WIZARD_TEST_ID = 'feature-notifications-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_WIZARD_FEATURE: FeatureMeta = {
  id: 'notifications-wizard',
  title: 'Notifications Wizard',
  route: NOTIFICATIONS_WIZARD_ROUTE,
  testId: NOTIFICATIONS_WIZARD_TEST_ID,
  domain: 'notifications',
  kind: 'wizard',
  itemCount: 10,
};

export function notificationsWizardItemPath(itemId: string): string {
  return `${NOTIFICATIONS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
