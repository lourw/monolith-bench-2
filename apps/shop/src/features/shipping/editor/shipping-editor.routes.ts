export const SHIPPING_EDITOR_ROUTE = '/features/shipping-editor';

export const SHIPPING_EDITOR_TEST_ID = 'feature-shipping-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_EDITOR_FEATURE: FeatureMeta = {
  id: 'shipping-editor',
  title: 'Shipping Editor',
  route: SHIPPING_EDITOR_ROUTE,
  testId: SHIPPING_EDITOR_TEST_ID,
  domain: 'shipping',
  kind: 'editor',
  itemCount: 6,
};

export function shippingEditorItemPath(itemId: string): string {
  return `${SHIPPING_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
