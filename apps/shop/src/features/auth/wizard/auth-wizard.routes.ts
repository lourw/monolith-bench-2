export const AUTH_WIZARD_ROUTE = '/features/auth-wizard';

export const AUTH_WIZARD_TEST_ID = 'feature-auth-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_WIZARD_FEATURE: FeatureMeta = {
  id: 'auth-wizard',
  title: 'Auth Wizard',
  route: AUTH_WIZARD_ROUTE,
  testId: AUTH_WIZARD_TEST_ID,
  domain: 'auth',
  kind: 'wizard',
  itemCount: 6,
};

export function authWizardItemPath(itemId: string): string {
  return `${AUTH_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
