import type { Product } from '../../../models/product.model';

export type InventoryOverviewStatus = 'active' | 'pending' | 'archived';

export interface InventoryOverviewItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: InventoryOverviewStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface InventoryOverviewTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const INVENTORY_OVERVIEW_ITEM_COUNT = 6;

export const INVENTORY_OVERVIEW_STATUSES: ReadonlyArray<InventoryOverviewStatus> =
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

export function buildInventoryOverviewProduct(index: number): Product {
  return {
    id: `inventory-overview-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Inventory Overview product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Inventory',
    imageUrl: `https://picsum.photos/seed/inventory-overview-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildInventoryOverviewItem(
  index: number,
): InventoryOverviewItem {
  const product = buildInventoryOverviewProduct(index);
  const status =
    INVENTORY_OVERVIEW_STATUSES[index % INVENTORY_OVERVIEW_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `inventory-overview-${index + 1}`,
    name: `Inventory Overview ${NAMES[index % NAMES.length]}`,
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

export function buildInventoryOverviewItems(
  count: number = INVENTORY_OVERVIEW_ITEM_COUNT,
): InventoryOverviewItem[] {
  const items: InventoryOverviewItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildInventoryOverviewItem(i));
  }
  return items;
}

export function emptyInventoryOverviewTotals(): InventoryOverviewTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
