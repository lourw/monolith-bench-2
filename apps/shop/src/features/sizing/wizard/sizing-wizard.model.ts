import type { Product } from '../../../models/product.model';

export type SizingWizardStatus = 'active' | 'pending' | 'archived';

export interface SizingWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_WIZARD_ITEM_COUNT = 12;

export const SIZING_WIZARD_STATUSES: ReadonlyArray<SizingWizardStatus> = [
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

export function buildSizingWizardProduct(index: number): Product {
  return {
    id: `sizing-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingWizardItem(index: number): SizingWizardItem {
  const product = buildSizingWizardProduct(index);
  const status = SIZING_WIZARD_STATUSES[index % SIZING_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-wizard-${index + 1}`,
    name: `Sizing Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildSizingWizardItems(
  count: number = SIZING_WIZARD_ITEM_COUNT,
): SizingWizardItem[] {
  const items: SizingWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingWizardItem(i));
  }
  return items;
}

export function emptySizingWizardTotals(): SizingWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
