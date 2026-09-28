import type { Product } from '../../../models/product.model';

export type ShippingListStatus = 'active' | 'pending' | 'archived';

export interface ShippingListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ShippingListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ShippingListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SHIPPING_LIST_ITEM_COUNT = 11;

export const SHIPPING_LIST_STATUSES: ReadonlyArray<ShippingListStatus> = [
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

export function buildShippingListProduct(index: number): Product {
  return {
    id: `shipping-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Shipping List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Shipping',
    imageUrl: `https://picsum.photos/seed/shipping-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildShippingListItem(index: number): ShippingListItem {
  const product = buildShippingListProduct(index);
  const status = SHIPPING_LIST_STATUSES[index % SHIPPING_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `shipping-list-${index + 1}`,
    name: `Shipping List ${NAMES[index % NAMES.length]}`,
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

export function buildShippingListItems(
  count: number = SHIPPING_LIST_ITEM_COUNT,
): ShippingListItem[] {
  const items: ShippingListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildShippingListItem(i));
  }
  return items;
}

export function emptyShippingListTotals(): ShippingListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
