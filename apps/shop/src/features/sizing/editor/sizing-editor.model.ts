import type { Product } from '../../../models/product.model';

export type SizingEditorStatus = 'active' | 'pending' | 'archived';

export interface SizingEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_EDITOR_ITEM_COUNT = 6;

export const SIZING_EDITOR_STATUSES: ReadonlyArray<SizingEditorStatus> = [
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

export function buildSizingEditorProduct(index: number): Product {
  return {
    id: `sizing-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingEditorItem(index: number): SizingEditorItem {
  const product = buildSizingEditorProduct(index);
  const status = SIZING_EDITOR_STATUSES[index % SIZING_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-editor-${index + 1}`,
    name: `Sizing Editor ${NAMES[index % NAMES.length]}`,
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

export function buildSizingEditorItems(
  count: number = SIZING_EDITOR_ITEM_COUNT,
): SizingEditorItem[] {
  const items: SizingEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingEditorItem(i));
  }
  return items;
}

export function emptySizingEditorTotals(): SizingEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
