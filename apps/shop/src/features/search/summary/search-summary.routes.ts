export const SEARCH_SUMMARY_ROUTE = '/features/search-summary';

export const SEARCH_SUMMARY_TEST_ID = 'feature-search-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_SUMMARY_FEATURE: FeatureMeta = {
  id: 'search-summary',
  title: 'Search Summary',
  route: SEARCH_SUMMARY_ROUTE,
  testId: SEARCH_SUMMARY_TEST_ID,
  domain: 'search',
  kind: 'summary',
  itemCount: 10,
};

export function searchSummaryItemPath(itemId: string): string {
  return `${SEARCH_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
