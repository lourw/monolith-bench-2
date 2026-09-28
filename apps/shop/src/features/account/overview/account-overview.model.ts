import type { Product } from '../../../models/product.model';

export type AccountOverviewStatus = 'active' | 'pending' | 'archived';

export interface AccountOverviewItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AccountOverviewStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AccountOverviewTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ACCOUNT_OVERVIEW_ITEM_COUNT = 12;

export const ACCOUNT_OVERVIEW_STATUSES: ReadonlyArray<AccountOverviewStatus> = [
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

export function buildAccountOverviewProduct(index: number): Product {
  return {
    id: `account-overview-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Account Overview product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Account',
    imageUrl: `https://picsum.photos/seed/account-overview-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAccountOverviewItem(index: number): AccountOverviewItem {
  const product = buildAccountOverviewProduct(index);
  const status =
    ACCOUNT_OVERVIEW_STATUSES[index % ACCOUNT_OVERVIEW_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `account-overview-${index + 1}`,
    name: `Account Overview ${NAMES[index % NAMES.length]}`,
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

export function buildAccountOverviewItems(
  count: number = ACCOUNT_OVERVIEW_ITEM_COUNT,
): AccountOverviewItem[] {
  const items: AccountOverviewItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAccountOverviewItem(i));
  }
  return items;
}

export function emptyAccountOverviewTotals(): AccountOverviewTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
