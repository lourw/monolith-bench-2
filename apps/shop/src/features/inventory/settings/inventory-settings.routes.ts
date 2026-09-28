export const INVENTORY_SETTINGS_ROUTE = '/features/inventory-settings';

export const INVENTORY_SETTINGS_TEST_ID = 'feature-inventory-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_SETTINGS_FEATURE: FeatureMeta = {
  id: 'inventory-settings',
  title: 'Inventory Settings',
  route: INVENTORY_SETTINGS_ROUTE,
  testId: INVENTORY_SETTINGS_TEST_ID,
  domain: 'inventory',
  kind: 'settings',
  itemCount: 11,
};

export function inventorySettingsItemPath(itemId: string): string {
  return `${INVENTORY_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
