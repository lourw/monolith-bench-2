import type { Product } from '../../../models/product.model';

export type TrackingHistoryStatus = 'active' | 'pending' | 'archived';

export interface TrackingHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: TrackingHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface TrackingHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const TRACKING_HISTORY_ITEM_COUNT = 10;

export const TRACKING_HISTORY_STATUSES: ReadonlyArray<TrackingHistoryStatus> = [
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

export function buildTrackingHistoryProduct(index: number): Product {
  return {
    id: `tracking-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Tracking History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Tracking',
    imageUrl: `https://picsum.photos/seed/tracking-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildTrackingHistoryItem(index: number): TrackingHistoryItem {
  const product = buildTrackingHistoryProduct(index);
  const status =
    TRACKING_HISTORY_STATUSES[index % TRACKING_HISTORY_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `tracking-history-${index + 1}`,
    name: `Tracking History ${NAMES[index % NAMES.length]}`,
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

export function buildTrackingHistoryItems(
  count: number = TRACKING_HISTORY_ITEM_COUNT,
): TrackingHistoryItem[] {
  const items: TrackingHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildTrackingHistoryItem(i));
  }
  return items;
}

export function emptyTrackingHistoryTotals(): TrackingHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
