import type { Product } from '../../../models/product.model';

export type ShippingInsightsStatus = 'active' | 'pending' | 'archived';

export interface ShippingInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ShippingInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ShippingInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SHIPPING_INSIGHTS_ITEM_COUNT = 6;

export const SHIPPING_INSIGHTS_STATUSES: ReadonlyArray<ShippingInsightsStatus> =
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

export function buildShippingInsightsProduct(index: number): Product {
  return {
    id: `shipping-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Shipping Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Shipping',
    imageUrl: `https://picsum.photos/seed/shipping-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildShippingInsightsItem(index: number): ShippingInsightsItem {
  const product = buildShippingInsightsProduct(index);
  const status =
    SHIPPING_INSIGHTS_STATUSES[index % SHIPPING_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `shipping-insights-${index + 1}`,
    name: `Shipping Insights ${NAMES[index % NAMES.length]}`,
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

export function buildShippingInsightsItems(
  count: number = SHIPPING_INSIGHTS_ITEM_COUNT,
): ShippingInsightsItem[] {
  const items: ShippingInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildShippingInsightsItem(i));
  }
  return items;
}

export function emptyShippingInsightsTotals(): ShippingInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
