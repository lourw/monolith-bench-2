import type { Product } from '../../../models/product.model';

export type CartSummaryStatus = 'active' | 'pending' | 'archived';

export interface CartSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CartSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CartSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CART_SUMMARY_ITEM_COUNT = 5;

export const CART_SUMMARY_STATUSES: ReadonlyArray<CartSummaryStatus> = [
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

export function buildCartSummaryProduct(index: number): Product {
  return {
    id: `cart-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Cart Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Cart',
    imageUrl: `https://picsum.photos/seed/cart-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCartSummaryItem(index: number): CartSummaryItem {
  const product = buildCartSummaryProduct(index);
  const status = CART_SUMMARY_STATUSES[index % CART_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `cart-summary-${index + 1}`,
    name: `Cart Summary ${NAMES[index % NAMES.length]}`,
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

export function buildCartSummaryItems(
  count: number = CART_SUMMARY_ITEM_COUNT,
): CartSummaryItem[] {
  const items: CartSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCartSummaryItem(i));
  }
  return items;
}

export function emptyCartSummaryTotals(): CartSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
