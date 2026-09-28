export const PROFILE_SETTINGS_ROUTE = '/features/profile-settings';

export const PROFILE_SETTINGS_TEST_ID = 'feature-profile-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_SETTINGS_FEATURE: FeatureMeta = {
  id: 'profile-settings',
  title: 'Profile Settings',
  route: PROFILE_SETTINGS_ROUTE,
  testId: PROFILE_SETTINGS_TEST_ID,
  domain: 'profile',
  kind: 'settings',
  itemCount: 9,
};

export function profileSettingsItemPath(itemId: string): string {
  return `${PROFILE_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
