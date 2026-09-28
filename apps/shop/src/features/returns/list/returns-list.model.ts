import type { Product } from '../../../models/product.model';

export type ReturnsListStatus = 'active' | 'pending' | 'archived';

export interface ReturnsListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_LIST_ITEM_COUNT = 11;

export const RETURNS_LIST_STATUSES: ReadonlyArray<ReturnsListStatus> = [
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

export function buildReturnsListProduct(index: number): Product {
  return {
    id: `returns-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsListItem(index: number): ReturnsListItem {
  const product = buildReturnsListProduct(index);
  const status = RETURNS_LIST_STATUSES[index % RETURNS_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-list-${index + 1}`,
    name: `Returns List ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsListItems(
  count: number = RETURNS_LIST_ITEM_COUNT,
): ReturnsListItem[] {
  const items: ReturnsListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsListItem(i));
  }
  return items;
}

export function emptyReturnsListTotals(): ReturnsListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
