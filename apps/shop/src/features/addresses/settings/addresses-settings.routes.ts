export const ADDRESSES_SETTINGS_ROUTE = '/features/addresses-settings';

export const ADDRESSES_SETTINGS_TEST_ID = 'feature-addresses-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_SETTINGS_FEATURE: FeatureMeta = {
  id: 'addresses-settings',
  title: 'Addresses Settings',
  route: ADDRESSES_SETTINGS_ROUTE,
  testId: ADDRESSES_SETTINGS_TEST_ID,
  domain: 'addresses',
  kind: 'settings',
  itemCount: 10,
};

export function addressesSettingsItemPath(itemId: string): string {
  return `${ADDRESSES_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
