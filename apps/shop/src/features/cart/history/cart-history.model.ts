import type { Product } from '../../../models/product.model';

export type CartHistoryStatus = 'active' | 'pending' | 'archived';

export interface CartHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CartHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CartHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CART_HISTORY_ITEM_COUNT = 10;

export const CART_HISTORY_STATUSES: ReadonlyArray<CartHistoryStatus> = [
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

export function buildCartHistoryProduct(index: number): Product {
  return {
    id: `cart-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Cart History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Cart',
    imageUrl: `https://picsum.photos/seed/cart-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCartHistoryItem(index: number): CartHistoryItem {
  const product = buildCartHistoryProduct(index);
  const status = CART_HISTORY_STATUSES[index % CART_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `cart-history-${index + 1}`,
    name: `Cart History ${NAMES[index % NAMES.length]}`,
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

export function buildCartHistoryItems(
  count: number = CART_HISTORY_ITEM_COUNT,
): CartHistoryItem[] {
  const items: CartHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCartHistoryItem(i));
  }
  return items;
}

export function emptyCartHistoryTotals(): CartHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
