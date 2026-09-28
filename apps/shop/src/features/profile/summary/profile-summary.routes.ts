export const PROFILE_SUMMARY_ROUTE = '/features/profile-summary';

export const PROFILE_SUMMARY_TEST_ID = 'feature-profile-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_SUMMARY_FEATURE: FeatureMeta = {
  id: 'profile-summary',
  title: 'Profile Summary',
  route: PROFILE_SUMMARY_ROUTE,
  testId: PROFILE_SUMMARY_TEST_ID,
  domain: 'profile',
  kind: 'summary',
  itemCount: 11,
};

export function profileSummaryItemPath(itemId: string): string {
  return `${PROFILE_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
