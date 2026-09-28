export const GIFT_CARDS_DETAILS_ROUTE = '/features/gift-cards-details';

export const GIFT_CARDS_DETAILS_TEST_ID = 'feature-gift-cards-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_DETAILS_FEATURE: FeatureMeta = {
  id: 'gift-cards-details',
  title: 'Gift Cards Details',
  route: GIFT_CARDS_DETAILS_ROUTE,
  testId: GIFT_CARDS_DETAILS_TEST_ID,
  domain: 'gift-cards',
  kind: 'details',
  itemCount: 9,
};

export function giftCardsDetailsItemPath(itemId: string): string {
  return `${GIFT_CARDS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
