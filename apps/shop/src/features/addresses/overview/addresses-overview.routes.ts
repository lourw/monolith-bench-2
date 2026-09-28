export const ADDRESSES_OVERVIEW_ROUTE = '/features/addresses-overview';

export const ADDRESSES_OVERVIEW_TEST_ID = 'feature-addresses-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'addresses-overview',
  title: 'Addresses Overview',
  route: ADDRESSES_OVERVIEW_ROUTE,
  testId: ADDRESSES_OVERVIEW_TEST_ID,
  domain: 'addresses',
  kind: 'overview',
  itemCount: 9,
};

export function addressesOverviewItemPath(itemId: string): string {
  return `${ADDRESSES_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
