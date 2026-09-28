import type { Product } from '../../../models/product.model';

export type CheckoutListStatus = 'active' | 'pending' | 'archived';

export interface CheckoutListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CheckoutListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CheckoutListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CHECKOUT_LIST_ITEM_COUNT = 8;

export const CHECKOUT_LIST_STATUSES: ReadonlyArray<CheckoutListStatus> = [
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

export function buildCheckoutListProduct(index: number): Product {
  return {
    id: `checkout-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Checkout List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Checkout',
    imageUrl: `https://picsum.photos/seed/checkout-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCheckoutListItem(index: number): CheckoutListItem {
  const product = buildCheckoutListProduct(index);
  const status = CHECKOUT_LIST_STATUSES[index % CHECKOUT_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `checkout-list-${index + 1}`,
    name: `Checkout List ${NAMES[index % NAMES.length]}`,
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

export function buildCheckoutListItems(
  count: number = CHECKOUT_LIST_ITEM_COUNT,
): CheckoutListItem[] {
  const items: CheckoutListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCheckoutListItem(i));
  }
  return items;
}

export function emptyCheckoutListTotals(): CheckoutListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
