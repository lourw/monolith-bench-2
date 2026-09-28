export const CATALOG_HISTORY_ROUTE = '/features/catalog-history';

export const CATALOG_HISTORY_TEST_ID = 'feature-catalog-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_HISTORY_FEATURE: FeatureMeta = {
  id: 'catalog-history',
  title: 'Catalog History',
  route: CATALOG_HISTORY_ROUTE,
  testId: CATALOG_HISTORY_TEST_ID,
  domain: 'catalog',
  kind: 'history',
  itemCount: 7,
};

export function catalogHistoryItemPath(itemId: string): string {
  return `${CATALOG_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
