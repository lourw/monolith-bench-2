import type { Product } from '../../../models/product.model';

export type NotificationsSettingsStatus = 'active' | 'pending' | 'archived';

export interface NotificationsSettingsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: NotificationsSettingsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface NotificationsSettingsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const NOTIFICATIONS_SETTINGS_ITEM_COUNT = 11;

export const NOTIFICATIONS_SETTINGS_STATUSES: ReadonlyArray<NotificationsSettingsStatus> =
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

export function buildNotificationsSettingsProduct(index: number): Product {
  return {
    id: `notifications-settings-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Notifications Settings product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Notifications',
    imageUrl: `https://picsum.photos/seed/notifications-settings-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildNotificationsSettingsItem(
  index: number,
): NotificationsSettingsItem {
  const product = buildNotificationsSettingsProduct(index);
  const status =
    NOTIFICATIONS_SETTINGS_STATUSES[
      index % NOTIFICATIONS_SETTINGS_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `notifications-settings-${index + 1}`,
    name: `Notifications Settings ${NAMES[index % NAMES.length]}`,
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

export function buildNotificationsSettingsItems(
  count: number = NOTIFICATIONS_SETTINGS_ITEM_COUNT,
): NotificationsSettingsItem[] {
  const items: NotificationsSettingsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildNotificationsSettingsItem(i));
  }
  return items;
}

export function emptyNotificationsSettingsTotals(): NotificationsSettingsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
