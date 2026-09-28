import type { Product } from '../../../models/product.model';

export type ProfileWizardStatus = 'active' | 'pending' | 'archived';

export interface ProfileWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ProfileWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ProfileWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROFILE_WIZARD_ITEM_COUNT = 8;

export const PROFILE_WIZARD_STATUSES: ReadonlyArray<ProfileWizardStatus> = [
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

export function buildProfileWizardProduct(index: number): Product {
  return {
    id: `profile-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Profile Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Profile',
    imageUrl: `https://picsum.photos/seed/profile-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildProfileWizardItem(index: number): ProfileWizardItem {
  const product = buildProfileWizardProduct(index);
  const status =
    PROFILE_WIZARD_STATUSES[index % PROFILE_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `profile-wizard-${index + 1}`,
    name: `Profile Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildProfileWizardItems(
  count: number = PROFILE_WIZARD_ITEM_COUNT,
): ProfileWizardItem[] {
  const items: ProfileWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildProfileWizardItem(i));
  }
  return items;
}

export function emptyProfileWizardTotals(): ProfileWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
