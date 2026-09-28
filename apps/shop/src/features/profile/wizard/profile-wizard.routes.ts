export const PROFILE_WIZARD_ROUTE = '/features/profile-wizard';

export const PROFILE_WIZARD_TEST_ID = 'feature-profile-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_WIZARD_FEATURE: FeatureMeta = {
  id: 'profile-wizard',
  title: 'Profile Wizard',
  route: PROFILE_WIZARD_ROUTE,
  testId: PROFILE_WIZARD_TEST_ID,
  domain: 'profile',
  kind: 'wizard',
  itemCount: 8,
};

export function profileWizardItemPath(itemId: string): string {
  return `${PROFILE_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
