export const REVIEWS_DETAILS_ROUTE = '/features/reviews-details';

export const REVIEWS_DETAILS_TEST_ID = 'feature-reviews-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_DETAILS_FEATURE: FeatureMeta = {
  id: 'reviews-details',
  title: 'Reviews Details',
  route: REVIEWS_DETAILS_ROUTE,
  testId: REVIEWS_DETAILS_TEST_ID,
  domain: 'reviews',
  kind: 'details',
  itemCount: 12,
};

export function reviewsDetailsItemPath(itemId: string): string {
  return `${REVIEWS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
