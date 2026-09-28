import type { Product } from '../../../models/product.model';

export type PromotionsInsightsStatus = 'active' | 'pending' | 'archived';

export interface PromotionsInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PromotionsInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PromotionsInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROMOTIONS_INSIGHTS_ITEM_COUNT = 6;

export const PROMOTIONS_INSIGHTS_STATUSES: ReadonlyArray<PromotionsInsightsStatus> =
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

export function buildPromotionsInsightsProduct(index: number): Product {
  return {
    id: `promotions-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Promotions Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Promotions',
    imageUrl: `https://picsum.photos/seed/promotions-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPromotionsInsightsItem(
  index: number,
): PromotionsInsightsItem {
  const product = buildPromotionsInsightsProduct(index);
  const status =
    PROMOTIONS_INSIGHTS_STATUSES[index % PROMOTIONS_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `promotions-insights-${index + 1}`,
    name: `Promotions Insights ${NAMES[index % NAMES.length]}`,
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

export function buildPromotionsInsightsItems(
  count: number = PROMOTIONS_INSIGHTS_ITEM_COUNT,
): PromotionsInsightsItem[] {
  const items: PromotionsInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPromotionsInsightsItem(i));
  }
  return items;
}

export function emptyPromotionsInsightsTotals(): PromotionsInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
