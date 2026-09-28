import type { Product } from '../../../models/product.model';

export type RecommendationsWizardStatus = 'active' | 'pending' | 'archived';

export interface RecommendationsWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: RecommendationsWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface RecommendationsWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RECOMMENDATIONS_WIZARD_ITEM_COUNT = 11;

export const RECOMMENDATIONS_WIZARD_STATUSES: ReadonlyArray<RecommendationsWizardStatus> =
  ['active', 'pending', 'archived'];

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

export function buildRecommendationsWizardProduct(index: number): Product {
  return {
    id: `recommendations-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Recommendations Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Recommendations',
    imageUrl: `https://picsum.photos/seed/recommendations-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildRecommendationsWizardItem(
  index: number,
): RecommendationsWizardItem {
  const product = buildRecommendationsWizardProduct(index);
  const status =
    RECOMMENDATIONS_WIZARD_STATUSES[
      index % RECOMMENDATIONS_WIZARD_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `recommendations-wizard-${index + 1}`,
    name: `Recommendations Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildRecommendationsWizardItems(
  count: number = RECOMMENDATIONS_WIZARD_ITEM_COUNT,
): RecommendationsWizardItem[] {
  const items: RecommendationsWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildRecommendationsWizardItem(i));
  }
  return items;
}

export function emptyRecommendationsWizardTotals(): RecommendationsWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
