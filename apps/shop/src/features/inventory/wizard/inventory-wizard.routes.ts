export const INVENTORY_WIZARD_ROUTE = '/features/inventory-wizard';

export const INVENTORY_WIZARD_TEST_ID = 'feature-inventory-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_WIZARD_FEATURE: FeatureMeta = {
  id: 'inventory-wizard',
  title: 'Inventory Wizard',
  route: INVENTORY_WIZARD_ROUTE,
  testId: INVENTORY_WIZARD_TEST_ID,
  domain: 'inventory',
  kind: 'wizard',
  itemCount: 6,
};

export function inventoryWizardItemPath(itemId: string): string {
  return `${INVENTORY_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
