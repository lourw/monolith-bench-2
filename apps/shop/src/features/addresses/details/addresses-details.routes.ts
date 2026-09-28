export const ADDRESSES_DETAILS_ROUTE = '/features/addresses-details';

export const ADDRESSES_DETAILS_TEST_ID = 'feature-addresses-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_DETAILS_FEATURE: FeatureMeta = {
  id: 'addresses-details',
  title: 'Addresses Details',
  route: ADDRESSES_DETAILS_ROUTE,
  testId: ADDRESSES_DETAILS_TEST_ID,
  domain: 'addresses',
  kind: 'details',
  itemCount: 7,
};

export function addressesDetailsItemPath(itemId: string): string {
  return `${ADDRESSES_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
