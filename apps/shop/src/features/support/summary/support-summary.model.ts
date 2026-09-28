import type { Product } from '../../../models/product.model';

export type SupportSummaryStatus = 'active' | 'pending' | 'archived';

export interface SupportSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SupportSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SupportSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SUPPORT_SUMMARY_ITEM_COUNT = 11;

export const SUPPORT_SUMMARY_STATUSES: ReadonlyArray<SupportSummaryStatus> = [
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

export function buildSupportSummaryProduct(index: number): Product {
  return {
    id: `support-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Support Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Support',
    imageUrl: `https://picsum.photos/seed/support-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSupportSummaryItem(index: number): SupportSummaryItem {
  const product = buildSupportSummaryProduct(index);
  const status =
    SUPPORT_SUMMARY_STATUSES[index % SUPPORT_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `support-summary-${index + 1}`,
    name: `Support Summary ${NAMES[index % NAMES.length]}`,
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

export function buildSupportSummaryItems(
  count: number = SUPPORT_SUMMARY_ITEM_COUNT,
): SupportSummaryItem[] {
  const items: SupportSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSupportSummaryItem(i));
  }
  return items;
}

export function emptySupportSummaryTotals(): SupportSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
