export const REVIEWS_LIST_ROUTE = '/features/reviews-list';

export const REVIEWS_LIST_TEST_ID = 'feature-reviews-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_LIST_FEATURE: FeatureMeta = {
  id: 'reviews-list',
  title: 'Reviews List',
  route: REVIEWS_LIST_ROUTE,
  testId: REVIEWS_LIST_TEST_ID,
  domain: 'reviews',
  kind: 'list',
  itemCount: 5,
};

export function reviewsListItemPath(itemId: string): string {
  return `${REVIEWS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
