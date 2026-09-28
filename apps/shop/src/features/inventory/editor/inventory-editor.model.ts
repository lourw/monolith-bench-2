import type { Product } from '../../../models/product.model';

export type InventoryEditorStatus = 'active' | 'pending' | 'archived';

export interface InventoryEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: InventoryEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface InventoryEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const INVENTORY_EDITOR_ITEM_COUNT = 9;

export const INVENTORY_EDITOR_STATUSES: ReadonlyArray<InventoryEditorStatus> = [
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

export function buildInventoryEditorProduct(index: number): Product {
  return {
    id: `inventory-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Inventory Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Inventory',
    imageUrl: `https://picsum.photos/seed/inventory-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildInventoryEditorItem(index: number): InventoryEditorItem {
  const product = buildInventoryEditorProduct(index);
  const status =
    INVENTORY_EDITOR_STATUSES[index % INVENTORY_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `inventory-editor-${index + 1}`,
    name: `Inventory Editor ${NAMES[index % NAMES.length]}`,
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

export function buildInventoryEditorItems(
  count: number = INVENTORY_EDITOR_ITEM_COUNT,
): InventoryEditorItem[] {
  const items: InventoryEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildInventoryEditorItem(i));
  }
  return items;
}

export function emptyInventoryEditorTotals(): InventoryEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
