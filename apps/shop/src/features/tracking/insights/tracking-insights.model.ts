import type { Product } from '../../../models/product.model';

export type TrackingInsightsStatus = 'active' | 'pending' | 'archived';

export interface TrackingInsightsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: TrackingInsightsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface TrackingInsightsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const TRACKING_INSIGHTS_ITEM_COUNT = 8;

export const TRACKING_INSIGHTS_STATUSES: ReadonlyArray<TrackingInsightsStatus> =
  ['active', 'pending', 'archived'];

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

export function buildTrackingInsightsProduct(index: number): Product {
  return {
    id: `tracking-insights-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Tracking Insights product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Tracking',
    imageUrl: `https://picsum.photos/seed/tracking-insights-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildTrackingInsightsItem(index: number): TrackingInsightsItem {
  const product = buildTrackingInsightsProduct(index);
  const status =
    TRACKING_INSIGHTS_STATUSES[index % TRACKING_INSIGHTS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `tracking-insights-${index + 1}`,
    name: `Tracking Insights ${NAMES[index % NAMES.length]}`,
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

export function buildTrackingInsightsItems(
  count: number = TRACKING_INSIGHTS_ITEM_COUNT,
): TrackingInsightsItem[] {
  const items: TrackingInsightsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildTrackingInsightsItem(i));
  }
  return items;
}

export function emptyTrackingInsightsTotals(): TrackingInsightsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
