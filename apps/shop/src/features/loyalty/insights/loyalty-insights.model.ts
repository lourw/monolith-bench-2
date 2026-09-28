import type { Product } from '../../../models/product.model';

export type LoyaltyInsightsStatus = 'active' | 'pending' | 'archived';

export interface LoyaltyInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: LoyaltyInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface LoyaltyInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const LOYALTY_INSIGHTS_ITEM_COUNT = 10;

export const LOYALTY_INSIGHTS_STATUSES: ReadonlyArray<LoyaltyInsightsStatus> = [
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

export function buildLoyaltyInsightsProduct(index: number): Product {
  return {
    id: `loyalty-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Loyalty Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Loyalty',
    imageUrl: `https://picsum.photos/seed/loyalty-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildLoyaltyInsightsItem(index: number): LoyaltyInsightsItem {
  const product = buildLoyaltyInsightsProduct(index);
  const status =
    LOYALTY_INSIGHTS_STATUSES[index % LOYALTY_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `loyalty-insights-${index + 1}`,
    name: `Loyalty Insights ${NAMES[index % NAMES.length]}`,
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

export function buildLoyaltyInsightsItems(
  count: number = LOYALTY_INSIGHTS_ITEM_COUNT,
): LoyaltyInsightsItem[] {
  const items: LoyaltyInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildLoyaltyInsightsItem(i));
  }
  return items;
}

export function emptyLoyaltyInsightsTotals(): LoyaltyInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
