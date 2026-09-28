import type { Product } from '../../../models/product.model';

export type PaymentsWizardStatus = 'active' | 'pending' | 'archived';

export interface PaymentsWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PaymentsWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PaymentsWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PAYMENTS_WIZARD_ITEM_COUNT = 7;

export const PAYMENTS_WIZARD_STATUSES: ReadonlyArray<PaymentsWizardStatus> = [
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

export function buildPaymentsWizardProduct(index: number): Product {
  return {
    id: `payments-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Payments Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Payments',
    imageUrl: `https://picsum.photos/seed/payments-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPaymentsWizardItem(index: number): PaymentsWizardItem {
  const product = buildPaymentsWizardProduct(index);
  const status =
    PAYMENTS_WIZARD_STATUSES[index % PAYMENTS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `payments-wizard-${index + 1}`,
    name: `Payments Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildPaymentsWizardItems(
  count: number = PAYMENTS_WIZARD_ITEM_COUNT,
): PaymentsWizardItem[] {
  const items: PaymentsWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPaymentsWizardItem(i));
  }
  return items;
}

export function emptyPaymentsWizardTotals(): PaymentsWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
