export const CATALOG_SETTINGS_ROUTE = '/features/catalog-settings';

export const CATALOG_SETTINGS_TEST_ID = 'feature-catalog-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_SETTINGS_FEATURE: FeatureMeta = {
  id: 'catalog-settings',
  title: 'Catalog Settings',
  route: CATALOG_SETTINGS_ROUTE,
  testId: CATALOG_SETTINGS_TEST_ID,
  domain: 'catalog',
  kind: 'settings',
  itemCount: 12,
};

export function catalogSettingsItemPath(itemId: string): string {
  return `${CATALOG_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
