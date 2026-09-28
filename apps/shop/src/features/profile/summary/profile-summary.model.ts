import type { Product } from '../../../models/product.model';

export type ProfileSummaryStatus = 'active' | 'pending' | 'archived';

export interface ProfileSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ProfileSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ProfileSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROFILE_SUMMARY_ITEM_COUNT = 11;

export const PROFILE_SUMMARY_STATUSES: ReadonlyArray<ProfileSummaryStatus> = [
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

export function buildProfileSummaryProduct(index: number): Product {
  return {
    id: `profile-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Profile Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Profile',
    imageUrl: `https://picsum.photos/seed/profile-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildProfileSummaryItem(index: number): ProfileSummaryItem {
  const product = buildProfileSummaryProduct(index);
  const status =
    PROFILE_SUMMARY_STATUSES[index % PROFILE_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `profile-summary-${index + 1}`,
    name: `Profile Summary ${NAMES[index % NAMES.length]}`,
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

export function buildProfileSummaryItems(
  count: number = PROFILE_SUMMARY_ITEM_COUNT,
): ProfileSummaryItem[] {
  const items: ProfileSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildProfileSummaryItem(i));
  }
  return items;
}

export function emptyProfileSummaryTotals(): ProfileSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
