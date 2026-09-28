export const COMPARE_EDITOR_ROUTE = '/features/compare-editor';

export const COMPARE_EDITOR_TEST_ID = 'feature-compare-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_EDITOR_FEATURE: FeatureMeta = {
  id: 'compare-editor',
  title: 'Compare Editor',
  route: COMPARE_EDITOR_ROUTE,
  testId: COMPARE_EDITOR_TEST_ID,
  domain: 'compare',
  kind: 'editor',
  itemCount: 8,
};

export function compareEditorItemPath(itemId: string): string {
  return `${COMPARE_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
