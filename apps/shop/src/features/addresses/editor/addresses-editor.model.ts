import type { Product } from '../../../models/product.model';

export type AddressesEditorStatus = 'active' | 'pending' | 'archived';

export interface AddressesEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AddressesEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AddressesEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ADDRESSES_EDITOR_ITEM_COUNT = 9;

export const ADDRESSES_EDITOR_STATUSES: ReadonlyArray<AddressesEditorStatus> = [
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

export function buildAddressesEditorProduct(index: number): Product {
  return {
    id: `addresses-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Addresses Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Addresses',
    imageUrl: `https://picsum.photos/seed/addresses-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAddressesEditorItem(index: number): AddressesEditorItem {
  const product = buildAddressesEditorProduct(index);
  const status =
    ADDRESSES_EDITOR_STATUSES[index % ADDRESSES_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `addresses-editor-${index + 1}`,
    name: `Addresses Editor ${NAMES[index % NAMES.length]}`,
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

export function buildAddressesEditorItems(
  count: number = ADDRESSES_EDITOR_ITEM_COUNT,
): AddressesEditorItem[] {
  const items: AddressesEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAddressesEditorItem(i));
  }
  return items;
}

export function emptyAddressesEditorTotals(): AddressesEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
