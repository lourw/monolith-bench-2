export const SEARCH_DETAILS_ROUTE = '/features/search-details';

export const SEARCH_DETAILS_TEST_ID = 'feature-search-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_DETAILS_FEATURE: FeatureMeta = {
  id: 'search-details',
  title: 'Search Details',
  route: SEARCH_DETAILS_ROUTE,
  testId: SEARCH_DETAILS_TEST_ID,
  domain: 'search',
  kind: 'details',
  itemCount: 7,
};

export function searchDetailsItemPath(itemId: string): string {
  return `${SEARCH_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
