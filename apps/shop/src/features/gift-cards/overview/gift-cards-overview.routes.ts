export const GIFT_CARDS_OVERVIEW_ROUTE = '/features/gift-cards-overview';

export const GIFT_CARDS_OVERVIEW_TEST_ID = 'feature-gift-cards-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'gift-cards-overview',
  title: 'Gift Cards Overview',
  route: GIFT_CARDS_OVERVIEW_ROUTE,
  testId: GIFT_CARDS_OVERVIEW_TEST_ID,
  domain: 'gift-cards',
  kind: 'overview',
  itemCount: 6,
};

export function giftCardsOverviewItemPath(itemId: string): string {
  return `${GIFT_CARDS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
