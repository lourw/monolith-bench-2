import type { Product } from '../../../models/product.model';

export type AddressesDetailsStatus = 'active' | 'pending' | 'archived';

export interface AddressesDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AddressesDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AddressesDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ADDRESSES_DETAILS_ITEM_COUNT = 7;

export const ADDRESSES_DETAILS_STATUSES: ReadonlyArray<AddressesDetailsStatus> =
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

export function buildAddressesDetailsProduct(index: number): Product {
  return {
    id: `addresses-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Addresses Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Addresses',
    imageUrl: `https://picsum.photos/seed/addresses-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAddressesDetailsItem(index: number): AddressesDetailsItem {
  const product = buildAddressesDetailsProduct(index);
  const status =
    ADDRESSES_DETAILS_STATUSES[index % ADDRESSES_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `addresses-details-${index + 1}`,
    name: `Addresses Details ${NAMES[index % NAMES.length]}`,
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

export function buildAddressesDetailsItems(
  count: number = ADDRESSES_DETAILS_ITEM_COUNT,
): AddressesDetailsItem[] {
  const items: AddressesDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAddressesDetailsItem(i));
  }
  return items;
}

export function emptyAddressesDetailsTotals(): AddressesDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
