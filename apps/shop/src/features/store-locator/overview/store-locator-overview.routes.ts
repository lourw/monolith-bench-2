export const STORE_LOCATOR_OVERVIEW_ROUTE = '/features/store-locator-overview';

export const STORE_LOCATOR_OVERVIEW_TEST_ID = 'feature-store-locator-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'store-locator-overview',
  title: 'Store Locator Overview',
  route: STORE_LOCATOR_OVERVIEW_ROUTE,
  testId: STORE_LOCATOR_OVERVIEW_TEST_ID,
  domain: 'store-locator',
  kind: 'overview',
  itemCount: 12,
};

export function storeLocatorOverviewItemPath(itemId: string): string {
  return `${STORE_LOCATOR_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
