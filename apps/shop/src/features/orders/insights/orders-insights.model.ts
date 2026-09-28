import type { Product } from '../../../models/product.model';

export type OrdersInsightsStatus = 'active' | 'pending' | 'archived';

export interface OrdersInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: OrdersInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface OrdersInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ORDERS_INSIGHTS_ITEM_COUNT = 8;

export const ORDERS_INSIGHTS_STATUSES: ReadonlyArray<OrdersInsightsStatus> = [
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

export function buildOrdersInsightsProduct(index: number): Product {
  return {
    id: `orders-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Orders Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Orders',
    imageUrl: `https://picsum.photos/seed/orders-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildOrdersInsightsItem(index: number): OrdersInsightsItem {
  const product = buildOrdersInsightsProduct(index);
  const status =
    ORDERS_INSIGHTS_STATUSES[index % ORDERS_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `orders-insights-${index + 1}`,
    name: `Orders Insights ${NAMES[index % NAMES.length]}`,
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

export function buildOrdersInsightsItems(
  count: number = ORDERS_INSIGHTS_ITEM_COUNT,
): OrdersInsightsItem[] {
  const items: OrdersInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildOrdersInsightsItem(i));
  }
  return items;
}

export function emptyOrdersInsightsTotals(): OrdersInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
