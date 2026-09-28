import type { Product } from '../../../models/product.model';

export type CatalogSummaryStatus = 'active' | 'pending' | 'archived';

export interface CatalogSummaryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogSummaryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogSummaryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_SUMMARY_ITEM_COUNT = 10;

export const CATALOG_SUMMARY_STATUSES: ReadonlyArray<CatalogSummaryStatus> = [
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

export function buildCatalogSummaryProduct(index: number): Product {
  return {
    id: `catalog-summary-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog Summary product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-summary-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogSummaryItem(index: number): CatalogSummaryItem {
  const product = buildCatalogSummaryProduct(index);
  const status =
    CATALOG_SUMMARY_STATUSES[index % CATALOG_SUMMARY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-summary-${index + 1}`,
    name: `Catalog Summary ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogSummaryItems(
  count: number = CATALOG_SUMMARY_ITEM_COUNT,
): CatalogSummaryItem[] {
  const items: CatalogSummaryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogSummaryItem(i));
  }
  return items;
}

export function emptyCatalogSummaryTotals(): CatalogSummaryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
