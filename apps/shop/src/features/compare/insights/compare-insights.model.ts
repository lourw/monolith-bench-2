import type { Product } from '../../../models/product.model';

export type CompareInsightsStatus = 'active' | 'pending' | 'archived';

export interface CompareInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CompareInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CompareInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const COMPARE_INSIGHTS_ITEM_COUNT = 6;

export const COMPARE_INSIGHTS_STATUSES: ReadonlyArray<CompareInsightsStatus> = [
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

export function buildCompareInsightsProduct(index: number): Product {
  return {
    id: `compare-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Compare Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Compare',
    imageUrl: `https://picsum.photos/seed/compare-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCompareInsightsItem(index: number): CompareInsightsItem {
  const product = buildCompareInsightsProduct(index);
  const status =
    COMPARE_INSIGHTS_STATUSES[index % COMPARE_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `compare-insights-${index + 1}`,
    name: `Compare Insights ${NAMES[index % NAMES.length]}`,
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

export function buildCompareInsightsItems(
  count: number = COMPARE_INSIGHTS_ITEM_COUNT,
): CompareInsightsItem[] {
  const items: CompareInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCompareInsightsItem(i));
  }
  return items;
}

export function emptyCompareInsightsTotals(): CompareInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
