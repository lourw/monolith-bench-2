export const PROMOTIONS_EDITOR_ROUTE = '/features/promotions-editor';

export const PROMOTIONS_EDITOR_TEST_ID = 'feature-promotions-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_EDITOR_FEATURE: FeatureMeta = {
  id: 'promotions-editor',
  title: 'Promotions Editor',
  route: PROMOTIONS_EDITOR_ROUTE,
  testId: PROMOTIONS_EDITOR_TEST_ID,
  domain: 'promotions',
  kind: 'editor',
  itemCount: 7,
};

export function promotionsEditorItemPath(itemId: string): string {
  return `${PROMOTIONS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
