import type { Product } from '../../../models/product.model';

export type NotificationsEditorStatus = 'active' | 'pending' | 'archived';

export interface NotificationsEditorItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: NotificationsEditorStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface NotificationsEditorTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const NOTIFICATIONS_EDITOR_ITEM_COUNT = 6;

export const NOTIFICATIONS_EDITOR_STATUSES: ReadonlyArray<NotificationsEditorStatus> =
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

export function buildNotificationsEditorProduct(index: number): Product {
  return {
    id: `notifications-editor-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Notifications Editor product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Notifications',
    imageUrl: `https://picsum.photos/seed/notifications-editor-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildNotificationsEditorItem(
  index: number,
): NotificationsEditorItem {
  const product = buildNotificationsEditorProduct(index);
  const status =
    NOTIFICATIONS_EDITOR_STATUSES[index % NOTIFICATIONS_EDITOR_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `notifications-editor-${index + 1}`,
    name: `Notifications Editor ${NAMES[index % NAMES.length]}`,
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

export function buildNotificationsEditorItems(
  count: number = NOTIFICATIONS_EDITOR_ITEM_COUNT,
): NotificationsEditorItem[] {
  const items: NotificationsEditorItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildNotificationsEditorItem(i));
  }
  return items;
}

export function emptyNotificationsEditorTotals(): NotificationsEditorTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
