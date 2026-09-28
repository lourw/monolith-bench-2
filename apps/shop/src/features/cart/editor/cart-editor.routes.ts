export const CART_EDITOR_ROUTE = '/features/cart-editor';

export const CART_EDITOR_TEST_ID = 'feature-cart-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_EDITOR_FEATURE: FeatureMeta = {
  id: 'cart-editor',
  title: 'Cart Editor',
  route: CART_EDITOR_ROUTE,
  testId: CART_EDITOR_TEST_ID,
  domain: 'cart',
  kind: 'editor',
  itemCount: 8,
};

export function cartEditorItemPath(itemId: string): string {
  return `${CART_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
