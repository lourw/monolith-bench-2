import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsEditorFilters } from './promotions-editor-filters';
import { PromotionsEditorHeader } from './promotions-editor-header';
import { PromotionsEditorPanel } from './promotions-editor-panel';
import { PromotionsEditorTable } from './promotions-editor-table';
import { PROMOTIONS_EDITOR_FEATURE } from './promotions-editor.routes';
import { usePromotionsEditor } from './use-promotions-editor';

export function PromotionsEditorPage() {
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
  } = usePromotionsEditor();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_EDITOR_FEATURE.testId}
    >
      <PromotionsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsEditorPage;
