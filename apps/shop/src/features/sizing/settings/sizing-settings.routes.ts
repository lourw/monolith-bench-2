export const SIZING_SETTINGS_ROUTE = '/features/sizing-settings';

export const SIZING_SETTINGS_TEST_ID = 'feature-sizing-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_SETTINGS_FEATURE: FeatureMeta = {
  id: 'sizing-settings',
  title: 'Sizing Settings',
  route: SIZING_SETTINGS_ROUTE,
  testId: SIZING_SETTINGS_TEST_ID,
  domain: 'sizing',
  kind: 'settings',
  itemCount: 10,
};

export function sizingSettingsItemPath(itemId: string): string {
  return `${SIZING_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
