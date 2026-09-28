import type { Product } from '../../../models/product.model';

export type CompareEditorStatus = 'active' | 'pending' | 'archived';

export interface CompareEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CompareEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CompareEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const COMPARE_EDITOR_ITEM_COUNT = 8;

export const COMPARE_EDITOR_STATUSES: ReadonlyArray<CompareEditorStatus> = [
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

export function buildCompareEditorProduct(index: number): Product {
  return {
    id: `compare-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Compare Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Compare',
    imageUrl: `https://picsum.photos/seed/compare-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCompareEditorItem(index: number): CompareEditorItem {
  const product = buildCompareEditorProduct(index);
  const status =
    COMPARE_EDITOR_STATUSES[index % COMPARE_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `compare-editor-${index + 1}`,
    name: `Compare Editor ${NAMES[index % NAMES.length]}`,
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

export function buildCompareEditorItems(
  count: number = COMPARE_EDITOR_ITEM_COUNT,
): CompareEditorItem[] {
  const items: CompareEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCompareEditorItem(i));
  }
  return items;
}

export function emptyCompareEditorTotals(): CompareEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
