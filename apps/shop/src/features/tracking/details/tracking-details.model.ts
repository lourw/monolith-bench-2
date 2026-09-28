import type { Product } from '../../../models/product.model';

export type TrackingDetailsStatus = 'active' | 'pending' | 'archived';

export interface TrackingDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: TrackingDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface TrackingDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const TRACKING_DETAILS_ITEM_COUNT = 12;

export const TRACKING_DETAILS_STATUSES: ReadonlyArray<TrackingDetailsStatus> = [
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

export function buildTrackingDetailsProduct(index: number): Product {
  return {
    id: `tracking-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Tracking Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Tracking',
    imageUrl: `https://picsum.photos/seed/tracking-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildTrackingDetailsItem(index: number): TrackingDetailsItem {
  const product = buildTrackingDetailsProduct(index);
  const status =
    TRACKING_DETAILS_STATUSES[index % TRACKING_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `tracking-details-${index + 1}`,
    name: `Tracking Details ${NAMES[index % NAMES.length]}`,
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

export function buildTrackingDetailsItems(
  count: number = TRACKING_DETAILS_ITEM_COUNT,
): TrackingDetailsItem[] {
  const items: TrackingDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildTrackingDetailsItem(i));
  }
  return items;
}

export function emptyTrackingDetailsTotals(): TrackingDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
