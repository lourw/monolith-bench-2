import type { Product } from '../../../models/product.model';

export type ReturnsEditorStatus = 'active' | 'pending' | 'archived';

export interface ReturnsEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_EDITOR_ITEM_COUNT = 8;

export const RETURNS_EDITOR_STATUSES: ReadonlyArray<ReturnsEditorStatus> = [
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

export function buildReturnsEditorProduct(index: number): Product {
  return {
    id: `returns-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsEditorItem(index: number): ReturnsEditorItem {
  const product = buildReturnsEditorProduct(index);
  const status =
    RETURNS_EDITOR_STATUSES[index % RETURNS_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-editor-${index + 1}`,
    name: `Returns Editor ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsEditorItems(
  count: number = RETURNS_EDITOR_ITEM_COUNT,
): ReturnsEditorItem[] {
  const items: ReturnsEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsEditorItem(i));
  }
  return items;
}

export function emptyReturnsEditorTotals(): ReturnsEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
