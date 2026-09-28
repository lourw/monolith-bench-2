export const CATALOG_SUMMARY_ROUTE = '/features/catalog-summary';

export const CATALOG_SUMMARY_TEST_ID = 'feature-catalog-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_SUMMARY_FEATURE: FeatureMeta = {
  id: 'catalog-summary',
  title: 'Catalog Summary',
  route: CATALOG_SUMMARY_ROUTE,
  testId: CATALOG_SUMMARY_TEST_ID,
  domain: 'catalog',
  kind: 'summary',
  itemCount: 10,
};

export function catalogSummaryItemPath(itemId: string): string {
  return `${CATALOG_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
