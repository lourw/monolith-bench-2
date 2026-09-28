export const GIFT_CARDS_DASHBOARD_ROUTE = '/features/gift-cards-dashboard';

export const GIFT_CARDS_DASHBOARD_TEST_ID = 'feature-gift-cards-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'gift-cards-dashboard',
  title: 'Gift Cards Dashboard',
  route: GIFT_CARDS_DASHBOARD_ROUTE,
  testId: GIFT_CARDS_DASHBOARD_TEST_ID,
  domain: 'gift-cards',
  kind: 'dashboard',
  itemCount: 9,
};

export function giftCardsDashboardItemPath(itemId: string): string {
  return `${GIFT_CARDS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
