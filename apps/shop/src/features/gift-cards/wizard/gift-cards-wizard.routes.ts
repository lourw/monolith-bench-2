export const GIFT_CARDS_WIZARD_ROUTE = '/features/gift-cards-wizard';

export const GIFT_CARDS_WIZARD_TEST_ID = 'feature-gift-cards-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_WIZARD_FEATURE: FeatureMeta = {
  id: 'gift-cards-wizard',
  title: 'Gift Cards Wizard',
  route: GIFT_CARDS_WIZARD_ROUTE,
  testId: GIFT_CARDS_WIZARD_TEST_ID,
  domain: 'gift-cards',
  kind: 'wizard',
  itemCount: 5,
};

export function giftCardsWizardItemPath(itemId: string): string {
  return `${GIFT_CARDS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
