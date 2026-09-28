export const SUPPORT_SETTINGS_ROUTE = '/features/support-settings';

export const SUPPORT_SETTINGS_TEST_ID = 'feature-support-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_SETTINGS_FEATURE: FeatureMeta = {
  id: 'support-settings',
  title: 'Support Settings',
  route: SUPPORT_SETTINGS_ROUTE,
  testId: SUPPORT_SETTINGS_TEST_ID,
  domain: 'support',
  kind: 'settings',
  itemCount: 7,
};

export function supportSettingsItemPath(itemId: string): string {
  return `${SUPPORT_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
