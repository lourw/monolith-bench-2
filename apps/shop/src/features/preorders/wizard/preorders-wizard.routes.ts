export const PREORDERS_WIZARD_ROUTE = '/features/preorders-wizard';

export const PREORDERS_WIZARD_TEST_ID = 'feature-preorders-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_WIZARD_FEATURE: FeatureMeta = {
  id: 'preorders-wizard',
  title: 'Preorders Wizard',
  route: PREORDERS_WIZARD_ROUTE,
  testId: PREORDERS_WIZARD_TEST_ID,
  domain: 'preorders',
  kind: 'wizard',
  itemCount: 9,
};

export function preordersWizardItemPath(itemId: string): string {
  return `${PREORDERS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
