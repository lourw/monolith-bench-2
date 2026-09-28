export const PREORDERS_EDITOR_ROUTE = '/features/preorders-editor';

export const PREORDERS_EDITOR_TEST_ID = 'feature-preorders-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_EDITOR_FEATURE: FeatureMeta = {
  id: 'preorders-editor',
  title: 'Preorders Editor',
  route: PREORDERS_EDITOR_ROUTE,
  testId: PREORDERS_EDITOR_TEST_ID,
  domain: 'preorders',
  kind: 'editor',
  itemCount: 8,
};

export function preordersEditorItemPath(itemId: string): string {
  return `${PREORDERS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
