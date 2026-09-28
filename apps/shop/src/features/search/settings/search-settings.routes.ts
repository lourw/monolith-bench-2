export const SEARCH_SETTINGS_ROUTE = '/features/search-settings';

export const SEARCH_SETTINGS_TEST_ID = 'feature-search-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_SETTINGS_FEATURE: FeatureMeta = {
  id: 'search-settings',
  title: 'Search Settings',
  route: SEARCH_SETTINGS_ROUTE,
  testId: SEARCH_SETTINGS_TEST_ID,
  domain: 'search',
  kind: 'settings',
  itemCount: 12,
};

export function searchSettingsItemPath(itemId: string): string {
  return `${SEARCH_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
