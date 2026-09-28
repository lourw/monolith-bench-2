import type { Product } from '../../../models/product.model';

export type CartInsightsStatus = 'active' | 'pending' | 'archived';

export interface CartInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CartInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CartInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CART_INSIGHTS_ITEM_COUNT = 8;

export const CART_INSIGHTS_STATUSES: ReadonlyArray<CartInsightsStatus> = [
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

export function buildCartInsightsProduct(index: number): Product {
  return {
    id: `cart-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Cart Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Cart',
    imageUrl: `https://picsum.photos/seed/cart-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCartInsightsItem(index: number): CartInsightsItem {
  const product = buildCartInsightsProduct(index);
  const status = CART_INSIGHTS_STATUSES[index % CART_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `cart-insights-${index + 1}`,
    name: `Cart Insights ${NAMES[index % NAMES.length]}`,
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

export function buildCartInsightsItems(
  count: number = CART_INSIGHTS_ITEM_COUNT,
): CartInsightsItem[] {
  const items: CartInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCartInsightsItem(i));
  }
  return items;
}

export function emptyCartInsightsTotals(): CartInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
