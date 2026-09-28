import type { Product } from '../../../models/product.model';

export type BundlesDashboardStatus = 'active' | 'pending' | 'archived';

export interface BundlesDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: BundlesDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface BundlesDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const BUNDLES_DASHBOARD_ITEM_COUNT = 7;

export const BUNDLES_DASHBOARD_STATUSES: ReadonlyArray<BundlesDashboardStatus> =
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

export function buildBundlesDashboardProduct(index: number): Product {
  return {
    id: `bundles-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Bundles Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Bundles',
    imageUrl: `https://picsum.photos/seed/bundles-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildBundlesDashboardItem(index: number): BundlesDashboardItem {
  const product = buildBundlesDashboardProduct(index);
  const status =
    BUNDLES_DASHBOARD_STATUSES[index % BUNDLES_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `bundles-dashboard-${index + 1}`,
    name: `Bundles Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildBundlesDashboardItems(
  count: number = BUNDLES_DASHBOARD_ITEM_COUNT,
): BundlesDashboardItem[] {
  const items: BundlesDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildBundlesDashboardItem(i));
  }
  return items;
}

export function emptyBundlesDashboardTotals(): BundlesDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
