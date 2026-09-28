import type { Product } from '../../../models/product.model';

export type InventoryInsightsStatus = 'active' | 'pending' | 'archived';

export interface InventoryInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: InventoryInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface InventoryInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const INVENTORY_INSIGHTS_ITEM_COUNT = 9;

export const INVENTORY_INSIGHTS_STATUSES: ReadonlyArray<InventoryInsightsStatus> =
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

export function buildInventoryInsightsProduct(index: number): Product {
  return {
    id: `inventory-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Inventory Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Inventory',
    imageUrl: `https://picsum.photos/seed/inventory-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildInventoryInsightsItem(
  index: number,
): InventoryInsightsItem {
  const product = buildInventoryInsightsProduct(index);
  const status =
    INVENTORY_INSIGHTS_STATUSES[index % INVENTORY_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `inventory-insights-${index + 1}`,
    name: `Inventory Insights ${NAMES[index % NAMES.length]}`,
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

export function buildInventoryInsightsItems(
  count: number = INVENTORY_INSIGHTS_ITEM_COUNT,
): InventoryInsightsItem[] {
  const items: InventoryInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildInventoryInsightsItem(i));
  }
  return items;
}

export function emptyInventoryInsightsTotals(): InventoryInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
