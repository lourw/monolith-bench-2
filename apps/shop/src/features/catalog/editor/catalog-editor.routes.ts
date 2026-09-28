export const CATALOG_EDITOR_ROUTE = '/features/catalog-editor';

export const CATALOG_EDITOR_TEST_ID = 'feature-catalog-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_EDITOR_FEATURE: FeatureMeta = {
  id: 'catalog-editor',
  title: 'Catalog Editor',
  route: CATALOG_EDITOR_ROUTE,
  testId: CATALOG_EDITOR_TEST_ID,
  domain: 'catalog',
  kind: 'editor',
  itemCount: 7,
};

export function catalogEditorItemPath(itemId: string): string {
  return `${CATALOG_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
