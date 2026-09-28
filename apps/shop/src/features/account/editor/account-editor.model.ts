import type { Product } from '../../../models/product.model';

export type AccountEditorStatus = 'active' | 'pending' | 'archived';

export interface AccountEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AccountEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AccountEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ACCOUNT_EDITOR_ITEM_COUNT = 6;

export const ACCOUNT_EDITOR_STATUSES: ReadonlyArray<AccountEditorStatus> = [
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

export function buildAccountEditorProduct(index: number): Product {
  return {
    id: `account-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Account Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Account',
    imageUrl: `https://picsum.photos/seed/account-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAccountEditorItem(index: number): AccountEditorItem {
  const product = buildAccountEditorProduct(index);
  const status =
    ACCOUNT_EDITOR_STATUSES[index % ACCOUNT_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `account-editor-${index + 1}`,
    name: `Account Editor ${NAMES[index % NAMES.length]}`,
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

export function buildAccountEditorItems(
  count: number = ACCOUNT_EDITOR_ITEM_COUNT,
): AccountEditorItem[] {
  const items: AccountEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAccountEditorItem(i));
  }
  return items;
}

export function emptyAccountEditorTotals(): AccountEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
