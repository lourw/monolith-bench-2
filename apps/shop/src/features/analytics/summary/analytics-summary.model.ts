import type { Product } from '../../../models/product.model';

export type AnalyticsSummaryStatus = 'active' | 'pending' | 'archived';

export interface AnalyticsSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AnalyticsSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AnalyticsSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ANALYTICS_SUMMARY_ITEM_COUNT = 6;

export const ANALYTICS_SUMMARY_STATUSES: ReadonlyArray<AnalyticsSummaryStatus> =
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

export function buildAnalyticsSummaryProduct(index: number): Product {
  return {
    id: `analytics-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Analytics Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Analytics',
    imageUrl: `https://picsum.photos/seed/analytics-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAnalyticsSummaryItem(index: number): AnalyticsSummaryItem {
  const product = buildAnalyticsSummaryProduct(index);
  const status =
    ANALYTICS_SUMMARY_STATUSES[index % ANALYTICS_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `analytics-summary-${index + 1}`,
    name: `Analytics Summary ${NAMES[index % NAMES.length]}`,
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

export function buildAnalyticsSummaryItems(
  count: number = ANALYTICS_SUMMARY_ITEM_COUNT,
): AnalyticsSummaryItem[] {
  const items: AnalyticsSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAnalyticsSummaryItem(i));
  }
  return items;
}

export function emptyAnalyticsSummaryTotals(): AnalyticsSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
