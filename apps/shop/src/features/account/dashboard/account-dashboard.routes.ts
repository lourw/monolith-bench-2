export const ACCOUNT_DASHBOARD_ROUTE = '/features/account-dashboard';

export const ACCOUNT_DASHBOARD_TEST_ID = 'feature-account-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'account-dashboard',
  title: 'Account Dashboard',
  route: ACCOUNT_DASHBOARD_ROUTE,
  testId: ACCOUNT_DASHBOARD_TEST_ID,
  domain: 'account',
  kind: 'dashboard',
  itemCount: 5,
};

export function accountDashboardItemPath(itemId: string): string {
  return `${ACCOUNT_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
