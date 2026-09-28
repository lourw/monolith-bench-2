import type { Product } from '../../../models/product.model';

export type CatalogWizardStatus = 'active' | 'pending' | 'archived';

export interface CatalogWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_WIZARD_ITEM_COUNT = 10;

export const CATALOG_WIZARD_STATUSES: ReadonlyArray<CatalogWizardStatus> = [
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

export function buildCatalogWizardProduct(index: number): Product {
  return {
    id: `catalog-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogWizardItem(index: number): CatalogWizardItem {
  const product = buildCatalogWizardProduct(index);
  const status =
    CATALOG_WIZARD_STATUSES[index % CATALOG_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-wizard-${index + 1}`,
    name: `Catalog Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogWizardItems(
  count: number = CATALOG_WIZARD_ITEM_COUNT,
): CatalogWizardItem[] {
  const items: CatalogWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogWizardItem(i));
  }
  return items;
}

export function emptyCatalogWizardTotals(): CatalogWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
