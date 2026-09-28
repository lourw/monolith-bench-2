export const REVIEWS_OVERVIEW_ROUTE = '/features/reviews-overview';

export const REVIEWS_OVERVIEW_TEST_ID = 'feature-reviews-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'reviews-overview',
  title: 'Reviews Overview',
  route: REVIEWS_OVERVIEW_ROUTE,
  testId: REVIEWS_OVERVIEW_TEST_ID,
  domain: 'reviews',
  kind: 'overview',
  itemCount: 10,
};

export function reviewsOverviewItemPath(itemId: string): string {
  return `${REVIEWS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
