export const STORE_LOCATOR_SUMMARY_ROUTE = '/features/store-locator-summary';

export const STORE_LOCATOR_SUMMARY_TEST_ID = 'feature-store-locator-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_SUMMARY_FEATURE: FeatureMeta = {
  id: 'store-locator-summary',
  title: 'Store Locator Summary',
  route: STORE_LOCATOR_SUMMARY_ROUTE,
  testId: STORE_LOCATOR_SUMMARY_TEST_ID,
  domain: 'store-locator',
  kind: 'summary',
  itemCount: 10,
};

export function storeLocatorSummaryItemPath(itemId: string): string {
  return `${STORE_LOCATOR_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
