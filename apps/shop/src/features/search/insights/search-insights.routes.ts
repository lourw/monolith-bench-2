export const SEARCH_INSIGHTS_ROUTE = '/features/search-insights';

export const SEARCH_INSIGHTS_TEST_ID = 'feature-search-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'search-insights',
  title: 'Search Insights',
  route: SEARCH_INSIGHTS_ROUTE,
  testId: SEARCH_INSIGHTS_TEST_ID,
  domain: 'search',
  kind: 'insights',
  itemCount: 11,
};

export function searchInsightsItemPath(itemId: string): string {
  return `${SEARCH_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
