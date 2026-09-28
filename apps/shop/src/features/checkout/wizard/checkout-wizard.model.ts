import type { Product } from '../../../models/product.model';

export type CheckoutWizardStatus = 'active' | 'pending' | 'archived';

export interface CheckoutWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CheckoutWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CheckoutWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CHECKOUT_WIZARD_ITEM_COUNT = 5;

export const CHECKOUT_WIZARD_STATUSES: ReadonlyArray<CheckoutWizardStatus> = [
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

export function buildCheckoutWizardProduct(index: number): Product {
  return {
    id: `checkout-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Checkout Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Checkout',
    imageUrl: `https://picsum.photos/seed/checkout-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCheckoutWizardItem(index: number): CheckoutWizardItem {
  const product = buildCheckoutWizardProduct(index);
  const status =
    CHECKOUT_WIZARD_STATUSES[index % CHECKOUT_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `checkout-wizard-${index + 1}`,
    name: `Checkout Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildCheckoutWizardItems(
  count: number = CHECKOUT_WIZARD_ITEM_COUNT,
): CheckoutWizardItem[] {
  const items: CheckoutWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCheckoutWizardItem(i));
  }
  return items;
}

export function emptyCheckoutWizardTotals(): CheckoutWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
