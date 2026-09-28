import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistDetailsSummary } from '../../wishlist/details/wishlist-details-summary';
import { PreordersEditorFilters } from './preorders-editor-filters';
import { PreordersEditorHeader } from './preorders-editor-header';
import { PreordersEditorPanel } from './preorders-editor-panel';
import { PreordersEditorTable } from './preorders-editor-table';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';
import { usePreordersEditor } from './use-preorders-editor';

export function PreordersEditorPage() {
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
  } = usePreordersEditor();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_EDITOR_FEATURE.testId}
    >
      <PreordersEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PreordersEditorPage;
