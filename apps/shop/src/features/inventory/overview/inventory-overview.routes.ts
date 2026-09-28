export const INVENTORY_OVERVIEW_ROUTE = '/features/inventory-overview';

export const INVENTORY_OVERVIEW_TEST_ID = 'feature-inventory-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'inventory-overview',
  title: 'Inventory Overview',
  route: INVENTORY_OVERVIEW_ROUTE,
  testId: INVENTORY_OVERVIEW_TEST_ID,
  domain: 'inventory',
  kind: 'overview',
  itemCount: 6,
};

export function inventoryOverviewItemPath(itemId: string): string {
  return `${INVENTORY_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
