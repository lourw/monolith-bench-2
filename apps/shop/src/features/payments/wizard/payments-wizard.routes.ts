export const PAYMENTS_WIZARD_ROUTE = '/features/payments-wizard';

export const PAYMENTS_WIZARD_TEST_ID = 'feature-payments-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_WIZARD_FEATURE: FeatureMeta = {
  id: 'payments-wizard',
  title: 'Payments Wizard',
  route: PAYMENTS_WIZARD_ROUTE,
  testId: PAYMENTS_WIZARD_TEST_ID,
  domain: 'payments',
  kind: 'wizard',
  itemCount: 7,
};

export function paymentsWizardItemPath(itemId: string): string {
  return `${PAYMENTS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
