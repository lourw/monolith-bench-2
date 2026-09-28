export const PROMOTIONS_SETTINGS_ROUTE = '/features/promotions-settings';

export const PROMOTIONS_SETTINGS_TEST_ID = 'feature-promotions-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'promotions-settings',
  title: 'Promotions Settings',
  route: PROMOTIONS_SETTINGS_ROUTE,
  testId: PROMOTIONS_SETTINGS_TEST_ID,
  domain: 'promotions',
  kind: 'settings',
  itemCount: 5,
};

export function promotionsSettingsItemPath(itemId: string): string {
  return `${PROMOTIONS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
