export const WISHLIST_LIST_ROUTE = '/features/wishlist-list';

export const WISHLIST_LIST_TEST_ID = 'feature-wishlist-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_LIST_FEATURE: FeatureMeta = {
  id: 'wishlist-list',
  title: 'Wishlist List',
  route: WISHLIST_LIST_ROUTE,
  testId: WISHLIST_LIST_TEST_ID,
  domain: 'wishlist',
  kind: 'list',
  itemCount: 7,
};

export function wishlistListItemPath(itemId: string): string {
  return `${WISHLIST_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
