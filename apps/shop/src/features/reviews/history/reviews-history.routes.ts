export const REVIEWS_HISTORY_ROUTE = '/features/reviews-history';

export const REVIEWS_HISTORY_TEST_ID = 'feature-reviews-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_HISTORY_FEATURE: FeatureMeta = {
  id: 'reviews-history',
  title: 'Reviews History',
  route: REVIEWS_HISTORY_ROUTE,
  testId: REVIEWS_HISTORY_TEST_ID,
  domain: 'reviews',
  kind: 'history',
  itemCount: 9,
};

export function reviewsHistoryItemPath(itemId: string): string {
  return `${REVIEWS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
