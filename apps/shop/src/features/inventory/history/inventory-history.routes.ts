export const INVENTORY_HISTORY_ROUTE = '/features/inventory-history';

export const INVENTORY_HISTORY_TEST_ID = 'feature-inventory-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_HISTORY_FEATURE: FeatureMeta = {
  id: 'inventory-history',
  title: 'Inventory History',
  route: INVENTORY_HISTORY_ROUTE,
  testId: INVENTORY_HISTORY_TEST_ID,
  domain: 'inventory',
  kind: 'history',
  itemCount: 9,
};

export function inventoryHistoryItemPath(itemId: string): string {
  return `${INVENTORY_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
