export const ADDRESSES_SUMMARY_ROUTE = '/features/addresses-summary';

export const ADDRESSES_SUMMARY_TEST_ID = 'feature-addresses-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_SUMMARY_FEATURE: FeatureMeta = {
  id: 'addresses-summary',
  title: 'Addresses Summary',
  route: ADDRESSES_SUMMARY_ROUTE,
  testId: ADDRESSES_SUMMARY_TEST_ID,
  domain: 'addresses',
  kind: 'summary',
  itemCount: 12,
};

export function addressesSummaryItemPath(itemId: string): string {
  return `${ADDRESSES_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
