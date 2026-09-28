import type { Product } from '../../../models/product.model';

export type InventoryHistoryStatus = 'active' | 'pending' | 'archived';

export interface InventoryHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: InventoryHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface InventoryHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const INVENTORY_HISTORY_ITEM_COUNT = 9;

export const INVENTORY_HISTORY_STATUSES: ReadonlyArray<InventoryHistoryStatus> =
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

export function buildInventoryHistoryProduct(index: number): Product {
  return {
    id: `inventory-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Inventory History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Inventory',
    imageUrl: `https://picsum.photos/seed/inventory-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildInventoryHistoryItem(index: number): InventoryHistoryItem {
  const product = buildInventoryHistoryProduct(index);
  const status =
    INVENTORY_HISTORY_STATUSES[index % INVENTORY_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `inventory-history-${index + 1}`,
    name: `Inventory History ${NAMES[index % NAMES.length]}`,
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

export function buildInventoryHistoryItems(
  count: number = INVENTORY_HISTORY_ITEM_COUNT,
): InventoryHistoryItem[] {
  const items: InventoryHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildInventoryHistoryItem(i));
  }
  return items;
}

export function emptyInventoryHistoryTotals(): InventoryHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
