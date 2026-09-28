export const CHECKOUT_EDITOR_ROUTE = '/features/checkout-editor';

export const CHECKOUT_EDITOR_TEST_ID = 'feature-checkout-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_EDITOR_FEATURE: FeatureMeta = {
  id: 'checkout-editor',
  title: 'Checkout Editor',
  route: CHECKOUT_EDITOR_ROUTE,
  testId: CHECKOUT_EDITOR_TEST_ID,
  domain: 'checkout',
  kind: 'editor',
  itemCount: 9,
};

export function checkoutEditorItemPath(itemId: string): string {
  return `${CHECKOUT_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
