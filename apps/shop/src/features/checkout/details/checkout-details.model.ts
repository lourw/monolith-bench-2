import type { Product } from '../../../models/product.model';

export type CheckoutDetailsStatus = 'active' | 'pending' | 'archived';

export interface CheckoutDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CheckoutDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CheckoutDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CHECKOUT_DETAILS_ITEM_COUNT = 8;

export const CHECKOUT_DETAILS_STATUSES: ReadonlyArray<CheckoutDetailsStatus> = [
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

export function buildCheckoutDetailsProduct(index: number): Product {
  return {
    id: `checkout-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Checkout Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Checkout',
    imageUrl: `https://picsum.photos/seed/checkout-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCheckoutDetailsItem(index: number): CheckoutDetailsItem {
  const product = buildCheckoutDetailsProduct(index);
  const status =
    CHECKOUT_DETAILS_STATUSES[index % CHECKOUT_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `checkout-details-${index + 1}`,
    name: `Checkout Details ${NAMES[index % NAMES.length]}`,
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

export function buildCheckoutDetailsItems(
  count: number = CHECKOUT_DETAILS_ITEM_COUNT,
): CheckoutDetailsItem[] {
  const items: CheckoutDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCheckoutDetailsItem(i));
  }
  return items;
}

export function emptyCheckoutDetailsTotals(): CheckoutDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
