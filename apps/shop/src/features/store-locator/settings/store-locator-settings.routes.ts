export const STORE_LOCATOR_SETTINGS_ROUTE = '/features/store-locator-settings';

export const STORE_LOCATOR_SETTINGS_TEST_ID = 'feature-store-locator-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_SETTINGS_FEATURE: FeatureMeta = {
  id: 'store-locator-settings',
  title: 'Store Locator Settings',
  route: STORE_LOCATOR_SETTINGS_ROUTE,
  testId: STORE_LOCATOR_SETTINGS_TEST_ID,
  domain: 'store-locator',
  kind: 'settings',
  itemCount: 11,
};

export function storeLocatorSettingsItemPath(itemId: string): string {
  return `${STORE_LOCATOR_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
