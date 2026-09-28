import type { Product } from '../../../models/product.model';

export type PaymentsEditorStatus = 'active' | 'pending' | 'archived';

export interface PaymentsEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PaymentsEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PaymentsEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PAYMENTS_EDITOR_ITEM_COUNT = 11;

export const PAYMENTS_EDITOR_STATUSES: ReadonlyArray<PaymentsEditorStatus> = [
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

export function buildPaymentsEditorProduct(index: number): Product {
  return {
    id: `payments-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Payments Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Payments',
    imageUrl: `https://picsum.photos/seed/payments-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPaymentsEditorItem(index: number): PaymentsEditorItem {
  const product = buildPaymentsEditorProduct(index);
  const status =
    PAYMENTS_EDITOR_STATUSES[index % PAYMENTS_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `payments-editor-${index + 1}`,
    name: `Payments Editor ${NAMES[index % NAMES.length]}`,
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

export function buildPaymentsEditorItems(
  count: number = PAYMENTS_EDITOR_ITEM_COUNT,
): PaymentsEditorItem[] {
  const items: PaymentsEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPaymentsEditorItem(i));
  }
  return items;
}

export function emptyPaymentsEditorTotals(): PaymentsEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
