export const GIFT_CARDS_SUMMARY_ROUTE = '/features/gift-cards-summary';

export const GIFT_CARDS_SUMMARY_TEST_ID = 'feature-gift-cards-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'gift-cards-summary',
  title: 'Gift Cards Summary',
  route: GIFT_CARDS_SUMMARY_ROUTE,
  testId: GIFT_CARDS_SUMMARY_TEST_ID,
  domain: 'gift-cards',
  kind: 'summary',
  itemCount: 5,
};

export function giftCardsSummaryItemPath(itemId: string): string {
  return `${GIFT_CARDS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
