import type { Product } from '../../../models/product.model';

export type RecommendationsListStatus = 'active' | 'pending' | 'archived';

export interface RecommendationsListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: RecommendationsListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface RecommendationsListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RECOMMENDATIONS_LIST_ITEM_COUNT = 12;

export const RECOMMENDATIONS_LIST_STATUSES: ReadonlyArray<RecommendationsListStatus> =
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

export function buildRecommendationsListProduct(index: number): Product {
  return {
    id: `recommendations-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Recommendations List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Recommendations',
    imageUrl: `https://picsum.photos/seed/recommendations-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildRecommendationsListItem(
  index: number,
): RecommendationsListItem {
  const product = buildRecommendationsListProduct(index);
  const status =
    RECOMMENDATIONS_LIST_STATUSES[index % RECOMMENDATIONS_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `recommendations-list-${index + 1}`,
    name: `Recommendations List ${NAMES[index % NAMES.length]}`,
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

export function buildRecommendationsListItems(
  count: number = RECOMMENDATIONS_LIST_ITEM_COUNT,
): RecommendationsListItem[] {
  const items: RecommendationsListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildRecommendationsListItem(i));
  }
  return items;
}

export function emptyRecommendationsListTotals(): RecommendationsListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
