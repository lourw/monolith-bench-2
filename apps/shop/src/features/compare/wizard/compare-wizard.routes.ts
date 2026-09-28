export const COMPARE_WIZARD_ROUTE = '/features/compare-wizard';

export const COMPARE_WIZARD_TEST_ID = 'feature-compare-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_WIZARD_FEATURE: FeatureMeta = {
  id: 'compare-wizard',
  title: 'Compare Wizard',
  route: COMPARE_WIZARD_ROUTE,
  testId: COMPARE_WIZARD_TEST_ID,
  domain: 'compare',
  kind: 'wizard',
  itemCount: 5,
};

export function compareWizardItemPath(itemId: string): string {
  return `${COMPARE_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
