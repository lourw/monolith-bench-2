import type { Product } from '../../../models/product.model';

export type ReturnsDashboardStatus = 'active' | 'pending' | 'archived';

export interface ReturnsDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_DASHBOARD_ITEM_COUNT = 10;

export const RETURNS_DASHBOARD_STATUSES: ReadonlyArray<ReturnsDashboardStatus> =
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

export function buildReturnsDashboardProduct(index: number): Product {
  return {
    id: `returns-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsDashboardItem(index: number): ReturnsDashboardItem {
  const product = buildReturnsDashboardProduct(index);
  const status =
    RETURNS_DASHBOARD_STATUSES[index % RETURNS_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-dashboard-${index + 1}`,
    name: `Returns Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsDashboardItems(
  count: number = RETURNS_DASHBOARD_ITEM_COUNT,
): ReturnsDashboardItem[] {
  const items: ReturnsDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsDashboardItem(i));
  }
  return items;
}

export function emptyReturnsDashboardTotals(): ReturnsDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
