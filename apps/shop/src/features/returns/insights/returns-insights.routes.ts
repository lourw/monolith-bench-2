export const RETURNS_INSIGHTS_ROUTE = '/features/returns-insights';

export const RETURNS_INSIGHTS_TEST_ID = 'feature-returns-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'returns-insights',
  title: 'Returns Insights',
  route: RETURNS_INSIGHTS_ROUTE,
  testId: RETURNS_INSIGHTS_TEST_ID,
  domain: 'returns',
  kind: 'insights',
  itemCount: 6,
};

export function returnsInsightsItemPath(itemId: string): string {
  return `${RETURNS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
