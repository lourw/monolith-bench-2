export const PAYMENTS_DASHBOARD_ROUTE = '/features/payments-dashboard';

export const PAYMENTS_DASHBOARD_TEST_ID = 'feature-payments-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'payments-dashboard',
  title: 'Payments Dashboard',
  route: PAYMENTS_DASHBOARD_ROUTE,
  testId: PAYMENTS_DASHBOARD_TEST_ID,
  domain: 'payments',
  kind: 'dashboard',
  itemCount: 12,
};

export function paymentsDashboardItemPath(itemId: string): string {
  return `${PAYMENTS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
