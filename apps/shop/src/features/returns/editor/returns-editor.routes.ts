export const RETURNS_EDITOR_ROUTE = '/features/returns-editor';

export const RETURNS_EDITOR_TEST_ID = 'feature-returns-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_EDITOR_FEATURE: FeatureMeta = {
  id: 'returns-editor',
  title: 'Returns Editor',
  route: RETURNS_EDITOR_ROUTE,
  testId: RETURNS_EDITOR_TEST_ID,
  domain: 'returns',
  kind: 'editor',
  itemCount: 8,
};

export function returnsEditorItemPath(itemId: string): string {
  return `${RETURNS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
