export const AUTH_SETTINGS_ROUTE = '/features/auth-settings';

export const AUTH_SETTINGS_TEST_ID = 'feature-auth-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_SETTINGS_FEATURE: FeatureMeta = {
  id: 'auth-settings',
  title: 'Auth Settings',
  route: AUTH_SETTINGS_ROUTE,
  testId: AUTH_SETTINGS_TEST_ID,
  domain: 'auth',
  kind: 'settings',
  itemCount: 12,
};

export function authSettingsItemPath(itemId: string): string {
  return `${AUTH_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
