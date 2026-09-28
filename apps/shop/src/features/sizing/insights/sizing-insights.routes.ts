export const SIZING_INSIGHTS_ROUTE = '/features/sizing-insights';

export const SIZING_INSIGHTS_TEST_ID = 'feature-sizing-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'sizing-insights',
  title: 'Sizing Insights',
  route: SIZING_INSIGHTS_ROUTE,
  testId: SIZING_INSIGHTS_TEST_ID,
  domain: 'sizing',
  kind: 'insights',
  itemCount: 9,
};

export function sizingInsightsItemPath(itemId: string): string {
  return `${SIZING_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
