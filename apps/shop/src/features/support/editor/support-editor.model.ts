import type { Product } from '../../../models/product.model';

export type SupportEditorStatus = 'active' | 'pending' | 'archived';

export interface SupportEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SupportEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SupportEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SUPPORT_EDITOR_ITEM_COUNT = 6;

export const SUPPORT_EDITOR_STATUSES: ReadonlyArray<SupportEditorStatus> = [
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

export function buildSupportEditorProduct(index: number): Product {
  return {
    id: `support-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Support Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Support',
    imageUrl: `https://picsum.photos/seed/support-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSupportEditorItem(index: number): SupportEditorItem {
  const product = buildSupportEditorProduct(index);
  const status =
    SUPPORT_EDITOR_STATUSES[index % SUPPORT_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `support-editor-${index + 1}`,
    name: `Support Editor ${NAMES[index % NAMES.length]}`,
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

export function buildSupportEditorItems(
  count: number = SUPPORT_EDITOR_ITEM_COUNT,
): SupportEditorItem[] {
  const items: SupportEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSupportEditorItem(i));
  }
  return items;
}

export function emptySupportEditorTotals(): SupportEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
