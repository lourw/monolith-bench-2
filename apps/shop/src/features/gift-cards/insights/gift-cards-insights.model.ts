import type { Product } from '../../../models/product.model';

export type GiftCardsInsightsStatus = 'active' | 'pending' | 'archived';

export interface GiftCardsInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: GiftCardsInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface GiftCardsInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const GIFT_CARDS_INSIGHTS_ITEM_COUNT = 9;

export const GIFT_CARDS_INSIGHTS_STATUSES: ReadonlyArray<GiftCardsInsightsStatus> =
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

export function buildGiftCardsInsightsProduct(index: number): Product {
  return {
    id: `gift-cards-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Gift Cards Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Gift Cards',
    imageUrl: `https://picsum.photos/seed/gift-cards-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildGiftCardsInsightsItem(
  index: number,
): GiftCardsInsightsItem {
  const product = buildGiftCardsInsightsProduct(index);
  const status =
    GIFT_CARDS_INSIGHTS_STATUSES[index % GIFT_CARDS_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `gift-cards-insights-${index + 1}`,
    name: `Gift Cards Insights ${NAMES[index % NAMES.length]}`,
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

export function buildGiftCardsInsightsItems(
  count: number = GIFT_CARDS_INSIGHTS_ITEM_COUNT,
): GiftCardsInsightsItem[] {
  const items: GiftCardsInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildGiftCardsInsightsItem(i));
  }
  return items;
}

export function emptyGiftCardsInsightsTotals(): GiftCardsInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
