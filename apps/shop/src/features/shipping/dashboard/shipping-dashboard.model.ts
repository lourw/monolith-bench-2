import type { Product } from '../../../models/product.model';

export type ShippingDashboardStatus = 'active' | 'pending' | 'archived';

export interface ShippingDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ShippingDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ShippingDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SHIPPING_DASHBOARD_ITEM_COUNT = 12;

export const SHIPPING_DASHBOARD_STATUSES: ReadonlyArray<ShippingDashboardStatus> =
  ['active', 'pending', 'archived'];

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

export function buildShippingDashboardProduct(index: number): Product {
  return {
    id: `shipping-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Shipping Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Shipping',
    imageUrl: `https://picsum.photos/seed/shipping-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildShippingDashboardItem(
  index: number,
): ShippingDashboardItem {
  const product = buildShippingDashboardProduct(index);
  const status =
    SHIPPING_DASHBOARD_STATUSES[index % SHIPPING_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `shipping-dashboard-${index + 1}`,
    name: `Shipping Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildShippingDashboardItems(
  count: number = SHIPPING_DASHBOARD_ITEM_COUNT,
): ShippingDashboardItem[] {
  const items: ShippingDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildShippingDashboardItem(i));
  }
  return items;
}

export function emptyShippingDashboardTotals(): ShippingDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
