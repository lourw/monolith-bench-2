export const AUTH_LIST_ROUTE = '/features/auth-list';

export const AUTH_LIST_TEST_ID = 'feature-auth-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_LIST_FEATURE: FeatureMeta = {
  id: 'auth-list',
  title: 'Auth List',
  route: AUTH_LIST_ROUTE,
  testId: AUTH_LIST_TEST_ID,
  domain: 'auth',
  kind: 'list',
  itemCount: 5,
};

export function authListItemPath(itemId: string): string {
  return `${AUTH_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
