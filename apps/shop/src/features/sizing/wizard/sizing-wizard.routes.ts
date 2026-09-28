export const SIZING_WIZARD_ROUTE = '/features/sizing-wizard';

export const SIZING_WIZARD_TEST_ID = 'feature-sizing-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_WIZARD_FEATURE: FeatureMeta = {
  id: 'sizing-wizard',
  title: 'Sizing Wizard',
  route: SIZING_WIZARD_ROUTE,
  testId: SIZING_WIZARD_TEST_ID,
  domain: 'sizing',
  kind: 'wizard',
  itemCount: 12,
};

export function sizingWizardItemPath(itemId: string): string {
  return `${SIZING_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
