export const PROFILE_INSIGHTS_ROUTE = '/features/profile-insights';

export const PROFILE_INSIGHTS_TEST_ID = 'feature-profile-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'profile-insights',
  title: 'Profile Insights',
  route: PROFILE_INSIGHTS_ROUTE,
  testId: PROFILE_INSIGHTS_TEST_ID,
  domain: 'profile',
  kind: 'insights',
  itemCount: 7,
};

export function profileInsightsItemPath(itemId: string): string {
  return `${PROFILE_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
