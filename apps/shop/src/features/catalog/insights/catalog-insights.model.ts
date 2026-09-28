import type { Product } from '../../../models/product.model';

export type CatalogInsightsStatus = 'active' | 'pending' | 'archived';

export interface CatalogInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_INSIGHTS_ITEM_COUNT = 5;

export const CATALOG_INSIGHTS_STATUSES: ReadonlyArray<CatalogInsightsStatus> = [
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

export function buildCatalogInsightsProduct(index: number): Product {
  return {
    id: `catalog-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogInsightsItem(index: number): CatalogInsightsItem {
  const product = buildCatalogInsightsProduct(index);
  const status =
    CATALOG_INSIGHTS_STATUSES[index % CATALOG_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-insights-${index + 1}`,
    name: `Catalog Insights ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogInsightsItems(
  count: number = CATALOG_INSIGHTS_ITEM_COUNT,
): CatalogInsightsItem[] {
  const items: CatalogInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogInsightsItem(i));
  }
  return items;
}

export function emptyCatalogInsightsTotals(): CatalogInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
