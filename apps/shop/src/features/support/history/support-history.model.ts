import type { Product } from '../../../models/product.model';

export type SupportHistoryStatus = 'active' | 'pending' | 'archived';

export interface SupportHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SupportHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SupportHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SUPPORT_HISTORY_ITEM_COUNT = 7;

export const SUPPORT_HISTORY_STATUSES: ReadonlyArray<SupportHistoryStatus> = [
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

export function buildSupportHistoryProduct(index: number): Product {
  return {
    id: `support-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Support History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Support',
    imageUrl: `https://picsum.photos/seed/support-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSupportHistoryItem(index: number): SupportHistoryItem {
  const product = buildSupportHistoryProduct(index);
  const status =
    SUPPORT_HISTORY_STATUSES[index % SUPPORT_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `support-history-${index + 1}`,
    name: `Support History ${NAMES[index % NAMES.length]}`,
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

export function buildSupportHistoryItems(
  count: number = SUPPORT_HISTORY_ITEM_COUNT,
): SupportHistoryItem[] {
  const items: SupportHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSupportHistoryItem(i));
  }
  return items;
}

export function emptySupportHistoryTotals(): SupportHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
