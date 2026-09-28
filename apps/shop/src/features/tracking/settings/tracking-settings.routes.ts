export const TRACKING_SETTINGS_ROUTE = '/features/tracking-settings';

export const TRACKING_SETTINGS_TEST_ID = 'feature-tracking-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_SETTINGS_FEATURE: FeatureMeta = {
  id: 'tracking-settings',
  title: 'Tracking Settings',
  route: TRACKING_SETTINGS_ROUTE,
  testId: TRACKING_SETTINGS_TEST_ID,
  domain: 'tracking',
  kind: 'settings',
  itemCount: 8,
};

export function trackingSettingsItemPath(itemId: string): string {
  return `${TRACKING_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
