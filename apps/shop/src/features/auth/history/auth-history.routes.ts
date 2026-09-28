export const AUTH_HISTORY_ROUTE = '/features/auth-history';

export const AUTH_HISTORY_TEST_ID = 'feature-auth-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_HISTORY_FEATURE: FeatureMeta = {
  id: 'auth-history',
  title: 'Auth History',
  route: AUTH_HISTORY_ROUTE,
  testId: AUTH_HISTORY_TEST_ID,
  domain: 'auth',
  kind: 'history',
  itemCount: 5,
};

export function authHistoryItemPath(itemId: string): string {
  return `${AUTH_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
