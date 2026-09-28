export const RECOMMENDATIONS_DASHBOARD_ROUTE =
  '/features/recommendations-dashboard';

export const RECOMMENDATIONS_DASHBOARD_TEST_ID =
  'feature-recommendations-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'recommendations-dashboard',
  title: 'Recommendations Dashboard',
  route: RECOMMENDATIONS_DASHBOARD_ROUTE,
  testId: RECOMMENDATIONS_DASHBOARD_TEST_ID,
  domain: 'recommendations',
  kind: 'dashboard',
  itemCount: 8,
};

export function recommendationsDashboardItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
