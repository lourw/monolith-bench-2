import type { Product } from '../../../models/product.model';

export type CatalogDetailsStatus = 'active' | 'pending' | 'archived';

export interface CatalogDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_DETAILS_ITEM_COUNT = 8;

export const CATALOG_DETAILS_STATUSES: ReadonlyArray<CatalogDetailsStatus> = [
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

export function buildCatalogDetailsProduct(index: number): Product {
  return {
    id: `catalog-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogDetailsItem(index: number): CatalogDetailsItem {
  const product = buildCatalogDetailsProduct(index);
  const status =
    CATALOG_DETAILS_STATUSES[index % CATALOG_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-details-${index + 1}`,
    name: `Catalog Details ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogDetailsItems(
  count: number = CATALOG_DETAILS_ITEM_COUNT,
): CatalogDetailsItem[] {
  const items: CatalogDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogDetailsItem(i));
  }
  return items;
}

export function emptyCatalogDetailsTotals(): CatalogDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
