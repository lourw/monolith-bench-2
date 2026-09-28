export const ACCOUNT_LIST_ROUTE = '/features/account-list';

export const ACCOUNT_LIST_TEST_ID = 'feature-account-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_LIST_FEATURE: FeatureMeta = {
  id: 'account-list',
  title: 'Account List',
  route: ACCOUNT_LIST_ROUTE,
  testId: ACCOUNT_LIST_TEST_ID,
  domain: 'account',
  kind: 'list',
  itemCount: 11,
};

export function accountListItemPath(itemId: string): string {
  return `${ACCOUNT_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
