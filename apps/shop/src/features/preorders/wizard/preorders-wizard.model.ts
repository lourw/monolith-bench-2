import type { Product } from '../../../models/product.model';

export type PreordersWizardStatus = 'active' | 'pending' | 'archived';

export interface PreordersWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: PreordersWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface PreordersWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const PREORDERS_WIZARD_ITEM_COUNT = 9;

export const PREORDERS_WIZARD_STATUSES: ReadonlyArray<PreordersWizardStatus> = [
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

export function buildPreordersWizardProduct(index: number): Product {
  return {
    id: `preorders-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Preorders Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Preorders',
    imageUrl: `https://picsum.photos/seed/preorders-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildPreordersWizardItem(index: number): PreordersWizardItem {
  const product = buildPreordersWizardProduct(index);
  const status =
    PREORDERS_WIZARD_STATUSES[index % PREORDERS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `preorders-wizard-${index + 1}`,
    name: `Preorders Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildPreordersWizardItems(
  count: number = PREORDERS_WIZARD_ITEM_COUNT,
): PreordersWizardItem[] {
  const items: PreordersWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildPreordersWizardItem(i));
  }
  return items;
}

export function emptyPreordersWizardTotals(): PreordersWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
