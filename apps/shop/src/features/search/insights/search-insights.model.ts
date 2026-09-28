import type { Product } from '../../../models/product.model';

export type SearchInsightsStatus = 'active' | 'pending' | 'archived';

export interface SearchInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SearchInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SearchInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SEARCH_INSIGHTS_ITEM_COUNT = 11;

export const SEARCH_INSIGHTS_STATUSES: ReadonlyArray<SearchInsightsStatus> = [
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

export function buildSearchInsightsProduct(index: number): Product {
  return {
    id: `search-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Search Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Search',
    imageUrl: `https://picsum.photos/seed/search-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSearchInsightsItem(index: number): SearchInsightsItem {
  const product = buildSearchInsightsProduct(index);
  const status =
    SEARCH_INSIGHTS_STATUSES[index % SEARCH_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `search-insights-${index + 1}`,
    name: `Search Insights ${NAMES[index % NAMES.length]}`,
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

export function buildSearchInsightsItems(
  count: number = SEARCH_INSIGHTS_ITEM_COUNT,
): SearchInsightsItem[] {
  const items: SearchInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSearchInsightsItem(i));
  }
  return items;
}

export function emptySearchInsightsTotals(): SearchInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
