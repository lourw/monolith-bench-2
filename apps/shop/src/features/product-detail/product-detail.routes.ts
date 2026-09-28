export const PRODUCT_DETAIL_ROUTE = '/products/:id';

export function productDetailPath(productId: string): string {
  return `/products/${encodeURIComponent(productId)}`;
}
