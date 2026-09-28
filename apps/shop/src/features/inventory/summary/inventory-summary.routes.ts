export const INVENTORY_SUMMARY_ROUTE = '/features/inventory-summary';

export const INVENTORY_SUMMARY_TEST_ID = 'feature-inventory-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_SUMMARY_FEATURE: FeatureMeta = {
  id: 'inventory-summary',
  title: 'Inventory Summary',
  route: INVENTORY_SUMMARY_ROUTE,
  testId: INVENTORY_SUMMARY_TEST_ID,
  domain: 'inventory',
  kind: 'summary',
  itemCount: 10,
};

export function inventorySummaryItemPath(itemId: string): string {
  return `${INVENTORY_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
