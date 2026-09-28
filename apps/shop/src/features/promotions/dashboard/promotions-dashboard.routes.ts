export const PROMOTIONS_DASHBOARD_ROUTE = '/features/promotions-dashboard';

export const PROMOTIONS_DASHBOARD_TEST_ID = 'feature-promotions-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'promotions-dashboard',
  title: 'Promotions Dashboard',
  route: PROMOTIONS_DASHBOARD_ROUTE,
  testId: PROMOTIONS_DASHBOARD_TEST_ID,
  domain: 'promotions',
  kind: 'dashboard',
  itemCount: 8,
};

export function promotionsDashboardItemPath(itemId: string): string {
  return `${PROMOTIONS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
