export const INVENTORY_DASHBOARD_ROUTE = '/features/inventory-dashboard';

export const INVENTORY_DASHBOARD_TEST_ID = 'feature-inventory-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'inventory-dashboard',
  title: 'Inventory Dashboard',
  route: INVENTORY_DASHBOARD_ROUTE,
  testId: INVENTORY_DASHBOARD_TEST_ID,
  domain: 'inventory',
  kind: 'dashboard',
  itemCount: 6,
};

export function inventoryDashboardItemPath(itemId: string): string {
  return `${INVENTORY_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
