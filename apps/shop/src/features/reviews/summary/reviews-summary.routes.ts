export const REVIEWS_SUMMARY_ROUTE = '/features/reviews-summary';

export const REVIEWS_SUMMARY_TEST_ID = 'feature-reviews-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'reviews-summary',
  title: 'Reviews Summary',
  route: REVIEWS_SUMMARY_ROUTE,
  testId: REVIEWS_SUMMARY_TEST_ID,
  domain: 'reviews',
  kind: 'summary',
  itemCount: 6,
};

export function reviewsSummaryItemPath(itemId: string): string {
  return `${REVIEWS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
