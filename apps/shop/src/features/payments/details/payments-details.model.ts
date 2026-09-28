import type { Product } from '../../../models/product.model';

export type PaymentsDetailsStatus = 'active' | 'pending' | 'archived';

export interface PaymentsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PaymentsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PaymentsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PAYMENTS_DETAILS_ITEM_COUNT = 7;

export const PAYMENTS_DETAILS_STATUSES: ReadonlyArray<PaymentsDetailsStatus> = [
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

export function buildPaymentsDetailsProduct(index: number): Product {
  return {
    id: `payments-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Payments Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Payments',
    imageUrl: `https://picsum.photos/seed/payments-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPaymentsDetailsItem(index: number): PaymentsDetailsItem {
  const product = buildPaymentsDetailsProduct(index);
  const status =
    PAYMENTS_DETAILS_STATUSES[index % PAYMENTS_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `payments-details-${index + 1}`,
    name: `Payments Details ${NAMES[index % NAMES.length]}`,
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

export function buildPaymentsDetailsItems(
  count: number = PAYMENTS_DETAILS_ITEM_COUNT,
): PaymentsDetailsItem[] {
  const items: PaymentsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPaymentsDetailsItem(i));
  }
  return items;
}

export function emptyPaymentsDetailsTotals(): PaymentsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
