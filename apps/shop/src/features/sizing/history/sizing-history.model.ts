import type { Product } from '../../../models/product.model';

export type SizingHistoryStatus = 'active' | 'pending' | 'archived';

export interface SizingHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_HISTORY_ITEM_COUNT = 11;

export const SIZING_HISTORY_STATUSES: ReadonlyArray<SizingHistoryStatus> = [
  'active',
  'pending',
  'archived',
];

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

export function buildSizingHistoryProduct(index: number): Product {
  return {
    id: `sizing-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingHistoryItem(index: number): SizingHistoryItem {
  const product = buildSizingHistoryProduct(index);
  const status =
    SIZING_HISTORY_STATUSES[index % SIZING_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-history-${index + 1}`,
    name: `Sizing History ${NAMES[index % NAMES.length]}`,
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

export function buildSizingHistoryItems(
  count: number = SIZING_HISTORY_ITEM_COUNT,
): SizingHistoryItem[] {
  const items: SizingHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingHistoryItem(i));
  }
  return items;
}

export function emptySizingHistoryTotals(): SizingHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
