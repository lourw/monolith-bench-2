import type { Product } from '../../../models/product.model';

export type PromotionsDetailsStatus = 'active' | 'pending' | 'archived';

export interface PromotionsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PromotionsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PromotionsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROMOTIONS_DETAILS_ITEM_COUNT = 9;

export const PROMOTIONS_DETAILS_STATUSES: ReadonlyArray<PromotionsDetailsStatus> =
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

export function buildPromotionsDetailsProduct(index: number): Product {
  return {
    id: `promotions-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Promotions Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Promotions',
    imageUrl: `https://picsum.photos/seed/promotions-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPromotionsDetailsItem(
  index: number,
): PromotionsDetailsItem {
  const product = buildPromotionsDetailsProduct(index);
  const status =
    PROMOTIONS_DETAILS_STATUSES[index % PROMOTIONS_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `promotions-details-${index + 1}`,
    name: `Promotions Details ${NAMES[index % NAMES.length]}`,
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

export function buildPromotionsDetailsItems(
  count: number = PROMOTIONS_DETAILS_ITEM_COUNT,
): PromotionsDetailsItem[] {
  const items: PromotionsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPromotionsDetailsItem(i));
  }
  return items;
}

export function emptyPromotionsDetailsTotals(): PromotionsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
