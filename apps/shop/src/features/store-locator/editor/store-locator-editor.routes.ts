export const STORE_LOCATOR_EDITOR_ROUTE = '/features/store-locator-editor';

export const STORE_LOCATOR_EDITOR_TEST_ID = 'feature-store-locator-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_EDITOR_FEATURE: FeatureMeta = {
  id: 'store-locator-editor',
  title: 'Store Locator Editor',
  route: STORE_LOCATOR_EDITOR_ROUTE,
  testId: STORE_LOCATOR_EDITOR_TEST_ID,
  domain: 'store-locator',
  kind: 'editor',
  itemCount: 8,
};

export function storeLocatorEditorItemPath(itemId: string): string {
  return `${STORE_LOCATOR_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
