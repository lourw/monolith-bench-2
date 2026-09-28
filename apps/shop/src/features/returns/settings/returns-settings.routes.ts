export const RETURNS_SETTINGS_ROUTE = '/features/returns-settings';

export const RETURNS_SETTINGS_TEST_ID = 'feature-returns-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'returns-settings',
  title: 'Returns Settings',
  route: RETURNS_SETTINGS_ROUTE,
  testId: RETURNS_SETTINGS_TEST_ID,
  domain: 'returns',
  kind: 'settings',
  itemCount: 6,
};

export function returnsSettingsItemPath(itemId: string): string {
  return `${RETURNS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
