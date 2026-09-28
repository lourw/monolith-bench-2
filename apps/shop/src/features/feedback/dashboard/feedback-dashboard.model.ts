import type { Product } from '../../../models/product.model';

export type FeedbackDashboardStatus = 'active' | 'pending' | 'archived';

export interface FeedbackDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: FeedbackDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface FeedbackDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const FEEDBACK_DASHBOARD_ITEM_COUNT = 10;

export const FEEDBACK_DASHBOARD_STATUSES: ReadonlyArray<FeedbackDashboardStatus> =
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

export function buildFeedbackDashboardProduct(index: number): Product {
  return {
    id: `feedback-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Feedback Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Feedback',
    imageUrl: `https://picsum.photos/seed/feedback-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildFeedbackDashboardItem(
  index: number,
): FeedbackDashboardItem {
  const product = buildFeedbackDashboardProduct(index);
  const status =
    FEEDBACK_DASHBOARD_STATUSES[index % FEEDBACK_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `feedback-dashboard-${index + 1}`,
    name: `Feedback Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildFeedbackDashboardItems(
  count: number = FEEDBACK_DASHBOARD_ITEM_COUNT,
): FeedbackDashboardItem[] {
  const items: FeedbackDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildFeedbackDashboardItem(i));
  }
  return items;
}

export function emptyFeedbackDashboardTotals(): FeedbackDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
