export const PROMOTIONS_WIZARD_ROUTE = '/features/promotions-wizard';

export const PROMOTIONS_WIZARD_TEST_ID = 'feature-promotions-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_WIZARD_FEATURE: FeatureMeta = {
  id: 'promotions-wizard',
  title: 'Promotions Wizard',
  route: PROMOTIONS_WIZARD_ROUTE,
  testId: PROMOTIONS_WIZARD_TEST_ID,
  domain: 'promotions',
  kind: 'wizard',
  itemCount: 7,
};

export function promotionsWizardItemPath(itemId: string): string {
  return `${PROMOTIONS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
