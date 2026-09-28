import type { Product } from '../../../models/product.model';

export type AnalyticsListStatus = 'active' | 'pending' | 'archived';

export interface AnalyticsListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AnalyticsListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AnalyticsListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ANALYTICS_LIST_ITEM_COUNT = 9;

export const ANALYTICS_LIST_STATUSES: ReadonlyArray<AnalyticsListStatus> = [
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

export function buildAnalyticsListProduct(index: number): Product {
  return {
    id: `analytics-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Analytics List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Analytics',
    imageUrl: `https://picsum.photos/seed/analytics-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAnalyticsListItem(index: number): AnalyticsListItem {
  const product = buildAnalyticsListProduct(index);
  const status =
    ANALYTICS_LIST_STATUSES[index % ANALYTICS_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `analytics-list-${index + 1}`,
    name: `Analytics List ${NAMES[index % NAMES.length]}`,
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

export function buildAnalyticsListItems(
  count: number = ANALYTICS_LIST_ITEM_COUNT,
): AnalyticsListItem[] {
  const items: AnalyticsListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAnalyticsListItem(i));
  }
  return items;
}

export function emptyAnalyticsListTotals(): AnalyticsListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
