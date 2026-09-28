export const COMPARE_INSIGHTS_ROUTE = '/features/compare-insights';

export const COMPARE_INSIGHTS_TEST_ID = 'feature-compare-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'compare-insights',
  title: 'Compare Insights',
  route: COMPARE_INSIGHTS_ROUTE,
  testId: COMPARE_INSIGHTS_TEST_ID,
  domain: 'compare',
  kind: 'insights',
  itemCount: 6,
};

export function compareInsightsItemPath(itemId: string): string {
  return `${COMPARE_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
