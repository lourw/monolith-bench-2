export const SUBSCRIPTIONS_DASHBOARD_ROUTE =
  '/features/subscriptions-dashboard';

export const SUBSCRIPTIONS_DASHBOARD_TEST_ID =
  'feature-subscriptions-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'subscriptions-dashboard',
  title: 'Subscriptions Dashboard',
  route: SUBSCRIPTIONS_DASHBOARD_ROUTE,
  testId: SUBSCRIPTIONS_DASHBOARD_TEST_ID,
  domain: 'subscriptions',
  kind: 'dashboard',
  itemCount: 9,
};

export function subscriptionsDashboardItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
