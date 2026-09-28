export const INVENTORY_INSIGHTS_ROUTE = '/features/inventory-insights';

export const INVENTORY_INSIGHTS_TEST_ID = 'feature-inventory-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'inventory-insights',
  title: 'Inventory Insights',
  route: INVENTORY_INSIGHTS_ROUTE,
  testId: INVENTORY_INSIGHTS_TEST_ID,
  domain: 'inventory',
  kind: 'insights',
  itemCount: 9,
};

export function inventoryInsightsItemPath(itemId: string): string {
  return `${INVENTORY_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
