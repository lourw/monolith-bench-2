import type { Product } from '../../../models/product.model';

export type CompareSummaryStatus = 'active' | 'pending' | 'archived';

export interface CompareSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CompareSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CompareSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const COMPARE_SUMMARY_ITEM_COUNT = 11;

export const COMPARE_SUMMARY_STATUSES: ReadonlyArray<CompareSummaryStatus> = [
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

export function buildCompareSummaryProduct(index: number): Product {
  return {
    id: `compare-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Compare Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Compare',
    imageUrl: `https://picsum.photos/seed/compare-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCompareSummaryItem(index: number): CompareSummaryItem {
  const product = buildCompareSummaryProduct(index);
  const status =
    COMPARE_SUMMARY_STATUSES[index % COMPARE_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `compare-summary-${index + 1}`,
    name: `Compare Summary ${NAMES[index % NAMES.length]}`,
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

export function buildCompareSummaryItems(
  count: number = COMPARE_SUMMARY_ITEM_COUNT,
): CompareSummaryItem[] {
  const items: CompareSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCompareSummaryItem(i));
  }
  return items;
}

export function emptyCompareSummaryTotals(): CompareSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
