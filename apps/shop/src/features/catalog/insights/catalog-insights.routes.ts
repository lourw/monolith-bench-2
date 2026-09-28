export const CATALOG_INSIGHTS_ROUTE = '/features/catalog-insights';

export const CATALOG_INSIGHTS_TEST_ID = 'feature-catalog-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'catalog-insights',
  title: 'Catalog Insights',
  route: CATALOG_INSIGHTS_ROUTE,
  testId: CATALOG_INSIGHTS_TEST_ID,
  domain: 'catalog',
  kind: 'insights',
  itemCount: 5,
};

export function catalogInsightsItemPath(itemId: string): string {
  return `${CATALOG_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
