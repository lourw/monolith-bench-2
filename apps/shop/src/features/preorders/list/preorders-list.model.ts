import type { Product } from '../../../models/product.model';

export type PreordersListStatus = 'active' | 'pending' | 'archived';

export interface PreordersListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PreordersListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PreordersListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PREORDERS_LIST_ITEM_COUNT = 7;

export const PREORDERS_LIST_STATUSES: ReadonlyArray<PreordersListStatus> = [
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

export function buildPreordersListProduct(index: number): Product {
  return {
    id: `preorders-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Preorders List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Preorders',
    imageUrl: `https://picsum.photos/seed/preorders-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPreordersListItem(index: number): PreordersListItem {
  const product = buildPreordersListProduct(index);
  const status =
    PREORDERS_LIST_STATUSES[index % PREORDERS_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `preorders-list-${index + 1}`,
    name: `Preorders List ${NAMES[index % NAMES.length]}`,
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

export function buildPreordersListItems(
  count: number = PREORDERS_LIST_ITEM_COUNT,
): PreordersListItem[] {
  const items: PreordersListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPreordersListItem(i));
  }
  return items;
}

export function emptyPreordersListTotals(): PreordersListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
