export const STORE_LOCATOR_DETAILS_ROUTE = '/features/store-locator-details';

export const STORE_LOCATOR_DETAILS_TEST_ID = 'feature-store-locator-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_DETAILS_FEATURE: FeatureMeta = {
  id: 'store-locator-details',
  title: 'Store Locator Details',
  route: STORE_LOCATOR_DETAILS_ROUTE,
  testId: STORE_LOCATOR_DETAILS_TEST_ID,
  domain: 'store-locator',
  kind: 'details',
  itemCount: 8,
};

export function storeLocatorDetailsItemPath(itemId: string): string {
  return `${STORE_LOCATOR_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
