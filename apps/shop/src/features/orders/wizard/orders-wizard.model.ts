import type { Product } from '../../../models/product.model';

export type OrdersWizardStatus = 'active' | 'pending' | 'archived';

export interface OrdersWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: OrdersWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface OrdersWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ORDERS_WIZARD_ITEM_COUNT = 5;

export const ORDERS_WIZARD_STATUSES: ReadonlyArray<OrdersWizardStatus> = [
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

export function buildOrdersWizardProduct(index: number): Product {
  return {
    id: `orders-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Orders Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Orders',
    imageUrl: `https://picsum.photos/seed/orders-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildOrdersWizardItem(index: number): OrdersWizardItem {
  const product = buildOrdersWizardProduct(index);
  const status = ORDERS_WIZARD_STATUSES[index % ORDERS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `orders-wizard-${index + 1}`,
    name: `Orders Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildOrdersWizardItems(
  count: number = ORDERS_WIZARD_ITEM_COUNT,
): OrdersWizardItem[] {
  const items: OrdersWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildOrdersWizardItem(i));
  }
  return items;
}

export function emptyOrdersWizardTotals(): OrdersWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
