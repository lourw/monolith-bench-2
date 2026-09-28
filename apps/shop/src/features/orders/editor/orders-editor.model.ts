import type { Product } from '../../../models/product.model';

export type OrdersEditorStatus = 'active' | 'pending' | 'archived';

export interface OrdersEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: OrdersEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface OrdersEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ORDERS_EDITOR_ITEM_COUNT = 5;

export const ORDERS_EDITOR_STATUSES: ReadonlyArray<OrdersEditorStatus> = [
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

export function buildOrdersEditorProduct(index: number): Product {
  return {
    id: `orders-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Orders Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Orders',
    imageUrl: `https://picsum.photos/seed/orders-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildOrdersEditorItem(index: number): OrdersEditorItem {
  const product = buildOrdersEditorProduct(index);
  const status = ORDERS_EDITOR_STATUSES[index % ORDERS_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `orders-editor-${index + 1}`,
    name: `Orders Editor ${NAMES[index % NAMES.length]}`,
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

export function buildOrdersEditorItems(
  count: number = ORDERS_EDITOR_ITEM_COUNT,
): OrdersEditorItem[] {
  const items: OrdersEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildOrdersEditorItem(i));
  }
  return items;
}

export function emptyOrdersEditorTotals(): OrdersEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
