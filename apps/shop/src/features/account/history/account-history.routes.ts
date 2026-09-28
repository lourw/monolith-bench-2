export const ACCOUNT_HISTORY_ROUTE = '/features/account-history';

export const ACCOUNT_HISTORY_TEST_ID = 'feature-account-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_HISTORY_FEATURE: FeatureMeta = {
  id: 'account-history',
  title: 'Account History',
  route: ACCOUNT_HISTORY_ROUTE,
  testId: ACCOUNT_HISTORY_TEST_ID,
  domain: 'account',
  kind: 'history',
  itemCount: 5,
};

export function accountHistoryItemPath(itemId: string): string {
  return `${ACCOUNT_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
