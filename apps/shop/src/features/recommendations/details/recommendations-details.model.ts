import type { Product } from '../../../models/product.model';

export type RecommendationsDetailsStatus = 'active' | 'pending' | 'archived';

export interface RecommendationsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: RecommendationsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface RecommendationsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RECOMMENDATIONS_DETAILS_ITEM_COUNT = 7;

export const RECOMMENDATIONS_DETAILS_STATUSES: ReadonlyArray<RecommendationsDetailsStatus> =
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

export function buildRecommendationsDetailsProduct(index: number): Product {
  return {
    id: `recommendations-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Recommendations Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Recommendations',
    imageUrl: `https://picsum.photos/seed/recommendations-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildRecommendationsDetailsItem(
  index: number,
): RecommendationsDetailsItem {
  const product = buildRecommendationsDetailsProduct(index);
  const status =
    RECOMMENDATIONS_DETAILS_STATUSES[
      index % RECOMMENDATIONS_DETAILS_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `recommendations-details-${index + 1}`,
    name: `Recommendations Details ${NAMES[index % NAMES.length]}`,
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

export function buildRecommendationsDetailsItems(
  count: number = RECOMMENDATIONS_DETAILS_ITEM_COUNT,
): RecommendationsDetailsItem[] {
  const items: RecommendationsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildRecommendationsDetailsItem(i));
  }
  return items;
}

export function emptyRecommendationsDetailsTotals(): RecommendationsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
