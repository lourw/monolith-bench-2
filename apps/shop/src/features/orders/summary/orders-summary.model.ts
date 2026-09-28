import type { Product } from '../../../models/product.model';

export type OrdersSummaryStatus = 'active' | 'pending' | 'archived';

export interface OrdersSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: OrdersSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface OrdersSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ORDERS_SUMMARY_ITEM_COUNT = 11;

export const ORDERS_SUMMARY_STATUSES: ReadonlyArray<OrdersSummaryStatus> = [
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

export function buildOrdersSummaryProduct(index: number): Product {
  return {
    id: `orders-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Orders Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Orders',
    imageUrl: `https://picsum.photos/seed/orders-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildOrdersSummaryItem(index: number): OrdersSummaryItem {
  const product = buildOrdersSummaryProduct(index);
  const status =
    ORDERS_SUMMARY_STATUSES[index % ORDERS_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `orders-summary-${index + 1}`,
    name: `Orders Summary ${NAMES[index % NAMES.length]}`,
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

export function buildOrdersSummaryItems(
  count: number = ORDERS_SUMMARY_ITEM_COUNT,
): OrdersSummaryItem[] {
  const items: OrdersSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildOrdersSummaryItem(i));
  }
  return items;
}

export function emptyOrdersSummaryTotals(): OrdersSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
