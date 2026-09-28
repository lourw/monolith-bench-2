import type { Product } from '../../../models/product.model';

export type ProfileSettingsStatus = 'active' | 'pending' | 'archived';

export interface ProfileSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ProfileSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ProfileSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROFILE_SETTINGS_ITEM_COUNT = 9;

export const PROFILE_SETTINGS_STATUSES: ReadonlyArray<ProfileSettingsStatus> = [
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

export function buildProfileSettingsProduct(index: number): Product {
  return {
    id: `profile-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Profile Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Profile',
    imageUrl: `https://picsum.photos/seed/profile-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildProfileSettingsItem(index: number): ProfileSettingsItem {
  const product = buildProfileSettingsProduct(index);
  const status =
    PROFILE_SETTINGS_STATUSES[index % PROFILE_SETTINGS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `profile-settings-${index + 1}`,
    name: `Profile Settings ${NAMES[index % NAMES.length]}`,
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

export function buildProfileSettingsItems(
  count: number = PROFILE_SETTINGS_ITEM_COUNT,
): ProfileSettingsItem[] {
  const items: ProfileSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildProfileSettingsItem(i));
  }
  return items;
}

export function emptyProfileSettingsTotals(): ProfileSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
