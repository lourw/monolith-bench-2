export const BUNDLES_WIZARD_ROUTE = '/features/bundles-wizard';

export const BUNDLES_WIZARD_TEST_ID = 'feature-bundles-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_WIZARD_FEATURE: FeatureMeta = {
  id: 'bundles-wizard',
  title: 'Bundles Wizard',
  route: BUNDLES_WIZARD_ROUTE,
  testId: BUNDLES_WIZARD_TEST_ID,
  domain: 'bundles',
  kind: 'wizard',
  itemCount: 11,
};

export function bundlesWizardItemPath(itemId: string): string {
  return `${BUNDLES_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
