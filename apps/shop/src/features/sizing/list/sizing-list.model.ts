import type { Product } from '../../../models/product.model';

export type SizingListStatus = 'active' | 'pending' | 'archived';

export interface SizingListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_LIST_ITEM_COUNT = 10;

export const SIZING_LIST_STATUSES: ReadonlyArray<SizingListStatus> = [
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

export function buildSizingListProduct(index: number): Product {
  return {
    id: `sizing-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingListItem(index: number): SizingListItem {
  const product = buildSizingListProduct(index);
  const status = SIZING_LIST_STATUSES[index % SIZING_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-list-${index + 1}`,
    name: `Sizing List ${NAMES[index % NAMES.length]}`,
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

export function buildSizingListItems(
  count: number = SIZING_LIST_ITEM_COUNT,
): SizingListItem[] {
  const items: SizingListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingListItem(i));
  }
  return items;
}

export function emptySizingListTotals(): SizingListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
