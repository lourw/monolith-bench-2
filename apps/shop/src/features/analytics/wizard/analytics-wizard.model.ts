import type { Product } from '../../../models/product.model';

export type AnalyticsWizardStatus = 'active' | 'pending' | 'archived';

export interface AnalyticsWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AnalyticsWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AnalyticsWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ANALYTICS_WIZARD_ITEM_COUNT = 8;

export const ANALYTICS_WIZARD_STATUSES: ReadonlyArray<AnalyticsWizardStatus> = [
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

export function buildAnalyticsWizardProduct(index: number): Product {
  return {
    id: `analytics-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Analytics Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Analytics',
    imageUrl: `https://picsum.photos/seed/analytics-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAnalyticsWizardItem(index: number): AnalyticsWizardItem {
  const product = buildAnalyticsWizardProduct(index);
  const status =
    ANALYTICS_WIZARD_STATUSES[index % ANALYTICS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `analytics-wizard-${index + 1}`,
    name: `Analytics Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildAnalyticsWizardItems(
  count: number = ANALYTICS_WIZARD_ITEM_COUNT,
): AnalyticsWizardItem[] {
  const items: AnalyticsWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAnalyticsWizardItem(i));
  }
  return items;
}

export function emptyAnalyticsWizardTotals(): AnalyticsWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
