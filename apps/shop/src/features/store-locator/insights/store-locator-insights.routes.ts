export const STORE_LOCATOR_INSIGHTS_ROUTE = '/features/store-locator-insights';

export const STORE_LOCATOR_INSIGHTS_TEST_ID = 'feature-store-locator-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'store-locator-insights',
  title: 'Store Locator Insights',
  route: STORE_LOCATOR_INSIGHTS_ROUTE,
  testId: STORE_LOCATOR_INSIGHTS_TEST_ID,
  domain: 'store-locator',
  kind: 'insights',
  itemCount: 12,
};

export function storeLocatorInsightsItemPath(itemId: string): string {
  return `${STORE_LOCATOR_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
