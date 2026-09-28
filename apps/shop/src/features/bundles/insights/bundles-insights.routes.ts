export const BUNDLES_INSIGHTS_ROUTE = '/features/bundles-insights';

export const BUNDLES_INSIGHTS_TEST_ID = 'feature-bundles-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'bundles-insights',
  title: 'Bundles Insights',
  route: BUNDLES_INSIGHTS_ROUTE,
  testId: BUNDLES_INSIGHTS_TEST_ID,
  domain: 'bundles',
  kind: 'insights',
  itemCount: 6,
};

export function bundlesInsightsItemPath(itemId: string): string {
  return `${BUNDLES_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
