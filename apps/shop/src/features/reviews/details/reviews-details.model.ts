import type { Product } from '../../../models/product.model';

export type ReviewsDetailsStatus = 'active' | 'pending' | 'archived';

export interface ReviewsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReviewsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReviewsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const REVIEWS_DETAILS_ITEM_COUNT = 12;

export const REVIEWS_DETAILS_STATUSES: ReadonlyArray<ReviewsDetailsStatus> = [
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

export function buildReviewsDetailsProduct(index: number): Product {
  return {
    id: `reviews-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Reviews Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Reviews',
    imageUrl: `https://picsum.photos/seed/reviews-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReviewsDetailsItem(index: number): ReviewsDetailsItem {
  const product = buildReviewsDetailsProduct(index);
  const status =
    REVIEWS_DETAILS_STATUSES[index % REVIEWS_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `reviews-details-${index + 1}`,
    name: `Reviews Details ${NAMES[index % NAMES.length]}`,
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

export function buildReviewsDetailsItems(
  count: number = REVIEWS_DETAILS_ITEM_COUNT,
): ReviewsDetailsItem[] {
  const items: ReviewsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReviewsDetailsItem(i));
  }
  return items;
}

export function emptyReviewsDetailsTotals(): ReviewsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
