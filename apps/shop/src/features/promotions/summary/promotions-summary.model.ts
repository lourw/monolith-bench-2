import type { Product } from '../../../models/product.model';

export type PromotionsSummaryStatus = 'active' | 'pending' | 'archived';

export interface PromotionsSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PromotionsSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PromotionsSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROMOTIONS_SUMMARY_ITEM_COUNT = 7;

export const PROMOTIONS_SUMMARY_STATUSES: ReadonlyArray<PromotionsSummaryStatus> =
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

export function buildPromotionsSummaryProduct(index: number): Product {
  return {
    id: `promotions-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Promotions Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Promotions',
    imageUrl: `https://picsum.photos/seed/promotions-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPromotionsSummaryItem(
  index: number,
): PromotionsSummaryItem {
  const product = buildPromotionsSummaryProduct(index);
  const status =
    PROMOTIONS_SUMMARY_STATUSES[index % PROMOTIONS_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `promotions-summary-${index + 1}`,
    name: `Promotions Summary ${NAMES[index % NAMES.length]}`,
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

export function buildPromotionsSummaryItems(
  count: number = PROMOTIONS_SUMMARY_ITEM_COUNT,
): PromotionsSummaryItem[] {
  const items: PromotionsSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPromotionsSummaryItem(i));
  }
  return items;
}

export function emptyPromotionsSummaryTotals(): PromotionsSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
