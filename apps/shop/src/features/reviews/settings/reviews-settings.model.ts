import type { Product } from '../../../models/product.model';

export type ReviewsSettingsStatus = 'active' | 'pending' | 'archived';

export interface ReviewsSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReviewsSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReviewsSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const REVIEWS_SETTINGS_ITEM_COUNT = 8;

export const REVIEWS_SETTINGS_STATUSES: ReadonlyArray<ReviewsSettingsStatus> = [
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

export function buildReviewsSettingsProduct(index: number): Product {
  return {
    id: `reviews-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Reviews Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Reviews',
    imageUrl: `https://picsum.photos/seed/reviews-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReviewsSettingsItem(index: number): ReviewsSettingsItem {
  const product = buildReviewsSettingsProduct(index);
  const status =
    REVIEWS_SETTINGS_STATUSES[index % REVIEWS_SETTINGS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `reviews-settings-${index + 1}`,
    name: `Reviews Settings ${NAMES[index % NAMES.length]}`,
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

export function buildReviewsSettingsItems(
  count: number = REVIEWS_SETTINGS_ITEM_COUNT,
): ReviewsSettingsItem[] {
  const items: ReviewsSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReviewsSettingsItem(i));
  }
  return items;
}

export function emptyReviewsSettingsTotals(): ReviewsSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
