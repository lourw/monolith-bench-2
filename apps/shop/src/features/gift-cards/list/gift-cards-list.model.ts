import type { Product } from '../../../models/product.model';

export type GiftCardsListStatus = 'active' | 'pending' | 'archived';

export interface GiftCardsListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: GiftCardsListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface GiftCardsListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const GIFT_CARDS_LIST_ITEM_COUNT = 7;

export const GIFT_CARDS_LIST_STATUSES: ReadonlyArray<GiftCardsListStatus> = [
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

export function buildGiftCardsListProduct(index: number): Product {
  return {
    id: `gift-cards-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Gift Cards List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Gift Cards',
    imageUrl: `https://picsum.photos/seed/gift-cards-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildGiftCardsListItem(index: number): GiftCardsListItem {
  const product = buildGiftCardsListProduct(index);
  const status =
    GIFT_CARDS_LIST_STATUSES[index % GIFT_CARDS_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `gift-cards-list-${index + 1}`,
    name: `Gift Cards List ${NAMES[index % NAMES.length]}`,
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

export function buildGiftCardsListItems(
  count: number = GIFT_CARDS_LIST_ITEM_COUNT,
): GiftCardsListItem[] {
  const items: GiftCardsListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildGiftCardsListItem(i));
  }
  return items;
}

export function emptyGiftCardsListTotals(): GiftCardsListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
