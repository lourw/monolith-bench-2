export const NOTIFICATIONS_EDITOR_ROUTE = '/features/notifications-editor';

export const NOTIFICATIONS_EDITOR_TEST_ID = 'feature-notifications-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_EDITOR_FEATURE: FeatureMeta = {
  id: 'notifications-editor',
  title: 'Notifications Editor',
  route: NOTIFICATIONS_EDITOR_ROUTE,
  testId: NOTIFICATIONS_EDITOR_TEST_ID,
  domain: 'notifications',
  kind: 'editor',
  itemCount: 6,
};

export function notificationsEditorItemPath(itemId: string): string {
  return `${NOTIFICATIONS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
