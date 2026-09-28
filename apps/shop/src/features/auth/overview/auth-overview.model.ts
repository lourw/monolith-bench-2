import type { Product } from '../../../models/product.model';

export type AuthOverviewStatus = 'active' | 'pending' | 'archived';

export interface AuthOverviewItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AuthOverviewStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AuthOverviewTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const AUTH_OVERVIEW_ITEM_COUNT = 7;

export const AUTH_OVERVIEW_STATUSES: ReadonlyArray<AuthOverviewStatus> = [
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

export function buildAuthOverviewProduct(index: number): Product {
  return {
    id: `auth-overview-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Auth Overview product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Auth',
    imageUrl: `https://picsum.photos/seed/auth-overview-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAuthOverviewItem(index: number): AuthOverviewItem {
  const product = buildAuthOverviewProduct(index);
  const status = AUTH_OVERVIEW_STATUSES[index % AUTH_OVERVIEW_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `auth-overview-${index + 1}`,
    name: `Auth Overview ${NAMES[index % NAMES.length]}`,
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

export function buildAuthOverviewItems(
  count: number = AUTH_OVERVIEW_ITEM_COUNT,
): AuthOverviewItem[] {
  const items: AuthOverviewItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAuthOverviewItem(i));
  }
  return items;
}

export function emptyAuthOverviewTotals(): AuthOverviewTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
