import type { Product } from '../../../models/product.model';

export type PaymentsInsightsStatus = 'active' | 'pending' | 'archived';

export interface PaymentsInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PaymentsInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PaymentsInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PAYMENTS_INSIGHTS_ITEM_COUNT = 11;

export const PAYMENTS_INSIGHTS_STATUSES: ReadonlyArray<PaymentsInsightsStatus> =
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

export function buildPaymentsInsightsProduct(index: number): Product {
  return {
    id: `payments-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Payments Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Payments',
    imageUrl: `https://picsum.photos/seed/payments-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPaymentsInsightsItem(index: number): PaymentsInsightsItem {
  const product = buildPaymentsInsightsProduct(index);
  const status =
    PAYMENTS_INSIGHTS_STATUSES[index % PAYMENTS_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `payments-insights-${index + 1}`,
    name: `Payments Insights ${NAMES[index % NAMES.length]}`,
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

export function buildPaymentsInsightsItems(
  count: number = PAYMENTS_INSIGHTS_ITEM_COUNT,
): PaymentsInsightsItem[] {
  const items: PaymentsInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPaymentsInsightsItem(i));
  }
  return items;
}

export function emptyPaymentsInsightsTotals(): PaymentsInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
