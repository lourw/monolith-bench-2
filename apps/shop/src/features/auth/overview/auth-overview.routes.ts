export const AUTH_OVERVIEW_ROUTE = '/features/auth-overview';

export const AUTH_OVERVIEW_TEST_ID = 'feature-auth-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'auth-overview',
  title: 'Auth Overview',
  route: AUTH_OVERVIEW_ROUTE,
  testId: AUTH_OVERVIEW_TEST_ID,
  domain: 'auth',
  kind: 'overview',
  itemCount: 7,
};

export function authOverviewItemPath(itemId: string): string {
  return `${AUTH_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
