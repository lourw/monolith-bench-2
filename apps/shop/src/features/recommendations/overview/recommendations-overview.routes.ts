export const RECOMMENDATIONS_OVERVIEW_ROUTE =
  '/features/recommendations-overview';

export const RECOMMENDATIONS_OVERVIEW_TEST_ID =
  'feature-recommendations-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'recommendations-overview',
  title: 'Recommendations Overview',
  route: RECOMMENDATIONS_OVERVIEW_ROUTE,
  testId: RECOMMENDATIONS_OVERVIEW_TEST_ID,
  domain: 'recommendations',
  kind: 'overview',
  itemCount: 11,
};

export function recommendationsOverviewItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
