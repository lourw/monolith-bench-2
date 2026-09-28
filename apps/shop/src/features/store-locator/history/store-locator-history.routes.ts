export const STORE_LOCATOR_HISTORY_ROUTE = '/features/store-locator-history';

export const STORE_LOCATOR_HISTORY_TEST_ID = 'feature-store-locator-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_HISTORY_FEATURE: FeatureMeta = {
  id: 'store-locator-history',
  title: 'Store Locator History',
  route: STORE_LOCATOR_HISTORY_ROUTE,
  testId: STORE_LOCATOR_HISTORY_TEST_ID,
  domain: 'store-locator',
  kind: 'history',
  itemCount: 8,
};

export function storeLocatorHistoryItemPath(itemId: string): string {
  return `${STORE_LOCATOR_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
