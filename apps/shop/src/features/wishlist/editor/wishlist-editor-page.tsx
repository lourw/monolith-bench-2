import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistEditorFilters } from './wishlist-editor-filters';
import { WishlistEditorHeader } from './wishlist-editor-header';
import { WishlistEditorPanel } from './wishlist-editor-panel';
import { WishlistEditorTable } from './wishlist-editor-table';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';
import { useWishlistEditor } from './use-wishlist-editor';

export function WishlistEditorPage() {
  const {
    items,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  } = useWishlistEditor();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_EDITOR_FEATURE.testId}
    >
      <WishlistEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistEditorPage;
