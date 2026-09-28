export const WISHLIST_DETAILS_ROUTE = '/features/wishlist-details';

export const WISHLIST_DETAILS_TEST_ID = 'feature-wishlist-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_DETAILS_FEATURE: FeatureMeta = {
  id: 'wishlist-details',
  title: 'Wishlist Details',
  route: WISHLIST_DETAILS_ROUTE,
  testId: WISHLIST_DETAILS_TEST_ID,
  domain: 'wishlist',
  kind: 'details',
  itemCount: 10,
};

export function wishlistDetailsItemPath(itemId: string): string {
  return `${WISHLIST_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
