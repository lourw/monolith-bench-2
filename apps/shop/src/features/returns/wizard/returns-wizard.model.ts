import type { Product } from '../../../models/product.model';

export type ReturnsWizardStatus = 'active' | 'pending' | 'archived';

export interface ReturnsWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_WIZARD_ITEM_COUNT = 11;

export const RETURNS_WIZARD_STATUSES: ReadonlyArray<ReturnsWizardStatus> = [
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

export function buildReturnsWizardProduct(index: number): Product {
  return {
    id: `returns-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsWizardItem(index: number): ReturnsWizardItem {
  const product = buildReturnsWizardProduct(index);
  const status =
    RETURNS_WIZARD_STATUSES[index % RETURNS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-wizard-${index + 1}`,
    name: `Returns Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsWizardItems(
  count: number = RETURNS_WIZARD_ITEM_COUNT,
): ReturnsWizardItem[] {
  const items: ReturnsWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsWizardItem(i));
  }
  return items;
}

export function emptyReturnsWizardTotals(): ReturnsWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
