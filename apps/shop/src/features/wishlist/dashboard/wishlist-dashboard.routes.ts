export const WISHLIST_DASHBOARD_ROUTE = '/features/wishlist-dashboard';

export const WISHLIST_DASHBOARD_TEST_ID = 'feature-wishlist-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'wishlist-dashboard',
  title: 'Wishlist Dashboard',
  route: WISHLIST_DASHBOARD_ROUTE,
  testId: WISHLIST_DASHBOARD_TEST_ID,
  domain: 'wishlist',
  kind: 'dashboard',
  itemCount: 6,
};

export function wishlistDashboardItemPath(itemId: string): string {
  return `${WISHLIST_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
