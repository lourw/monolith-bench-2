import type { Product } from '../../../models/product.model';

export type AnalyticsSettingsStatus = 'active' | 'pending' | 'archived';

export interface AnalyticsSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: AnalyticsSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface AnalyticsSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ANALYTICS_SETTINGS_ITEM_COUNT = 8;

export const ANALYTICS_SETTINGS_STATUSES: ReadonlyArray<AnalyticsSettingsStatus> =
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

export function buildAnalyticsSettingsProduct(index: number): Product {
  return {
    id: `analytics-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Analytics Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Analytics',
    imageUrl: `https://picsum.photos/seed/analytics-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildAnalyticsSettingsItem(
  index: number,
): AnalyticsSettingsItem {
  const product = buildAnalyticsSettingsProduct(index);
  const status =
    ANALYTICS_SETTINGS_STATUSES[index % ANALYTICS_SETTINGS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `analytics-settings-${index + 1}`,
    name: `Analytics Settings ${NAMES[index % NAMES.length]}`,
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

export function buildAnalyticsSettingsItems(
  count: number = ANALYTICS_SETTINGS_ITEM_COUNT,
): AnalyticsSettingsItem[] {
  const items: AnalyticsSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildAnalyticsSettingsItem(i));
  }
  return items;
}

export function emptyAnalyticsSettingsTotals(): AnalyticsSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
