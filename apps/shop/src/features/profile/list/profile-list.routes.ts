export const PROFILE_LIST_ROUTE = '/features/profile-list';

export const PROFILE_LIST_TEST_ID = 'feature-profile-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_LIST_FEATURE: FeatureMeta = {
  id: 'profile-list',
  title: 'Profile List',
  route: PROFILE_LIST_ROUTE,
  testId: PROFILE_LIST_TEST_ID,
  domain: 'profile',
  kind: 'list',
  itemCount: 10,
};

export function profileListItemPath(itemId: string): string {
  return `${PROFILE_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
