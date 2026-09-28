export const ADDRESSES_INSIGHTS_ROUTE = '/features/addresses-insights';

export const ADDRESSES_INSIGHTS_TEST_ID = 'feature-addresses-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'addresses-insights',
  title: 'Addresses Insights',
  route: ADDRESSES_INSIGHTS_ROUTE,
  testId: ADDRESSES_INSIGHTS_TEST_ID,
  domain: 'addresses',
  kind: 'insights',
  itemCount: 6,
};

export function addressesInsightsItemPath(itemId: string): string {
  return `${ADDRESSES_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
