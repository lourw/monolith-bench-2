export const ADDRESSES_EDITOR_ROUTE = '/features/addresses-editor';

export const ADDRESSES_EDITOR_TEST_ID = 'feature-addresses-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_EDITOR_FEATURE: FeatureMeta = {
  id: 'addresses-editor',
  title: 'Addresses Editor',
  route: ADDRESSES_EDITOR_ROUTE,
  testId: ADDRESSES_EDITOR_TEST_ID,
  domain: 'addresses',
  kind: 'editor',
  itemCount: 9,
};

export function addressesEditorItemPath(itemId: string): string {
  return `${ADDRESSES_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
