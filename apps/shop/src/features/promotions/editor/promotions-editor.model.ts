import type { Product } from '../../../models/product.model';

export type PromotionsEditorStatus = 'active' | 'pending' | 'archived';

export interface PromotionsEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PromotionsEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PromotionsEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PROMOTIONS_EDITOR_ITEM_COUNT = 7;

export const PROMOTIONS_EDITOR_STATUSES: ReadonlyArray<PromotionsEditorStatus> =
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

export function buildPromotionsEditorProduct(index: number): Product {
  return {
    id: `promotions-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Promotions Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Promotions',
    imageUrl: `https://picsum.photos/seed/promotions-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPromotionsEditorItem(index: number): PromotionsEditorItem {
  const product = buildPromotionsEditorProduct(index);
  const status =
    PROMOTIONS_EDITOR_STATUSES[index % PROMOTIONS_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `promotions-editor-${index + 1}`,
    name: `Promotions Editor ${NAMES[index % NAMES.length]}`,
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

export function buildPromotionsEditorItems(
  count: number = PROMOTIONS_EDITOR_ITEM_COUNT,
): PromotionsEditorItem[] {
  const items: PromotionsEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPromotionsEditorItem(i));
  }
  return items;
}

export function emptyPromotionsEditorTotals(): PromotionsEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
