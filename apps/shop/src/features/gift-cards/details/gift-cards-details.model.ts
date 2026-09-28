import type { Product } from '../../../models/product.model';

export type GiftCardsDetailsStatus = 'active' | 'pending' | 'archived';

export interface GiftCardsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: GiftCardsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface GiftCardsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const GIFT_CARDS_DETAILS_ITEM_COUNT = 9;

export const GIFT_CARDS_DETAILS_STATUSES: ReadonlyArray<GiftCardsDetailsStatus> =
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

export function buildGiftCardsDetailsProduct(index: number): Product {
  return {
    id: `gift-cards-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Gift Cards Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Gift Cards',
    imageUrl: `https://picsum.photos/seed/gift-cards-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildGiftCardsDetailsItem(index: number): GiftCardsDetailsItem {
  const product = buildGiftCardsDetailsProduct(index);
  const status =
    GIFT_CARDS_DETAILS_STATUSES[index % GIFT_CARDS_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `gift-cards-details-${index + 1}`,
    name: `Gift Cards Details ${NAMES[index % NAMES.length]}`,
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

export function buildGiftCardsDetailsItems(
  count: number = GIFT_CARDS_DETAILS_ITEM_COUNT,
): GiftCardsDetailsItem[] {
  const items: GiftCardsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildGiftCardsDetailsItem(i));
  }
  return items;
}

export function emptyGiftCardsDetailsTotals(): GiftCardsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
