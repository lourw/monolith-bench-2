import type { Product } from '../../../models/product.model';

export type FeedbackInsightsStatus = 'active' | 'pending' | 'archived';

export interface FeedbackInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: FeedbackInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface FeedbackInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const FEEDBACK_INSIGHTS_ITEM_COUNT = 9;

export const FEEDBACK_INSIGHTS_STATUSES: ReadonlyArray<FeedbackInsightsStatus> =
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

export function buildFeedbackInsightsProduct(index: number): Product {
  return {
    id: `feedback-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Feedback Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Feedback',
    imageUrl: `https://picsum.photos/seed/feedback-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildFeedbackInsightsItem(index: number): FeedbackInsightsItem {
  const product = buildFeedbackInsightsProduct(index);
  const status =
    FEEDBACK_INSIGHTS_STATUSES[index % FEEDBACK_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `feedback-insights-${index + 1}`,
    name: `Feedback Insights ${NAMES[index % NAMES.length]}`,
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

export function buildFeedbackInsightsItems(
  count: number = FEEDBACK_INSIGHTS_ITEM_COUNT,
): FeedbackInsightsItem[] {
  const items: FeedbackInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildFeedbackInsightsItem(i));
  }
  return items;
}

export function emptyFeedbackInsightsTotals(): FeedbackInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
