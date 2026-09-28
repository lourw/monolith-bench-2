export const SEARCH_LIST_ROUTE = '/features/search-list';

export const SEARCH_LIST_TEST_ID = 'feature-search-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_LIST_FEATURE: FeatureMeta = {
  id: 'search-list',
  title: 'Search List',
  route: SEARCH_LIST_ROUTE,
  testId: SEARCH_LIST_TEST_ID,
  domain: 'search',
  kind: 'list',
  itemCount: 9,
};

export function searchListItemPath(itemId: string): string {
  return `${SEARCH_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
