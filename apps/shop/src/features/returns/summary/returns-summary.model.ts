import type { Product } from '../../../models/product.model';

export type ReturnsSummaryStatus = 'active' | 'pending' | 'archived';

export interface ReturnsSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_SUMMARY_ITEM_COUNT = 9;

export const RETURNS_SUMMARY_STATUSES: ReadonlyArray<ReturnsSummaryStatus> = [
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

export function buildReturnsSummaryProduct(index: number): Product {
  return {
    id: `returns-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsSummaryItem(index: number): ReturnsSummaryItem {
  const product = buildReturnsSummaryProduct(index);
  const status =
    RETURNS_SUMMARY_STATUSES[index % RETURNS_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-summary-${index + 1}`,
    name: `Returns Summary ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsSummaryItems(
  count: number = RETURNS_SUMMARY_ITEM_COUNT,
): ReturnsSummaryItem[] {
  const items: ReturnsSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsSummaryItem(i));
  }
  return items;
}

export function emptyReturnsSummaryTotals(): ReturnsSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
