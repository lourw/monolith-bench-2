import type { Product } from '../../../models/product.model';

export type CompareDashboardStatus = 'active' | 'pending' | 'archived';

export interface CompareDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CompareDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CompareDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const COMPARE_DASHBOARD_ITEM_COUNT = 11;

export const COMPARE_DASHBOARD_STATUSES: ReadonlyArray<CompareDashboardStatus> =
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

export function buildCompareDashboardProduct(index: number): Product {
  return {
    id: `compare-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Compare Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Compare',
    imageUrl: `https://picsum.photos/seed/compare-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCompareDashboardItem(index: number): CompareDashboardItem {
  const product = buildCompareDashboardProduct(index);
  const status =
    COMPARE_DASHBOARD_STATUSES[index % COMPARE_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `compare-dashboard-${index + 1}`,
    name: `Compare Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildCompareDashboardItems(
  count: number = COMPARE_DASHBOARD_ITEM_COUNT,
): CompareDashboardItem[] {
  const items: CompareDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCompareDashboardItem(i));
  }
  return items;
}

export function emptyCompareDashboardTotals(): CompareDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
