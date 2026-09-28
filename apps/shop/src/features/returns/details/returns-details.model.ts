import type { Product } from '../../../models/product.model';

export type ReturnsDetailsStatus = 'active' | 'pending' | 'archived';

export interface ReturnsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ReturnsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ReturnsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const RETURNS_DETAILS_ITEM_COUNT = 5;

export const RETURNS_DETAILS_STATUSES: ReadonlyArray<ReturnsDetailsStatus> = [
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

export function buildReturnsDetailsProduct(index: number): Product {
  return {
    id: `returns-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Returns Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Returns',
    imageUrl: `https://picsum.photos/seed/returns-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildReturnsDetailsItem(index: number): ReturnsDetailsItem {
  const product = buildReturnsDetailsProduct(index);
  const status =
    RETURNS_DETAILS_STATUSES[index % RETURNS_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `returns-details-${index + 1}`,
    name: `Returns Details ${NAMES[index % NAMES.length]}`,
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

export function buildReturnsDetailsItems(
  count: number = RETURNS_DETAILS_ITEM_COUNT,
): ReturnsDetailsItem[] {
  const items: ReturnsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildReturnsDetailsItem(i));
  }
  return items;
}

export function emptyReturnsDetailsTotals(): ReturnsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
