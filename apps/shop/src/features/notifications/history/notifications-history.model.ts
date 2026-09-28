import type { Product } from '../../../models/product.model';

export type NotificationsHistoryStatus = 'active' | 'pending' | 'archived';

export interface NotificationsHistoryItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: NotificationsHistoryStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface NotificationsHistoryTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const NOTIFICATIONS_HISTORY_ITEM_COUNT = 9;

export const NOTIFICATIONS_HISTORY_STATUSES: ReadonlyArray<NotificationsHistoryStatus> =
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

export function buildNotificationsHistoryProduct(index: number): Product {
  return {
    id: `notifications-history-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Notifications History product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Notifications',
    imageUrl: `https://picsum.photos/seed/notifications-history-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildNotificationsHistoryItem(
  index: number,
): NotificationsHistoryItem {
  const product = buildNotificationsHistoryProduct(index);
  const status =
    NOTIFICATIONS_HISTORY_STATUSES[
      index % NOTIFICATIONS_HISTORY_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `notifications-history-${index + 1}`,
    name: `Notifications History ${NAMES[index % NAMES.length]}`,
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

export function buildNotificationsHistoryItems(
  count: number = NOTIFICATIONS_HISTORY_ITEM_COUNT,
): NotificationsHistoryItem[] {
  const items: NotificationsHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildNotificationsHistoryItem(i));
  }
  return items;
}

export function emptyNotificationsHistoryTotals(): NotificationsHistoryTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
