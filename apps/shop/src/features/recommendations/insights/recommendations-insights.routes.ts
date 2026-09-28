export const RECOMMENDATIONS_INSIGHTS_ROUTE =
  '/features/recommendations-insights';

export const RECOMMENDATIONS_INSIGHTS_TEST_ID =
  'feature-recommendations-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'recommendations-insights',
  title: 'Recommendations Insights',
  route: RECOMMENDATIONS_INSIGHTS_ROUTE,
  testId: RECOMMENDATIONS_INSIGHTS_TEST_ID,
  domain: 'recommendations',
  kind: 'insights',
  itemCount: 12,
};

export function recommendationsInsightsItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
