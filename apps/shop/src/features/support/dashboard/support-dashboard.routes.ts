export const SUPPORT_DASHBOARD_ROUTE = '/features/support-dashboard';

export const SUPPORT_DASHBOARD_TEST_ID = 'feature-support-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'support-dashboard',
  title: 'Support Dashboard',
  route: SUPPORT_DASHBOARD_ROUTE,
  testId: SUPPORT_DASHBOARD_TEST_ID,
  domain: 'support',
  kind: 'dashboard',
  itemCount: 11,
};

export function supportDashboardItemPath(itemId: string): string {
  return `${SUPPORT_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
