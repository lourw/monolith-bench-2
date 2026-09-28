export const REVIEWS_DASHBOARD_ROUTE = '/features/reviews-dashboard';

export const REVIEWS_DASHBOARD_TEST_ID = 'feature-reviews-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'reviews-dashboard',
  title: 'Reviews Dashboard',
  route: REVIEWS_DASHBOARD_ROUTE,
  testId: REVIEWS_DASHBOARD_TEST_ID,
  domain: 'reviews',
  kind: 'dashboard',
  itemCount: 9,
};

export function reviewsDashboardItemPath(itemId: string): string {
  return `${REVIEWS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
