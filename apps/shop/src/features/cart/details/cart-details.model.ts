import type { Product } from '../../../models/product.model';

export type CartDetailsStatus = 'active' | 'pending' | 'archived';

export interface CartDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CartDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CartDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CART_DETAILS_ITEM_COUNT = 9;

export const CART_DETAILS_STATUSES: ReadonlyArray<CartDetailsStatus> = [
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

export function buildCartDetailsProduct(index: number): Product {
  return {
    id: `cart-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Cart Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Cart',
    imageUrl: `https://picsum.photos/seed/cart-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCartDetailsItem(index: number): CartDetailsItem {
  const product = buildCartDetailsProduct(index);
  const status = CART_DETAILS_STATUSES[index % CART_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `cart-details-${index + 1}`,
    name: `Cart Details ${NAMES[index % NAMES.length]}`,
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

export function buildCartDetailsItems(
  count: number = CART_DETAILS_ITEM_COUNT,
): CartDetailsItem[] {
  const items: CartDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCartDetailsItem(i));
  }
  return items;
}

export function emptyCartDetailsTotals(): CartDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
