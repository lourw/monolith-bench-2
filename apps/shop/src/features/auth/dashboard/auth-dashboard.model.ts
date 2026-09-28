import type { Product } from '../../../models/product.model';

export type AuthDashboardStatus = 'active' | 'pending' | 'archived';

export interface AuthDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AuthDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AuthDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const AUTH_DASHBOARD_ITEM_COUNT = 12;

export const AUTH_DASHBOARD_STATUSES: ReadonlyArray<AuthDashboardStatus> = [
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

export function buildAuthDashboardProduct(index: number): Product {
  return {
    id: `auth-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Auth Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Auth',
    imageUrl: `https://picsum.photos/seed/auth-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAuthDashboardItem(index: number): AuthDashboardItem {
  const product = buildAuthDashboardProduct(index);
  const status =
    AUTH_DASHBOARD_STATUSES[index % AUTH_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `auth-dashboard-${index + 1}`,
    name: `Auth Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildAuthDashboardItems(
  count: number = AUTH_DASHBOARD_ITEM_COUNT,
): AuthDashboardItem[] {
  const items: AuthDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAuthDashboardItem(i));
  }
  return items;
}

export function emptyAuthDashboardTotals(): AuthDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
