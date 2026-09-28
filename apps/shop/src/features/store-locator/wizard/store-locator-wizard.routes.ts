export const STORE_LOCATOR_WIZARD_ROUTE = '/features/store-locator-wizard';

export const STORE_LOCATOR_WIZARD_TEST_ID = 'feature-store-locator-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_WIZARD_FEATURE: FeatureMeta = {
  id: 'store-locator-wizard',
  title: 'Store Locator Wizard',
  route: STORE_LOCATOR_WIZARD_ROUTE,
  testId: STORE_LOCATOR_WIZARD_TEST_ID,
  domain: 'store-locator',
  kind: 'wizard',
  itemCount: 9,
};

export function storeLocatorWizardItemPath(itemId: string): string {
  return `${STORE_LOCATOR_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
