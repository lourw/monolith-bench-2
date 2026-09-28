export const NOTIFICATIONS_INSIGHTS_ROUTE = '/features/notifications-insights';

export const NOTIFICATIONS_INSIGHTS_TEST_ID = 'feature-notifications-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const NOTIFICATIONS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'notifications-insights',
  title: 'Notifications Insights',
  route: NOTIFICATIONS_INSIGHTS_ROUTE,
  testId: NOTIFICATIONS_INSIGHTS_TEST_ID,
  domain: 'notifications',
  kind: 'insights',
  itemCount: 12,
};

export function notificationsInsightsItemPath(itemId: string): string {
  return `${NOTIFICATIONS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
