export const LOYALTY_WIZARD_ROUTE = '/features/loyalty-wizard';

export const LOYALTY_WIZARD_TEST_ID = 'feature-loyalty-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_WIZARD_FEATURE: FeatureMeta = {
  id: 'loyalty-wizard',
  title: 'Loyalty Wizard',
  route: LOYALTY_WIZARD_ROUTE,
  testId: LOYALTY_WIZARD_TEST_ID,
  domain: 'loyalty',
  kind: 'wizard',
  itemCount: 12,
};

export function loyaltyWizardItemPath(itemId: string): string {
  return `${LOYALTY_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
