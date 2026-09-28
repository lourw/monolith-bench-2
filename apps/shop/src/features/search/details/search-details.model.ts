import type { Product } from '../../../models/product.model';

export type SearchDetailsStatus = 'active' | 'pending' | 'archived';

export interface SearchDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SearchDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SearchDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SEARCH_DETAILS_ITEM_COUNT = 7;

export const SEARCH_DETAILS_STATUSES: ReadonlyArray<SearchDetailsStatus> = [
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

export function buildSearchDetailsProduct(index: number): Product {
  return {
    id: `search-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Search Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Search',
    imageUrl: `https://picsum.photos/seed/search-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSearchDetailsItem(index: number): SearchDetailsItem {
  const product = buildSearchDetailsProduct(index);
  const status =
    SEARCH_DETAILS_STATUSES[index % SEARCH_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `search-details-${index + 1}`,
    name: `Search Details ${NAMES[index % NAMES.length]}`,
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

export function buildSearchDetailsItems(
  count: number = SEARCH_DETAILS_ITEM_COUNT,
): SearchDetailsItem[] {
  const items: SearchDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSearchDetailsItem(i));
  }
  return items;
}

export function emptySearchDetailsTotals(): SearchDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
