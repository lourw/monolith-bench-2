export const ACCOUNT_WIZARD_ROUTE = '/features/account-wizard';

export const ACCOUNT_WIZARD_TEST_ID = 'feature-account-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_WIZARD_FEATURE: FeatureMeta = {
  id: 'account-wizard',
  title: 'Account Wizard',
  route: ACCOUNT_WIZARD_ROUTE,
  testId: ACCOUNT_WIZARD_TEST_ID,
  domain: 'account',
  kind: 'wizard',
  itemCount: 7,
};

export function accountWizardItemPath(itemId: string): string {
  return `${ACCOUNT_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
