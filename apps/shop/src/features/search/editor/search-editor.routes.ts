export const SEARCH_EDITOR_ROUTE = '/features/search-editor';

export const SEARCH_EDITOR_TEST_ID = 'feature-search-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_EDITOR_FEATURE: FeatureMeta = {
  id: 'search-editor',
  title: 'Search Editor',
  route: SEARCH_EDITOR_ROUTE,
  testId: SEARCH_EDITOR_TEST_ID,
  domain: 'search',
  kind: 'editor',
  itemCount: 10,
};

export function searchEditorItemPath(itemId: string): string {
  return `${SEARCH_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
