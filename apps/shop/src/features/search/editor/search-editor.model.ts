import type { Product } from '../../../models/product.model';

export type SearchEditorStatus = 'active' | 'pending' | 'archived';

export interface SearchEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SearchEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SearchEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SEARCH_EDITOR_ITEM_COUNT = 10;

export const SEARCH_EDITOR_STATUSES: ReadonlyArray<SearchEditorStatus> = [
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

export function buildSearchEditorProduct(index: number): Product {
  return {
    id: `search-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Search Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Search',
    imageUrl: `https://picsum.photos/seed/search-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSearchEditorItem(index: number): SearchEditorItem {
  const product = buildSearchEditorProduct(index);
  const status = SEARCH_EDITOR_STATUSES[index % SEARCH_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `search-editor-${index + 1}`,
    name: `Search Editor ${NAMES[index % NAMES.length]}`,
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

export function buildSearchEditorItems(
  count: number = SEARCH_EDITOR_ITEM_COUNT,
): SearchEditorItem[] {
  const items: SearchEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSearchEditorItem(i));
  }
  return items;
}

export function emptySearchEditorTotals(): SearchEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
