export const GIFT_CARDS_LIST_ROUTE = '/features/gift-cards-list';

export const GIFT_CARDS_LIST_TEST_ID = 'feature-gift-cards-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_LIST_FEATURE: FeatureMeta = {
  id: 'gift-cards-list',
  title: 'Gift Cards List',
  route: GIFT_CARDS_LIST_ROUTE,
  testId: GIFT_CARDS_LIST_TEST_ID,
  domain: 'gift-cards',
  kind: 'list',
  itemCount: 7,
};

export function giftCardsListItemPath(itemId: string): string {
  return `${GIFT_CARDS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
