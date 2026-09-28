export const AUTH_DASHBOARD_ROUTE = '/features/auth-dashboard';

export const AUTH_DASHBOARD_TEST_ID = 'feature-auth-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'auth-dashboard',
  title: 'Auth Dashboard',
  route: AUTH_DASHBOARD_ROUTE,
  testId: AUTH_DASHBOARD_TEST_ID,
  domain: 'auth',
  kind: 'dashboard',
  itemCount: 12,
};

export function authDashboardItemPath(itemId: string): string {
  return `${AUTH_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
