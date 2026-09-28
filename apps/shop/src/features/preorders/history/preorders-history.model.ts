import type { Product } from '../../../models/product.model';

export type PreordersHistoryStatus = 'active' | 'pending' | 'archived';

export interface PreordersHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PreordersHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PreordersHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PREORDERS_HISTORY_ITEM_COUNT = 6;

export const PREORDERS_HISTORY_STATUSES: ReadonlyArray<PreordersHistoryStatus> =
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

export function buildPreordersHistoryProduct(index: number): Product {
  return {
    id: `preorders-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Preorders History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Preorders',
    imageUrl: `https://picsum.photos/seed/preorders-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPreordersHistoryItem(index: number): PreordersHistoryItem {
  const product = buildPreordersHistoryProduct(index);
  const status =
    PREORDERS_HISTORY_STATUSES[index % PREORDERS_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `preorders-history-${index + 1}`,
    name: `Preorders History ${NAMES[index % NAMES.length]}`,
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

export function buildPreordersHistoryItems(
  count: number = PREORDERS_HISTORY_ITEM_COUNT,
): PreordersHistoryItem[] {
  const items: PreordersHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPreordersHistoryItem(i));
  }
  return items;
}

export function emptyPreordersHistoryTotals(): PreordersHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
