import type { Product } from '../../../models/product.model';

export type NotificationsWizardStatus = 'active' | 'pending' | 'archived';

export interface NotificationsWizardItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: NotificationsWizardStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface NotificationsWizardTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const NOTIFICATIONS_WIZARD_ITEM_COUNT = 10;

export const NOTIFICATIONS_WIZARD_STATUSES: ReadonlyArray<NotificationsWizardStatus> =
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

export function buildNotificationsWizardProduct(index: number): Product {
  return {
    id: `notifications-wizard-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Notifications Wizard product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Notifications',
    imageUrl: `https://picsum.photos/seed/notifications-wizard-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildNotificationsWizardItem(
  index: number,
): NotificationsWizardItem {
  const product = buildNotificationsWizardProduct(index);
  const status =
    NOTIFICATIONS_WIZARD_STATUSES[index % NOTIFICATIONS_WIZARD_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `notifications-wizard-${index + 1}`,
    name: `Notifications Wizard ${NAMES[index % NAMES.length]}`,
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

export function buildNotificationsWizardItems(
  count: number = NOTIFICATIONS_WIZARD_ITEM_COUNT,
): NotificationsWizardItem[] {
  const items: NotificationsWizardItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildNotificationsWizardItem(i));
  }
  return items;
}

export function emptyNotificationsWizardTotals(): NotificationsWizardTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
