export const WISHLIST_SETTINGS_ROUTE = '/features/wishlist-settings';

export const WISHLIST_SETTINGS_TEST_ID = 'feature-wishlist-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_SETTINGS_FEATURE: FeatureMeta = {
  id: 'wishlist-settings',
  title: 'Wishlist Settings',
  route: WISHLIST_SETTINGS_ROUTE,
  testId: WISHLIST_SETTINGS_TEST_ID,
  domain: 'wishlist',
  kind: 'settings',
  itemCount: 5,
};

export function wishlistSettingsItemPath(itemId: string): string {
  return `${WISHLIST_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
