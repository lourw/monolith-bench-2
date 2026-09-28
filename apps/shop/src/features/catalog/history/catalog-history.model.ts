import type { Product } from '../../../models/product.model';

export type CatalogHistoryStatus = 'active' | 'pending' | 'archived';

export interface CatalogHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_HISTORY_ITEM_COUNT = 7;

export const CATALOG_HISTORY_STATUSES: ReadonlyArray<CatalogHistoryStatus> = [
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

export function buildCatalogHistoryProduct(index: number): Product {
  return {
    id: `catalog-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogHistoryItem(index: number): CatalogHistoryItem {
  const product = buildCatalogHistoryProduct(index);
  const status =
    CATALOG_HISTORY_STATUSES[index % CATALOG_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-history-${index + 1}`,
    name: `Catalog History ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogHistoryItems(
  count: number = CATALOG_HISTORY_ITEM_COUNT,
): CatalogHistoryItem[] {
  const items: CatalogHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogHistoryItem(i));
  }
  return items;
}

export function emptyCatalogHistoryTotals(): CatalogHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
