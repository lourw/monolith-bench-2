export const SUPPORT_WIZARD_ROUTE = '/features/support-wizard';

export const SUPPORT_WIZARD_TEST_ID = 'feature-support-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_WIZARD_FEATURE: FeatureMeta = {
  id: 'support-wizard',
  title: 'Support Wizard',
  route: SUPPORT_WIZARD_ROUTE,
  testId: SUPPORT_WIZARD_TEST_ID,
  domain: 'support',
  kind: 'wizard',
  itemCount: 10,
};

export function supportWizardItemPath(itemId: string): string {
  return `${SUPPORT_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
