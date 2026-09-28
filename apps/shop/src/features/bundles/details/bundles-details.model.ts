import type { Product } from '../../../models/product.model';

export type BundlesDetailsStatus = 'active' | 'pending' | 'archived';

export interface BundlesDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: BundlesDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface BundlesDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const BUNDLES_DETAILS_ITEM_COUNT = 7;

export const BUNDLES_DETAILS_STATUSES: ReadonlyArray<BundlesDetailsStatus> = [
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

export function buildBundlesDetailsProduct(index: number): Product {
  return {
    id: `bundles-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Bundles Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Bundles',
    imageUrl: `https://picsum.photos/seed/bundles-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildBundlesDetailsItem(index: number): BundlesDetailsItem {
  const product = buildBundlesDetailsProduct(index);
  const status =
    BUNDLES_DETAILS_STATUSES[index % BUNDLES_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `bundles-details-${index + 1}`,
    name: `Bundles Details ${NAMES[index % NAMES.length]}`,
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

export function buildBundlesDetailsItems(
  count: number = BUNDLES_DETAILS_ITEM_COUNT,
): BundlesDetailsItem[] {
  const items: BundlesDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildBundlesDetailsItem(i));
  }
  return items;
}

export function emptyBundlesDetailsTotals(): BundlesDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
