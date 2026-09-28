import type { Product } from '../../../models/product.model';

export type InventoryDashboardStatus = 'active' | 'pending' | 'archived';

export interface InventoryDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: InventoryDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface InventoryDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const INVENTORY_DASHBOARD_ITEM_COUNT = 6;

export const INVENTORY_DASHBOARD_STATUSES: ReadonlyArray<InventoryDashboardStatus> =
  ['active', 'pending', 'archived'];

const NAMES = [
  'Aurora',
  'Basalt',
  'Cobalt',
  'Dune',
  'Ember',
  'Fjord',
  'Granite',
  'Harbor',
  'Iris',
  'Juniper',
  'Kestrel',
  'Lumen',
  'Meadow',
  'Nimbus',
  'Onyx',
  'Prism',
];

const TAGS = ['featured', 'seasonal', 'clearance', 'new', 'bundle', 'gift'];

function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

export function buildInventoryDashboardProduct(index: number): Product {
  return {
    id: `inventory-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Inventory Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Inventory',
    imageUrl: `https://picsum.photos/seed/inventory-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildInventoryDashboardItem(
  index: number,
): InventoryDashboardItem {
  const product = buildInventoryDashboardProduct(index);
  const status =
    INVENTORY_DASHBOARD_STATUSES[index % INVENTORY_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `inventory-dashboard-${index + 1}`,
    name: `Inventory Dashboard ${NAMES[index % NAMES.length]}`,
    amount: Math.round(product.price * (1 + (index % 4))),
    quantity: 1 + (index % 5),
    status,
    tags,
    product,
    createdAt: new Date(
      Date.UTC(2026, index % 12, 1 + (index % 27)),
    ).toISOString(),
  };
}

export function buildInventoryDashboardItems(
  count: number = INVENTORY_DASHBOARD_ITEM_COUNT,
): InventoryDashboardItem[] {
  const items: InventoryDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildInventoryDashboardItem(i));
  }
  return items;
}

export function emptyInventoryDashboardTotals(): InventoryDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
