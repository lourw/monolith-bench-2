export const WISHLIST_OVERVIEW_ROUTE = '/features/wishlist-overview';

export const WISHLIST_OVERVIEW_TEST_ID = 'feature-wishlist-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'wishlist-overview',
  title: 'Wishlist Overview',
  route: WISHLIST_OVERVIEW_ROUTE,
  testId: WISHLIST_OVERVIEW_TEST_ID,
  domain: 'wishlist',
  kind: 'overview',
  itemCount: 12,
};

export function wishlistOverviewItemPath(itemId: string): string {
  return `${WISHLIST_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
