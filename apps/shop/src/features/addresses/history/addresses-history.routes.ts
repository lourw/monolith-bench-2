export const ADDRESSES_HISTORY_ROUTE = '/features/addresses-history';

export const ADDRESSES_HISTORY_TEST_ID = 'feature-addresses-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_HISTORY_FEATURE: FeatureMeta = {
  id: 'addresses-history',
  title: 'Addresses History',
  route: ADDRESSES_HISTORY_ROUTE,
  testId: ADDRESSES_HISTORY_TEST_ID,
  domain: 'addresses',
  kind: 'history',
  itemCount: 9,
};

export function addressesHistoryItemPath(itemId: string): string {
  return `${ADDRESSES_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
