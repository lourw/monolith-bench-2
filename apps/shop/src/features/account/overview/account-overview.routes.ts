export const ACCOUNT_OVERVIEW_ROUTE = '/features/account-overview';

export const ACCOUNT_OVERVIEW_TEST_ID = 'feature-account-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'account-overview',
  title: 'Account Overview',
  route: ACCOUNT_OVERVIEW_ROUTE,
  testId: ACCOUNT_OVERVIEW_TEST_ID,
  domain: 'account',
  kind: 'overview',
  itemCount: 12,
};

export function accountOverviewItemPath(itemId: string): string {
  return `${ACCOUNT_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
