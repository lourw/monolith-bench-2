import type { Product } from '../../../models/product.model';

export type ShippingEditorStatus = 'active' | 'pending' | 'archived';

export interface ShippingEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ShippingEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ShippingEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SHIPPING_EDITOR_ITEM_COUNT = 6;

export const SHIPPING_EDITOR_STATUSES: ReadonlyArray<ShippingEditorStatus> = [
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

export function buildShippingEditorProduct(index: number): Product {
  return {
    id: `shipping-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Shipping Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Shipping',
    imageUrl: `https://picsum.photos/seed/shipping-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildShippingEditorItem(index: number): ShippingEditorItem {
  const product = buildShippingEditorProduct(index);
  const status =
    SHIPPING_EDITOR_STATUSES[index % SHIPPING_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `shipping-editor-${index + 1}`,
    name: `Shipping Editor ${NAMES[index % NAMES.length]}`,
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

export function buildShippingEditorItems(
  count: number = SHIPPING_EDITOR_ITEM_COUNT,
): ShippingEditorItem[] {
  const items: ShippingEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildShippingEditorItem(i));
  }
  return items;
}

export function emptyShippingEditorTotals(): ShippingEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
