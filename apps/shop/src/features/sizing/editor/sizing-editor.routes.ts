export const SIZING_EDITOR_ROUTE = '/features/sizing-editor';

export const SIZING_EDITOR_TEST_ID = 'feature-sizing-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_EDITOR_FEATURE: FeatureMeta = {
  id: 'sizing-editor',
  title: 'Sizing Editor',
  route: SIZING_EDITOR_ROUTE,
  testId: SIZING_EDITOR_TEST_ID,
  domain: 'sizing',
  kind: 'editor',
  itemCount: 6,
};

export function sizingEditorItemPath(itemId: string): string {
  return `${SIZING_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
