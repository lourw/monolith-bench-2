export const GIFT_CARDS_EDITOR_ROUTE = '/features/gift-cards-editor';

export const GIFT_CARDS_EDITOR_TEST_ID = 'feature-gift-cards-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const GIFT_CARDS_EDITOR_FEATURE: FeatureMeta = {
  id: 'gift-cards-editor',
  title: 'Gift Cards Editor',
  route: GIFT_CARDS_EDITOR_ROUTE,
  testId: GIFT_CARDS_EDITOR_TEST_ID,
  domain: 'gift-cards',
  kind: 'editor',
  itemCount: 7,
};

export function giftCardsEditorItemPath(itemId: string): string {
  return `${GIFT_CARDS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
