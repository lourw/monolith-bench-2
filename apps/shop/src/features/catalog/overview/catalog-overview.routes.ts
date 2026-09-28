export const CATALOG_OVERVIEW_ROUTE = '/features/catalog-overview';

export const CATALOG_OVERVIEW_TEST_ID = 'feature-catalog-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'catalog-overview',
  title: 'Catalog Overview',
  route: CATALOG_OVERVIEW_ROUTE,
  testId: CATALOG_OVERVIEW_TEST_ID,
  domain: 'catalog',
  kind: 'overview',
  itemCount: 11,
};

export function catalogOverviewItemPath(itemId: string): string {
  return `${CATALOG_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
