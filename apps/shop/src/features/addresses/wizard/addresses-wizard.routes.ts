export const ADDRESSES_WIZARD_ROUTE = '/features/addresses-wizard';

export const ADDRESSES_WIZARD_TEST_ID = 'feature-addresses-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_WIZARD_FEATURE: FeatureMeta = {
  id: 'addresses-wizard',
  title: 'Addresses Wizard',
  route: ADDRESSES_WIZARD_ROUTE,
  testId: ADDRESSES_WIZARD_TEST_ID,
  domain: 'addresses',
  kind: 'wizard',
  itemCount: 5,
};

export function addressesWizardItemPath(itemId: string): string {
  return `${ADDRESSES_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
