export const CATALOG_LIST_ROUTE = '/features/catalog-list';

export const CATALOG_LIST_TEST_ID = 'feature-catalog-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_LIST_FEATURE: FeatureMeta = {
  id: 'catalog-list',
  title: 'Catalog List',
  route: CATALOG_LIST_ROUTE,
  testId: CATALOG_LIST_TEST_ID,
  domain: 'catalog',
  kind: 'list',
  itemCount: 8,
};

export function catalogListItemPath(itemId: string): string {
  return `${CATALOG_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
