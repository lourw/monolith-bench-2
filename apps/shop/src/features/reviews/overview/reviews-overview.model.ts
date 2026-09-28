import type { Product } from '../../../models/product.model';

export type ReviewsOverviewStatus = 'active' | 'pending' | 'archived';

export interface ReviewsOverviewItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReviewsOverviewStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReviewsOverviewTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const REVIEWS_OVERVIEW_ITEM_COUNT = 10;

export const REVIEWS_OVERVIEW_STATUSES: ReadonlyArray<ReviewsOverviewStatus> = [
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

export function buildReviewsOverviewProduct(index: number): Product {
  return {
    id: `reviews-overview-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Reviews Overview product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Reviews',
    imageUrl: `https://picsum.photos/seed/reviews-overview-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReviewsOverviewItem(index: number): ReviewsOverviewItem {
  const product = buildReviewsOverviewProduct(index);
  const status =
    REVIEWS_OVERVIEW_STATUSES[index % REVIEWS_OVERVIEW_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `reviews-overview-${index + 1}`,
    name: `Reviews Overview ${NAMES[index % NAMES.length]}`,
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

export function buildReviewsOverviewItems(
  count: number = REVIEWS_OVERVIEW_ITEM_COUNT,
): ReviewsOverviewItem[] {
  const items: ReviewsOverviewItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReviewsOverviewItem(i));
  }
  return items;
}

export function emptyReviewsOverviewTotals(): ReviewsOverviewTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
