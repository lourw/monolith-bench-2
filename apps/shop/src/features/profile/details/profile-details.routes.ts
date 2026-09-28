export const PROFILE_DETAILS_ROUTE = '/features/profile-details';

export const PROFILE_DETAILS_TEST_ID = 'feature-profile-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_DETAILS_FEATURE: FeatureMeta = {
  id: 'profile-details',
  title: 'Profile Details',
  route: PROFILE_DETAILS_ROUTE,
  testId: PROFILE_DETAILS_TEST_ID,
  domain: 'profile',
  kind: 'details',
  itemCount: 10,
};

export function profileDetailsItemPath(itemId: string): string {
  return `${PROFILE_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
