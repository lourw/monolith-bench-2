export const REVIEWS_EDITOR_ROUTE = '/features/reviews-editor';

export const REVIEWS_EDITOR_TEST_ID = 'feature-reviews-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_EDITOR_FEATURE: FeatureMeta = {
  id: 'reviews-editor',
  title: 'Reviews Editor',
  route: REVIEWS_EDITOR_ROUTE,
  testId: REVIEWS_EDITOR_TEST_ID,
  domain: 'reviews',
  kind: 'editor',
  itemCount: 7,
};

export function reviewsEditorItemPath(itemId: string): string {
  return `${REVIEWS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
