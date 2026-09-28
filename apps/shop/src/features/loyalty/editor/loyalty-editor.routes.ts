export const LOYALTY_EDITOR_ROUTE = '/features/loyalty-editor';

export const LOYALTY_EDITOR_TEST_ID = 'feature-loyalty-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_EDITOR_FEATURE: FeatureMeta = {
  id: 'loyalty-editor',
  title: 'Loyalty Editor',
  route: LOYALTY_EDITOR_ROUTE,
  testId: LOYALTY_EDITOR_TEST_ID,
  domain: 'loyalty',
  kind: 'editor',
  itemCount: 11,
};

export function loyaltyEditorItemPath(itemId: string): string {
  return `${LOYALTY_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
