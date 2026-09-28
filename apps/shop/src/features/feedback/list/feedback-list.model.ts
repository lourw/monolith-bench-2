import type { Product } from '../../../models/product.model';

export type FeedbackListStatus = 'active' | 'pending' | 'archived';

export interface FeedbackListItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: FeedbackListStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface FeedbackListTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const FEEDBACK_LIST_ITEM_COUNT = 8;

export const FEEDBACK_LIST_STATUSES: ReadonlyArray<FeedbackListStatus> = [
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

export function buildFeedbackListProduct(index: number): Product {
  return {
    id: `feedback-list-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Feedback List product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Feedback',
    imageUrl: `https://picsum.photos/seed/feedback-list-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildFeedbackListItem(index: number): FeedbackListItem {
  const product = buildFeedbackListProduct(index);
  const status = FEEDBACK_LIST_STATUSES[index % FEEDBACK_LIST_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `feedback-list-${index + 1}`,
    name: `Feedback List ${NAMES[index % NAMES.length]}`,
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

export function buildFeedbackListItems(
  count: number = FEEDBACK_LIST_ITEM_COUNT,
): FeedbackListItem[] {
  const items: FeedbackListItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildFeedbackListItem(i));
  }
  return items;
}

export function emptyFeedbackListTotals(): FeedbackListTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
