export const INVENTORY_LIST_ROUTE = '/features/inventory-list';

export const INVENTORY_LIST_TEST_ID = 'feature-inventory-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_LIST_FEATURE: FeatureMeta = {
  id: 'inventory-list',
  title: 'Inventory List',
  route: INVENTORY_LIST_ROUTE,
  testId: INVENTORY_LIST_TEST_ID,
  domain: 'inventory',
  kind: 'list',
  itemCount: 5,
};

export function inventoryListItemPath(itemId: string): string {
  return `${INVENTORY_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
