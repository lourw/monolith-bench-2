export const BUNDLES_SETTINGS_ROUTE = '/features/bundles-settings';

export const BUNDLES_SETTINGS_TEST_ID = 'feature-bundles-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_SETTINGS_FEATURE: FeatureMeta = {
  id: 'bundles-settings',
  title: 'Bundles Settings',
  route: BUNDLES_SETTINGS_ROUTE,
  testId: BUNDLES_SETTINGS_TEST_ID,
  domain: 'bundles',
  kind: 'settings',
  itemCount: 9,
};

export function bundlesSettingsItemPath(itemId: string): string {
  return `${BUNDLES_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
