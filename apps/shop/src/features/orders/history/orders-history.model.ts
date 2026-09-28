import type { Product } from '../../../models/product.model';

export type OrdersHistoryStatus = 'active' | 'pending' | 'archived';

export interface OrdersHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: OrdersHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface OrdersHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ORDERS_HISTORY_ITEM_COUNT = 5;

export const ORDERS_HISTORY_STATUSES: ReadonlyArray<OrdersHistoryStatus> = [
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

export function buildOrdersHistoryProduct(index: number): Product {
  return {
    id: `orders-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Orders History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Orders',
    imageUrl: `https://picsum.photos/seed/orders-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildOrdersHistoryItem(index: number): OrdersHistoryItem {
  const product = buildOrdersHistoryProduct(index);
  const status =
    ORDERS_HISTORY_STATUSES[index % ORDERS_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `orders-history-${index + 1}`,
    name: `Orders History ${NAMES[index % NAMES.length]}`,
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

export function buildOrdersHistoryItems(
  count: number = ORDERS_HISTORY_ITEM_COUNT,
): OrdersHistoryItem[] {
  const items: OrdersHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildOrdersHistoryItem(i));
  }
  return items;
}

export function emptyOrdersHistoryTotals(): OrdersHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
