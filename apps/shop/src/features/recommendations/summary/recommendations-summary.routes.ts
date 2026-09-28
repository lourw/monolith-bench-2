export const RECOMMENDATIONS_SUMMARY_ROUTE =
  '/features/recommendations-summary';

export const RECOMMENDATIONS_SUMMARY_TEST_ID =
  'feature-recommendations-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'recommendations-summary',
  title: 'Recommendations Summary',
  route: RECOMMENDATIONS_SUMMARY_ROUTE,
  testId: RECOMMENDATIONS_SUMMARY_TEST_ID,
  domain: 'recommendations',
  kind: 'summary',
  itemCount: 7,
};

export function recommendationsSummaryItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
