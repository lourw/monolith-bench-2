export const LOYALTY_DASHBOARD_ROUTE = '/features/loyalty-dashboard';

export const LOYALTY_DASHBOARD_TEST_ID = 'feature-loyalty-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'loyalty-dashboard',
  title: 'Loyalty Dashboard',
  route: LOYALTY_DASHBOARD_ROUTE,
  testId: LOYALTY_DASHBOARD_TEST_ID,
  domain: 'loyalty',
  kind: 'dashboard',
  itemCount: 5,
};

export function loyaltyDashboardItemPath(itemId: string): string {
  return `${LOYALTY_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
