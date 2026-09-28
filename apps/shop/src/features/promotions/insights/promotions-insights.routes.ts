export const PROMOTIONS_INSIGHTS_ROUTE = '/features/promotions-insights';

export const PROMOTIONS_INSIGHTS_TEST_ID = 'feature-promotions-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'promotions-insights',
  title: 'Promotions Insights',
  route: PROMOTIONS_INSIGHTS_ROUTE,
  testId: PROMOTIONS_INSIGHTS_TEST_ID,
  domain: 'promotions',
  kind: 'insights',
  itemCount: 6,
};

export function promotionsInsightsItemPath(itemId: string): string {
  return `${PROMOTIONS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
