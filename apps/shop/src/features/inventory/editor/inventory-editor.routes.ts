export const INVENTORY_EDITOR_ROUTE = '/features/inventory-editor';

export const INVENTORY_EDITOR_TEST_ID = 'feature-inventory-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const INVENTORY_EDITOR_FEATURE: FeatureMeta = {
  id: 'inventory-editor',
  title: 'Inventory Editor',
  route: INVENTORY_EDITOR_ROUTE,
  testId: INVENTORY_EDITOR_TEST_ID,
  domain: 'inventory',
  kind: 'editor',
  itemCount: 9,
};

export function inventoryEditorItemPath(itemId: string): string {
  return `${INVENTORY_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
