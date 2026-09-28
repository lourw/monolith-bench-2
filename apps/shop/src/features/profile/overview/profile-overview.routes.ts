export const PROFILE_OVERVIEW_ROUTE = '/features/profile-overview';

export const PROFILE_OVERVIEW_TEST_ID = 'feature-profile-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'profile-overview',
  title: 'Profile Overview',
  route: PROFILE_OVERVIEW_ROUTE,
  testId: PROFILE_OVERVIEW_TEST_ID,
  domain: 'profile',
  kind: 'overview',
  itemCount: 12,
};

export function profileOverviewItemPath(itemId: string): string {
  return `${PROFILE_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
