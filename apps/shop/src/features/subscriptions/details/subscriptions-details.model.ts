import type { Product } from '../../../models/product.model';

export type SubscriptionsDetailsStatus = 'active' | 'pending' | 'archived';

export interface SubscriptionsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SubscriptionsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SubscriptionsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SUBSCRIPTIONS_DETAILS_ITEM_COUNT = 11;

export const SUBSCRIPTIONS_DETAILS_STATUSES: ReadonlyArray<SubscriptionsDetailsStatus> =
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

export function buildSubscriptionsDetailsProduct(index: number): Product {
  return {
    id: `subscriptions-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Subscriptions Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Subscriptions',
    imageUrl: `https://picsum.photos/seed/subscriptions-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSubscriptionsDetailsItem(
  index: number,
): SubscriptionsDetailsItem {
  const product = buildSubscriptionsDetailsProduct(index);
  const status =
    SUBSCRIPTIONS_DETAILS_STATUSES[
      index % SUBSCRIPTIONS_DETAILS_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `subscriptions-details-${index + 1}`,
    name: `Subscriptions Details ${NAMES[index % NAMES.length]}`,
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

export function buildSubscriptionsDetailsItems(
  count: number = SUBSCRIPTIONS_DETAILS_ITEM_COUNT,
): SubscriptionsDetailsItem[] {
  const items: SubscriptionsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSubscriptionsDetailsItem(i));
  }
  return items;
}

export function emptySubscriptionsDetailsTotals(): SubscriptionsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
