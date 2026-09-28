import type { Product } from '../../../models/product.model';

export type BundlesHistoryStatus = 'active' | 'pending' | 'archived';

export interface BundlesHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: BundlesHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface BundlesHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const BUNDLES_HISTORY_ITEM_COUNT = 12;

export const BUNDLES_HISTORY_STATUSES: ReadonlyArray<BundlesHistoryStatus> = [
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

export function buildBundlesHistoryProduct(index: number): Product {
  return {
    id: `bundles-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Bundles History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Bundles',
    imageUrl: `https://picsum.photos/seed/bundles-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildBundlesHistoryItem(index: number): BundlesHistoryItem {
  const product = buildBundlesHistoryProduct(index);
  const status =
    BUNDLES_HISTORY_STATUSES[index % BUNDLES_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `bundles-history-${index + 1}`,
    name: `Bundles History ${NAMES[index % NAMES.length]}`,
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

export function buildBundlesHistoryItems(
  count: number = BUNDLES_HISTORY_ITEM_COUNT,
): BundlesHistoryItem[] {
  const items: BundlesHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildBundlesHistoryItem(i));
  }
  return items;
}

export function emptyBundlesHistoryTotals(): BundlesHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
