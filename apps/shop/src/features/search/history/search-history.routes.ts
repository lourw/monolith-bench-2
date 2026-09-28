export const SEARCH_HISTORY_ROUTE = '/features/search-history';

export const SEARCH_HISTORY_TEST_ID = 'feature-search-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_HISTORY_FEATURE: FeatureMeta = {
  id: 'search-history',
  title: 'Search History',
  route: SEARCH_HISTORY_ROUTE,
  testId: SEARCH_HISTORY_TEST_ID,
  domain: 'search',
  kind: 'history',
  itemCount: 7,
};

export function searchHistoryItemPath(itemId: string): string {
  return `${SEARCH_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
