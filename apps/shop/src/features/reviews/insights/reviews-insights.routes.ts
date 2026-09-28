export const REVIEWS_INSIGHTS_ROUTE = '/features/reviews-insights';

export const REVIEWS_INSIGHTS_TEST_ID = 'feature-reviews-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'reviews-insights',
  title: 'Reviews Insights',
  route: REVIEWS_INSIGHTS_ROUTE,
  testId: REVIEWS_INSIGHTS_TEST_ID,
  domain: 'reviews',
  kind: 'insights',
  itemCount: 12,
};

export function reviewsInsightsItemPath(itemId: string): string {
  return `${REVIEWS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
