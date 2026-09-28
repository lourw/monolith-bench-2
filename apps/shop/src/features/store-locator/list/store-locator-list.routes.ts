export const STORE_LOCATOR_LIST_ROUTE = '/features/store-locator-list';

export const STORE_LOCATOR_LIST_TEST_ID = 'feature-store-locator-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_LIST_FEATURE: FeatureMeta = {
  id: 'store-locator-list',
  title: 'Store Locator List',
  route: STORE_LOCATOR_LIST_ROUTE,
  testId: STORE_LOCATOR_LIST_TEST_ID,
  domain: 'store-locator',
  kind: 'list',
  itemCount: 11,
};

export function storeLocatorListItemPath(itemId: string): string {
  return `${STORE_LOCATOR_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
