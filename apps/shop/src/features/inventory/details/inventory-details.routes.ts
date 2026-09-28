export const INVENTORY_DETAILS_ROUTE = '/features/inventory-details';

export const INVENTORY_DETAILS_TEST_ID = 'feature-inventory-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_DETAILS_FEATURE: FeatureMeta = {
  id: 'inventory-details',
  title: 'Inventory Details',
  route: INVENTORY_DETAILS_ROUTE,
  testId: INVENTORY_DETAILS_TEST_ID,
  domain: 'inventory',
  kind: 'details',
  itemCount: 6,
};

export function inventoryDetailsItemPath(itemId: string): string {
  return `${INVENTORY_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
