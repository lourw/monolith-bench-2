import type { Product } from '../../../models/product.model';

export type NotificationsDetailsStatus = 'active' | 'pending' | 'archived';

export interface NotificationsDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: NotificationsDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface NotificationsDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const NOTIFICATIONS_DETAILS_ITEM_COUNT = 10;

export const NOTIFICATIONS_DETAILS_STATUSES: ReadonlyArray<NotificationsDetailsStatus> =
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

export function buildNotificationsDetailsProduct(index: number): Product {
  return {
    id: `notifications-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Notifications Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Notifications',
    imageUrl: `https://picsum.photos/seed/notifications-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildNotificationsDetailsItem(
  index: number,
): NotificationsDetailsItem {
  const product = buildNotificationsDetailsProduct(index);
  const status =
    NOTIFICATIONS_DETAILS_STATUSES[
      index % NOTIFICATIONS_DETAILS_STATUSES.length
    ];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `notifications-details-${index + 1}`,
    name: `Notifications Details ${NAMES[index % NAMES.length]}`,
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

export function buildNotificationsDetailsItems(
  count: number = NOTIFICATIONS_DETAILS_ITEM_COUNT,
): NotificationsDetailsItem[] {
  const items: NotificationsDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildNotificationsDetailsItem(i));
  }
  return items;
}

export function emptyNotificationsDetailsTotals(): NotificationsDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
