export const GIFT_CARDS_HISTORY_ROUTE = '/features/gift-cards-history';

export const GIFT_CARDS_HISTORY_TEST_ID = 'feature-gift-cards-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_HISTORY_FEATURE: FeatureMeta = {
  id: 'gift-cards-history',
  title: 'Gift Cards History',
  route: GIFT_CARDS_HISTORY_ROUTE,
  testId: GIFT_CARDS_HISTORY_TEST_ID,
  domain: 'gift-cards',
  kind: 'history',
  itemCount: 7,
};

export function giftCardsHistoryItemPath(itemId: string): string {
  return `${GIFT_CARDS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
