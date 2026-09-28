export const PREORDERS_INSIGHTS_ROUTE = '/features/preorders-insights';

export const PREORDERS_INSIGHTS_TEST_ID = 'feature-preorders-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'preorders-insights',
  title: 'Preorders Insights',
  route: PREORDERS_INSIGHTS_ROUTE,
  testId: PREORDERS_INSIGHTS_TEST_ID,
  domain: 'preorders',
  kind: 'insights',
  itemCount: 10,
};

export function preordersInsightsItemPath(itemId: string): string {
  return `${PREORDERS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
