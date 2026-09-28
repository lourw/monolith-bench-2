export const CATALOG_DETAILS_ROUTE = '/features/catalog-details';

export const CATALOG_DETAILS_TEST_ID = 'feature-catalog-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_DETAILS_FEATURE: FeatureMeta = {
  id: 'catalog-details',
  title: 'Catalog Details',
  route: CATALOG_DETAILS_ROUTE,
  testId: CATALOG_DETAILS_TEST_ID,
  domain: 'catalog',
  kind: 'details',
  itemCount: 8,
};

export function catalogDetailsItemPath(itemId: string): string {
  return `${CATALOG_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
