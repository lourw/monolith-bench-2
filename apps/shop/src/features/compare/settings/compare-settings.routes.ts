export const COMPARE_SETTINGS_ROUTE = '/features/compare-settings';

export const COMPARE_SETTINGS_TEST_ID = 'feature-compare-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_SETTINGS_FEATURE: FeatureMeta = {
  id: 'compare-settings',
  title: 'Compare Settings',
  route: COMPARE_SETTINGS_ROUTE,
  testId: COMPARE_SETTINGS_TEST_ID,
  domain: 'compare',
  kind: 'settings',
  itemCount: 11,
};

export function compareSettingsItemPath(itemId: string): string {
  return `${COMPARE_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
