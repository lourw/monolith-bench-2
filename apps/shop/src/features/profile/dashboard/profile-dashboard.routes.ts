export const PROFILE_DASHBOARD_ROUTE = '/features/profile-dashboard';

export const PROFILE_DASHBOARD_TEST_ID = 'feature-profile-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'profile-dashboard',
  title: 'Profile Dashboard',
  route: PROFILE_DASHBOARD_ROUTE,
  testId: PROFILE_DASHBOARD_TEST_ID,
  domain: 'profile',
  kind: 'dashboard',
  itemCount: 6,
};

export function profileDashboardItemPath(itemId: string): string {
  return `${PROFILE_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
