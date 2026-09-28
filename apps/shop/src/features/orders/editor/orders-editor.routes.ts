export const ORDERS_EDITOR_ROUTE = '/features/orders-editor';

export const ORDERS_EDITOR_TEST_ID = 'feature-orders-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_EDITOR_FEATURE: FeatureMeta = {
  id: 'orders-editor',
  title: 'Orders Editor',
  route: ORDERS_EDITOR_ROUTE,
  testId: ORDERS_EDITOR_TEST_ID,
  domain: 'orders',
  kind: 'editor',
  itemCount: 5,
};

export function ordersEditorItemPath(itemId: string): string {
  return `${ORDERS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
