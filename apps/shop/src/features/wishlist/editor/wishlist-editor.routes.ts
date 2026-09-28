export const WISHLIST_EDITOR_ROUTE = '/features/wishlist-editor';

export const WISHLIST_EDITOR_TEST_ID = 'feature-wishlist-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_EDITOR_FEATURE: FeatureMeta = {
  id: 'wishlist-editor',
  title: 'Wishlist Editor',
  route: WISHLIST_EDITOR_ROUTE,
  testId: WISHLIST_EDITOR_TEST_ID,
  domain: 'wishlist',
  kind: 'editor',
  itemCount: 8,
};

export function wishlistEditorItemPath(itemId: string): string {
  return `${WISHLIST_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
