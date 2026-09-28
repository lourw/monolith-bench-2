import type { Product } from '../../../models/product.model';

export type WishlistEditorStatus = 'active' | 'pending' | 'archived';

export interface WishlistEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: WishlistEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface WishlistEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const WISHLIST_EDITOR_ITEM_COUNT = 8;

export const WISHLIST_EDITOR_STATUSES: ReadonlyArray<WishlistEditorStatus> = [
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

export function buildWishlistEditorProduct(index: number): Product {
  return {
    id: `wishlist-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Wishlist Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Wishlist',
    imageUrl: `https://picsum.photos/seed/wishlist-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildWishlistEditorItem(index: number): WishlistEditorItem {
  const product = buildWishlistEditorProduct(index);
  const status =
    WISHLIST_EDITOR_STATUSES[index % WISHLIST_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `wishlist-editor-${index + 1}`,
    name: `Wishlist Editor ${NAMES[index % NAMES.length]}`,
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

export function buildWishlistEditorItems(
  count: number = WISHLIST_EDITOR_ITEM_COUNT,
): WishlistEditorItem[] {
  const items: WishlistEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildWishlistEditorItem(i));
  }
  return items;
}

export function emptyWishlistEditorTotals(): WishlistEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
