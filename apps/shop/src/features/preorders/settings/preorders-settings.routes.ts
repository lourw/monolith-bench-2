export const PREORDERS_SETTINGS_ROUTE = '/features/preorders-settings';

export const PREORDERS_SETTINGS_TEST_ID = 'feature-preorders-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'preorders-settings',
  title: 'Preorders Settings',
  route: PREORDERS_SETTINGS_ROUTE,
  testId: PREORDERS_SETTINGS_TEST_ID,
  domain: 'preorders',
  kind: 'settings',
  itemCount: 7,
};

export function preordersSettingsItemPath(itemId: string): string {
  return `${PREORDERS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
