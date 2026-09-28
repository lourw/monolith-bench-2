import type { Product } from '../../../models/product.model';

export type AddressesDashboardStatus = 'active' | 'pending' | 'archived';

export interface AddressesDashboardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AddressesDashboardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AddressesDashboardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ADDRESSES_DASHBOARD_ITEM_COUNT = 12;

export const ADDRESSES_DASHBOARD_STATUSES: ReadonlyArray<AddressesDashboardStatus> =
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

export function buildAddressesDashboardProduct(index: number): Product {
  return {
    id: `addresses-dashboard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Addresses Dashboard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Addresses',
    imageUrl: `https://picsum.photos/seed/addresses-dashboard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAddressesDashboardItem(
  index: number,
): AddressesDashboardItem {
  const product = buildAddressesDashboardProduct(index);
  const status =
    ADDRESSES_DASHBOARD_STATUSES[index % ADDRESSES_DASHBOARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `addresses-dashboard-${index + 1}`,
    name: `Addresses Dashboard ${NAMES[index % NAMES.length]}`,
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

export function buildAddressesDashboardItems(
  count: number = ADDRESSES_DASHBOARD_ITEM_COUNT,
): AddressesDashboardItem[] {
  const items: AddressesDashboardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAddressesDashboardItem(i));
  }
  return items;
}

export function emptyAddressesDashboardTotals(): AddressesDashboardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
