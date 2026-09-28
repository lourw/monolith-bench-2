import type { Product } from '../../../models/product.model';

export type GiftCardsSummaryStatus = 'active' | 'pending' | 'archived';

export interface GiftCardsSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: GiftCardsSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface GiftCardsSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const GIFT_CARDS_SUMMARY_ITEM_COUNT = 5;

export const GIFT_CARDS_SUMMARY_STATUSES: ReadonlyArray<GiftCardsSummaryStatus> =
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

export function buildGiftCardsSummaryProduct(index: number): Product {
  return {
    id: `gift-cards-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Gift Cards Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Gift Cards',
    imageUrl: `https://picsum.photos/seed/gift-cards-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildGiftCardsSummaryItem(index: number): GiftCardsSummaryItem {
  const product = buildGiftCardsSummaryProduct(index);
  const status =
    GIFT_CARDS_SUMMARY_STATUSES[index % GIFT_CARDS_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `gift-cards-summary-${index + 1}`,
    name: `Gift Cards Summary ${NAMES[index % NAMES.length]}`,
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

export function buildGiftCardsSummaryItems(
  count: number = GIFT_CARDS_SUMMARY_ITEM_COUNT,
): GiftCardsSummaryItem[] {
  const items: GiftCardsSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildGiftCardsSummaryItem(i));
  }
  return items;
}

export function emptyGiftCardsSummaryTotals(): GiftCardsSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
