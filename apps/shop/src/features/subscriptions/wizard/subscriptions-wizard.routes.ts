export const SUBSCRIPTIONS_WIZARD_ROUTE = '/features/subscriptions-wizard';

export const SUBSCRIPTIONS_WIZARD_TEST_ID = 'feature-subscriptions-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_WIZARD_FEATURE: FeatureMeta = {
  id: 'subscriptions-wizard',
  title: 'Subscriptions Wizard',
  route: SUBSCRIPTIONS_WIZARD_ROUTE,
  testId: SUBSCRIPTIONS_WIZARD_TEST_ID,
  domain: 'subscriptions',
  kind: 'wizard',
  itemCount: 9,
};

export function subscriptionsWizardItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
