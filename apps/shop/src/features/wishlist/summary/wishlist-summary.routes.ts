export const WISHLIST_SUMMARY_ROUTE = '/features/wishlist-summary';

export const WISHLIST_SUMMARY_TEST_ID = 'feature-wishlist-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_SUMMARY_FEATURE: FeatureMeta = {
  id: 'wishlist-summary',
  title: 'Wishlist Summary',
  route: WISHLIST_SUMMARY_ROUTE,
  testId: WISHLIST_SUMMARY_TEST_ID,
  domain: 'wishlist',
  kind: 'summary',
  itemCount: 10,
};

export function wishlistSummaryItemPath(itemId: string): string {
  return `${WISHLIST_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
