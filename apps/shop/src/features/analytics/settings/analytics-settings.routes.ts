export const ANALYTICS_SETTINGS_ROUTE = '/features/analytics-settings';

export const ANALYTICS_SETTINGS_TEST_ID = 'feature-analytics-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'analytics-settings',
  title: 'Analytics Settings',
  route: ANALYTICS_SETTINGS_ROUTE,
  testId: ANALYTICS_SETTINGS_TEST_ID,
  domain: 'analytics',
  kind: 'settings',
  itemCount: 8,
};

export function analyticsSettingsItemPath(itemId: string): string {
  return `${ANALYTICS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
