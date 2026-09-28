export const ACCOUNT_SUMMARY_ROUTE = '/features/account-summary';

export const ACCOUNT_SUMMARY_TEST_ID = 'feature-account-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_SUMMARY_FEATURE: FeatureMeta = {
  id: 'account-summary',
  title: 'Account Summary',
  route: ACCOUNT_SUMMARY_ROUTE,
  testId: ACCOUNT_SUMMARY_TEST_ID,
  domain: 'account',
  kind: 'summary',
  itemCount: 10,
};

export function accountSummaryItemPath(itemId: string): string {
  return `${ACCOUNT_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
