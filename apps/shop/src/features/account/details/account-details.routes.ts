export const ACCOUNT_DETAILS_ROUTE = '/features/account-details';

export const ACCOUNT_DETAILS_TEST_ID = 'feature-account-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_DETAILS_FEATURE: FeatureMeta = {
  id: 'account-details',
  title: 'Account Details',
  route: ACCOUNT_DETAILS_ROUTE,
  testId: ACCOUNT_DETAILS_TEST_ID,
  domain: 'account',
  kind: 'details',
  itemCount: 9,
};

export function accountDetailsItemPath(itemId: string): string {
  return `${ACCOUNT_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
