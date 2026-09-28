export const WISHLIST_WIZARD_ROUTE = '/features/wishlist-wizard';

export const WISHLIST_WIZARD_TEST_ID = 'feature-wishlist-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const WISHLIST_WIZARD_FEATURE: FeatureMeta = {
  id: 'wishlist-wizard',
  title: 'Wishlist Wizard',
  route: WISHLIST_WIZARD_ROUTE,
  testId: WISHLIST_WIZARD_TEST_ID,
  domain: 'wishlist',
  kind: 'wizard',
  itemCount: 7,
};

export function wishlistWizardItemPath(itemId: string): string {
  return `${WISHLIST_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
