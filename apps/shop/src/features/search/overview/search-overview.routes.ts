export const SEARCH_OVERVIEW_ROUTE = '/features/search-overview';

export const SEARCH_OVERVIEW_TEST_ID = 'feature-search-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'search-overview',
  title: 'Search Overview',
  route: SEARCH_OVERVIEW_ROUTE,
  testId: SEARCH_OVERVIEW_TEST_ID,
  domain: 'search',
  kind: 'overview',
  itemCount: 9,
};

export function searchOverviewItemPath(itemId: string): string {
  return `${SEARCH_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
