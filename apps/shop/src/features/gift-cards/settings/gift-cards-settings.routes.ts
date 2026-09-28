export const GIFT_CARDS_SETTINGS_ROUTE = '/features/gift-cards-settings';

export const GIFT_CARDS_SETTINGS_TEST_ID = 'feature-gift-cards-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'gift-cards-settings',
  title: 'Gift Cards Settings',
  route: GIFT_CARDS_SETTINGS_ROUTE,
  testId: GIFT_CARDS_SETTINGS_TEST_ID,
  domain: 'gift-cards',
  kind: 'settings',
  itemCount: 8,
};

export function giftCardsSettingsItemPath(itemId: string): string {
  return `${GIFT_CARDS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
