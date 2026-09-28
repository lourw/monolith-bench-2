import type { Product } from '../../../models/product.model';

export type SizingSettingsStatus = 'active' | 'pending' | 'archived';

export interface SizingSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: SizingSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface SizingSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SIZING_SETTINGS_ITEM_COUNT = 10;

export const SIZING_SETTINGS_STATUSES: ReadonlyArray<SizingSettingsStatus> = [
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

export function buildSizingSettingsProduct(index: number): Product {
  return {
    id: `sizing-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Sizing Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Sizing',
    imageUrl: `https://picsum.photos/seed/sizing-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildSizingSettingsItem(index: number): SizingSettingsItem {
  const product = buildSizingSettingsProduct(index);
  const status =
    SIZING_SETTINGS_STATUSES[index % SIZING_SETTINGS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `sizing-settings-${index + 1}`,
    name: `Sizing Settings ${NAMES[index % NAMES.length]}`,
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

export function buildSizingSettingsItems(
  count: number = SIZING_SETTINGS_ITEM_COUNT,
): SizingSettingsItem[] {
  const items: SizingSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildSizingSettingsItem(i));
  }
  return items;
}

export function emptySizingSettingsTotals(): SizingSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
