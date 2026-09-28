import type { Product } from '../../../models/product.model';

export type ShippingDetailsStatus = 'active' | 'pending' | 'archived';

export interface ShippingDetailsItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ShippingDetailsStatus;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ShippingDetailsTotals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const SHIPPING_DETAILS_ITEM_COUNT = 6;

export const SHIPPING_DETAILS_STATUSES: ReadonlyArray<ShippingDetailsStatus> = [
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

export function buildShippingDetailsProduct(index: number): Product {
  return {
    id: `shipping-details-p${index}`,
    name: `${NAMES[index % NAMES.length]} ${index + 1}`,
    description: `Shipping Details product number ${index + 1}`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: 'Shipping',
    imageUrl: `https://picsum.photos/seed/shipping-details-${index}/300/200`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function buildShippingDetailsItem(index: number): ShippingDetailsItem {
  const product = buildShippingDetailsProduct(index);
  const status =
    SHIPPING_DETAILS_STATUSES[index % SHIPPING_DETAILS_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: `shipping-details-${index + 1}`,
    name: `Shipping Details ${NAMES[index % NAMES.length]}`,
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

export function buildShippingDetailsItems(
  count: number = SHIPPING_DETAILS_ITEM_COUNT,
): ShippingDetailsItem[] {
  const items: ShippingDetailsItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(buildShippingDetailsItem(i));
  }
  return items;
}

export function emptyShippingDetailsTotals(): ShippingDetailsTotals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
