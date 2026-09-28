export const ADDRESSES_LIST_ROUTE = '/features/addresses-list';

export const ADDRESSES_LIST_TEST_ID = 'feature-addresses-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_LIST_FEATURE: FeatureMeta = {
  id: 'addresses-list',
  title: 'Addresses List',
  route: ADDRESSES_LIST_ROUTE,
  testId: ADDRESSES_LIST_TEST_ID,
  domain: 'addresses',
  kind: 'list',
  itemCount: 5,
};

export function addressesListItemPath(itemId: string): string {
  return `${ADDRESSES_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
