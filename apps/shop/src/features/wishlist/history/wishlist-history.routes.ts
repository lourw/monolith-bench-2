export const WISHLIST_HISTORY_ROUTE = '/features/wishlist-history';

export const WISHLIST_HISTORY_TEST_ID = 'feature-wishlist-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_HISTORY_FEATURE: FeatureMeta = {
  id: 'wishlist-history',
  title: 'Wishlist History',
  route: WISHLIST_HISTORY_ROUTE,
  testId: WISHLIST_HISTORY_TEST_ID,
  domain: 'wishlist',
  kind: 'history',
  itemCount: 8,
};

export function wishlistHistoryItemPath(itemId: string): string {
  return `${WISHLIST_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
