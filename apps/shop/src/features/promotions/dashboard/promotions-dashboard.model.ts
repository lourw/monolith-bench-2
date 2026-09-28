import type { Product } from '../../../models/product.model';

export type PromotionsDashboardStatus = 'active' | 'pending' | 'archived';

export interface PromotionsDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PromotionsDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PromotionsDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROMOTIONS_DASHBOARD_ITEM_COUNT = 8;

export const PROMOTIONS_DASHBOARD_STATUSES: ReadonlyArray<PromotionsDashboardStatus> =
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

export function buildPromotionsDashboardProduct(index: number): Product {
  return {
    id: `promotions-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Promotions Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Promotions',
    imageUrl: `https://picsum.photos/seed/promotions-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPromotionsDashboardItem(
  index: number,
): PromotionsDashboardItem {
  const product = buildPromotionsDashboardProduct(index);
  const status =
    PROMOTIONS_DASHBOARD_STATUSES[index % PROMOTIONS_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `promotions-dashboard-${index + 1}`,
    name: `Promotions Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildPromotionsDashboardItems(
  count: number = PROMOTIONS_DASHBOARD_ITEM_COUNT,
): PromotionsDashboardItem[] {
  const items: PromotionsDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPromotionsDashboardItem(i));
  }
  return items;
}

export function emptyPromotionsDashboardTotals(): PromotionsDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
