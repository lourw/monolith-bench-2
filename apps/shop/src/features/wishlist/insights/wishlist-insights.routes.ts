export const WISHLIST_INSIGHTS_ROUTE = '/features/wishlist-insights';

export const WISHLIST_INSIGHTS_TEST_ID = 'feature-wishlist-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'wishlist-insights',
  title: 'Wishlist Insights',
  route: WISHLIST_INSIGHTS_ROUTE,
  testId: WISHLIST_INSIGHTS_TEST_ID,
  domain: 'wishlist',
  kind: 'insights',
  itemCount: 11,
};

export function wishlistInsightsItemPath(itemId: string): string {
  return `${WISHLIST_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
