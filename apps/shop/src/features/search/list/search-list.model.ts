import type { Product } from '../../../models/product.model';

export type SearchListStatus = 'active' | 'pending' | 'archived';

export interface SearchListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SearchListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SearchListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SEARCH_LIST_ITEM_COUNT = 9;

export const SEARCH_LIST_STATUSES: ReadonlyArray<SearchListStatus> = [
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

export function buildSearchListProduct(index: number): Product {
  return {
    id: `search-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Search List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Search',
    imageUrl: `https://picsum.photos/seed/search-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSearchListItem(index: number): SearchListItem {
  const product = buildSearchListProduct(index);
  const status = SEARCH_LIST_STATUSES[index % SEARCH_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `search-list-${index + 1}`,
    name: `Search List ${NAMES[index % NAMES.length]}`,
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

export function buildSearchListItems(
  count: number = SEARCH_LIST_ITEM_COUNT,
): SearchListItem[] {
  const items: SearchListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSearchListItem(i));
  }
  return items;
}

export function emptySearchListTotals(): SearchListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
