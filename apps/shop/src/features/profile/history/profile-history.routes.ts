export const PROFILE_HISTORY_ROUTE = '/features/profile-history';

export const PROFILE_HISTORY_TEST_ID = 'feature-profile-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_HISTORY_FEATURE: FeatureMeta = {
  id: 'profile-history',
  title: 'Profile History',
  route: PROFILE_HISTORY_ROUTE,
  testId: PROFILE_HISTORY_TEST_ID,
  domain: 'profile',
  kind: 'history',
  itemCount: 8,
};

export function profileHistoryItemPath(itemId: string): string {
  return `${PROFILE_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
