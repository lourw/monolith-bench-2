import type { Product } from '../../../models/product.model';

export type AuthHistoryStatus = 'active' | 'pending' | 'archived';

export interface AuthHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AuthHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AuthHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const AUTH_HISTORY_ITEM_COUNT = 5;

export const AUTH_HISTORY_STATUSES: ReadonlyArray<AuthHistoryStatus> = [
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

export function buildAuthHistoryProduct(index: number): Product {
  return {
    id: `auth-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Auth History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Auth',
    imageUrl: `https://picsum.photos/seed/auth-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAuthHistoryItem(index: number): AuthHistoryItem {
  const product = buildAuthHistoryProduct(index);
  const status = AUTH_HISTORY_STATUSES[index % AUTH_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `auth-history-${index + 1}`,
    name: `Auth History ${NAMES[index % NAMES.length]}`,
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

export function buildAuthHistoryItems(
  count: number = AUTH_HISTORY_ITEM_COUNT,
): AuthHistoryItem[] {
  const items: AuthHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAuthHistoryItem(i));
  }
  return items;
}

export function emptyAuthHistoryTotals(): AuthHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
