import type { Product } from '../../../models/product.model';

export type SizingInsightsStatus = 'active' | 'pending' | 'archived';

export interface SizingInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_INSIGHTS_ITEM_COUNT = 9;

export const SIZING_INSIGHTS_STATUSES: ReadonlyArray<SizingInsightsStatus> = [
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

export function buildSizingInsightsProduct(index: number): Product {
  return {
    id: `sizing-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingInsightsItem(index: number): SizingInsightsItem {
  const product = buildSizingInsightsProduct(index);
  const status =
    SIZING_INSIGHTS_STATUSES[index % SIZING_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-insights-${index + 1}`,
    name: `Sizing Insights ${NAMES[index % NAMES.length]}`,
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

export function buildSizingInsightsItems(
  count: number = SIZING_INSIGHTS_ITEM_COUNT,
): SizingInsightsItem[] {
  const items: SizingInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingInsightsItem(i));
  }
  return items;
}

export function emptySizingInsightsTotals(): SizingInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
