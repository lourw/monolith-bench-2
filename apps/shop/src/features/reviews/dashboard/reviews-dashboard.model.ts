import type { Product } from '../../../models/product.model';

export type ReviewsDashboardStatus = 'active' | 'pending' | 'archived';

export interface ReviewsDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReviewsDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReviewsDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const REVIEWS_DASHBOARD_ITEM_COUNT = 9;

export const REVIEWS_DASHBOARD_STATUSES: ReadonlyArray<ReviewsDashboardStatus> =
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

export function buildReviewsDashboardProduct(index: number): Product {
  return {
    id: `reviews-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Reviews Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Reviews',
    imageUrl: `https://picsum.photos/seed/reviews-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReviewsDashboardItem(index: number): ReviewsDashboardItem {
  const product = buildReviewsDashboardProduct(index);
  const status =
    REVIEWS_DASHBOARD_STATUSES[index % REVIEWS_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `reviews-dashboard-${index + 1}`,
    name: `Reviews Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildReviewsDashboardItems(
  count: number = REVIEWS_DASHBOARD_ITEM_COUNT,
): ReviewsDashboardItem[] {
  const items: ReviewsDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReviewsDashboardItem(i));
  }
  return items;
}

export function emptyReviewsDashboardTotals(): ReviewsDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
