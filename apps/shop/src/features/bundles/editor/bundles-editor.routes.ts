export const BUNDLES_EDITOR_ROUTE = '/features/bundles-editor';

export const BUNDLES_EDITOR_TEST_ID = 'feature-bundles-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_EDITOR_FEATURE: FeatureMeta = {
  id: 'bundles-editor',
  title: 'Bundles Editor',
  route: BUNDLES_EDITOR_ROUTE,
  testId: BUNDLES_EDITOR_TEST_ID,
  domain: 'bundles',
  kind: 'editor',
  itemCount: 11,
};

export function bundlesEditorItemPath(itemId: string): string {
  return `${BUNDLES_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
