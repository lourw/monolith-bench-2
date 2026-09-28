import type { Product } from '../../../models/product.model';

export type SubscriptionsSummaryStatus = 'active' | 'pending' | 'archived';

export interface SubscriptionsSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SubscriptionsSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SubscriptionsSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SUBSCRIPTIONS_SUMMARY_ITEM_COUNT = 12;

export const SUBSCRIPTIONS_SUMMARY_STATUSES: ReadonlyArray<SubscriptionsSummaryStatus> =
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

export function buildSubscriptionsSummaryProduct(index: number): Product {
  return {
    id: `subscriptions-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Subscriptions Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Subscriptions',
    imageUrl: `https://picsum.photos/seed/subscriptions-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSubscriptionsSummaryItem(
  index: number,
): SubscriptionsSummaryItem {
  const product = buildSubscriptionsSummaryProduct(index);
  const status =
    SUBSCRIPTIONS_SUMMARY_STATUSES[
      index % SUBSCRIPTIONS_SUMMARY_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `subscriptions-summary-${index + 1}`,
    name: `Subscriptions Summary ${NAMES[index % NAMES.length]}`,
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

export function buildSubscriptionsSummaryItems(
  count: number = SUBSCRIPTIONS_SUMMARY_ITEM_COUNT,
): SubscriptionsSummaryItem[] {
  const items: SubscriptionsSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSubscriptionsSummaryItem(i));
  }
  return items;
}

export function emptySubscriptionsSummaryTotals(): SubscriptionsSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
