export const GIFT_CARDS_INSIGHTS_ROUTE = '/features/gift-cards-insights';

export const GIFT_CARDS_INSIGHTS_TEST_ID = 'feature-gift-cards-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'gift-cards-insights',
  title: 'Gift Cards Insights',
  route: GIFT_CARDS_INSIGHTS_ROUTE,
  testId: GIFT_CARDS_INSIGHTS_TEST_ID,
  domain: 'gift-cards',
  kind: 'insights',
  itemCount: 9,
};

export function giftCardsInsightsItemPath(itemId: string): string {
  return `${GIFT_CARDS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
