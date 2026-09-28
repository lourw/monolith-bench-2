import type { Product } from '../../../models/product.model';

export type CartDashboardStatus = 'active' | 'pending' | 'archived';

export interface CartDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CartDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CartDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CART_DASHBOARD_ITEM_COUNT = 6;

export const CART_DASHBOARD_STATUSES: ReadonlyArray<CartDashboardStatus> = [
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

export function buildCartDashboardProduct(index: number): Product {
  return {
    id: `cart-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Cart Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Cart',
    imageUrl: `https://picsum.photos/seed/cart-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCartDashboardItem(index: number): CartDashboardItem {
  const product = buildCartDashboardProduct(index);
  const status =
    CART_DASHBOARD_STATUSES[index % CART_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `cart-dashboard-${index + 1}`,
    name: `Cart Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildCartDashboardItems(
  count: number = CART_DASHBOARD_ITEM_COUNT,
): CartDashboardItem[] {
  const items: CartDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCartDashboardItem(i));
  }
  return items;
}

export function emptyCartDashboardTotals(): CartDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
