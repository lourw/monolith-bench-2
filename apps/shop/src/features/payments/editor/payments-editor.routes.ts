export const PAYMENTS_EDITOR_ROUTE = '/features/payments-editor';

export const PAYMENTS_EDITOR_TEST_ID = 'feature-payments-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_EDITOR_FEATURE: FeatureMeta = {
  id: 'payments-editor',
  title: 'Payments Editor',
  route: PAYMENTS_EDITOR_ROUTE,
  testId: PAYMENTS_EDITOR_TEST_ID,
  domain: 'payments',
  kind: 'editor',
  itemCount: 11,
};

export function paymentsEditorItemPath(itemId: string): string {
  return `${PAYMENTS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
