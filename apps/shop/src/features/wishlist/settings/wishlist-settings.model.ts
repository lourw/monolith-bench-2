import type { Product } from '../../../models/product.model';

export type WishlistSettingsStatus = 'active' | 'pending' | 'archived';

export interface WishlistSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: WishlistSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface WishlistSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const WISHLIST_SETTINGS_ITEM_COUNT = 5;

export const WISHLIST_SETTINGS_STATUSES: ReadonlyArray<WishlistSettingsStatus> =
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

export function buildWishlistSettingsProduct(index: number): Product {
  return {
    id: `wishlist-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Wishlist Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Wishlist',
    imageUrl: `https://picsum.photos/seed/wishlist-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildWishlistSettingsItem(index: number): WishlistSettingsItem {
  const product = buildWishlistSettingsProduct(index);
  const status =
    WISHLIST_SETTINGS_STATUSES[index % WISHLIST_SETTINGS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `wishlist-settings-${index + 1}`,
    name: `Wishlist Settings ${NAMES[index % NAMES.length]}`,
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

export function buildWishlistSettingsItems(
  count: number = WISHLIST_SETTINGS_ITEM_COUNT,
): WishlistSettingsItem[] {
  const items: WishlistSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildWishlistSettingsItem(i));
  }
  return items;
}

export function emptyWishlistSettingsTotals(): WishlistSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
