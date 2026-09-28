import type { Product } from '../../../models/product.model';

export type CatalogEditorStatus = 'active' | 'pending' | 'archived';

export interface CatalogEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: CatalogEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface CatalogEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const CATALOG_EDITOR_ITEM_COUNT = 7;

export const CATALOG_EDITOR_STATUSES: ReadonlyArray<CatalogEditorStatus> = [
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

export function buildCatalogEditorProduct(index: number): Product {
  return {
    id: `catalog-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Catalog Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Catalog',
    imageUrl: `https://picsum.photos/seed/catalog-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildCatalogEditorItem(index: number): CatalogEditorItem {
  const product = buildCatalogEditorProduct(index);
  const status =
    CATALOG_EDITOR_STATUSES[index % CATALOG_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `catalog-editor-${index + 1}`,
    name: `Catalog Editor ${NAMES[index % NAMES.length]}`,
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

export function buildCatalogEditorItems(
  count: number = CATALOG_EDITOR_ITEM_COUNT,
): CatalogEditorItem[] {
  const items: CatalogEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildCatalogEditorItem(i));
  }
  return items;
}

export function emptyCatalogEditorTotals(): CatalogEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
