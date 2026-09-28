import type { Product } from '../../../models/product.model';

export type AccountWizardStatus = 'active' | 'pending' | 'archived';

export interface AccountWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AccountWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AccountWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ACCOUNT_WIZARD_ITEM_COUNT = 7;

export const ACCOUNT_WIZARD_STATUSES: ReadonlyArray<AccountWizardStatus> = [
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

export function buildAccountWizardProduct(index: number): Product {
  return {
    id: `account-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Account Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Account',
    imageUrl: `https://picsum.photos/seed/account-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAccountWizardItem(index: number): AccountWizardItem {
  const product = buildAccountWizardProduct(index);
  const status =
    ACCOUNT_WIZARD_STATUSES[index % ACCOUNT_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `account-wizard-${index + 1}`,
    name: `Account Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildAccountWizardItems(
  count: number = ACCOUNT_WIZARD_ITEM_COUNT,
): AccountWizardItem[] {
  const items: AccountWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAccountWizardItem(i));
  }
  return items;
}

export function emptyAccountWizardTotals(): AccountWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
