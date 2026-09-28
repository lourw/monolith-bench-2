import type { Product } from '../../../models/product.model';

export type StoreLocatorSummaryStatus = 'active' | 'pending' | 'archived';

export interface StoreLocatorSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: StoreLocatorSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface StoreLocatorSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const STORE_LOCATOR_SUMMARY_ITEM_COUNT = 10;

export const STORE_LOCATOR_SUMMARY_STATUSES: ReadonlyArray<StoreLocatorSummaryStatus> =
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

export function buildStoreLocatorSummaryProduct(index: number): Product {
  return {
    id: `store-locator-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Store Locator Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Store Locator',
    imageUrl: `https://picsum.photos/seed/store-locator-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildStoreLocatorSummaryItem(
  index: number,
): StoreLocatorSummaryItem {
  const product = buildStoreLocatorSummaryProduct(index);
  const status =
    STORE_LOCATOR_SUMMARY_STATUSES[
      index % STORE_LOCATOR_SUMMARY_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `store-locator-summary-${index + 1}`,
    name: `Store Locator Summary ${NAMES[index % NAMES.length]}`,
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

export function buildStoreLocatorSummaryItems(
  count: number = STORE_LOCATOR_SUMMARY_ITEM_COUNT,
): StoreLocatorSummaryItem[] {
  const items: StoreLocatorSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildStoreLocatorSummaryItem(i));
  }
  return items;
}

export function emptyStoreLocatorSummaryTotals(): StoreLocatorSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
