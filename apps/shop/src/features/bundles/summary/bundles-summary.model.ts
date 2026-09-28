import type { Product } from '../../../models/product.model';

export type BundlesSummaryStatus = 'active' | 'pending' | 'archived';

export interface BundlesSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: BundlesSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface BundlesSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const BUNDLES_SUMMARY_ITEM_COUNT = 11;

export const BUNDLES_SUMMARY_STATUSES: ReadonlyArray<BundlesSummaryStatus> = [
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

export function buildBundlesSummaryProduct(index: number): Product {
  return {
    id: `bundles-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Bundles Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Bundles',
    imageUrl: `https://picsum.photos/seed/bundles-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildBundlesSummaryItem(index: number): BundlesSummaryItem {
  const product = buildBundlesSummaryProduct(index);
  const status =
    BUNDLES_SUMMARY_STATUSES[index % BUNDLES_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `bundles-summary-${index + 1}`,
    name: `Bundles Summary ${NAMES[index % NAMES.length]}`,
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

export function buildBundlesSummaryItems(
  count: number = BUNDLES_SUMMARY_ITEM_COUNT,
): BundlesSummaryItem[] {
  const items: BundlesSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildBundlesSummaryItem(i));
  }
  return items;
}

export function emptyBundlesSummaryTotals(): BundlesSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
