import type { Product } from '../../../models/product.model';

export type ProfileEditorStatus = 'active' | 'pending' | 'archived';

export interface ProfileEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ProfileEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ProfileEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROFILE_EDITOR_ITEM_COUNT = 10;

export const PROFILE_EDITOR_STATUSES: ReadonlyArray<ProfileEditorStatus> = [
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

export function buildProfileEditorProduct(index: number): Product {
  return {
    id: `profile-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Profile Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Profile',
    imageUrl: `https://picsum.photos/seed/profile-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildProfileEditorItem(index: number): ProfileEditorItem {
  const product = buildProfileEditorProduct(index);
  const status =
    PROFILE_EDITOR_STATUSES[index % PROFILE_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `profile-editor-${index + 1}`,
    name: `Profile Editor ${NAMES[index % NAMES.length]}`,
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

export function buildProfileEditorItems(
  count: number = PROFILE_EDITOR_ITEM_COUNT,
): ProfileEditorItem[] {
  const items: ProfileEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildProfileEditorItem(i));
  }
  return items;
}

export function emptyProfileEditorTotals(): ProfileEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
