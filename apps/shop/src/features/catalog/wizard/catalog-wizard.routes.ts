export const CATALOG_WIZARD_ROUTE = '/features/catalog-wizard';

export const CATALOG_WIZARD_TEST_ID = 'feature-catalog-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_WIZARD_FEATURE: FeatureMeta = {
  id: 'catalog-wizard',
  title: 'Catalog Wizard',
  route: CATALOG_WIZARD_ROUTE,
  testId: CATALOG_WIZARD_TEST_ID,
  domain: 'catalog',
  kind: 'wizard',
  itemCount: 10,
};

export function catalogWizardItemPath(itemId: string): string {
  return `${CATALOG_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
