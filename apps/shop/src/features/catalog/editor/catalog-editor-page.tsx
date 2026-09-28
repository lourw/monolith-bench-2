import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareDetailsSummary } from '../../compare/details/compare-details-summary';
import { CatalogEditorFilters } from './catalog-editor-filters';
import { CatalogEditorHeader } from './catalog-editor-header';
import { CatalogEditorPanel } from './catalog-editor-panel';
import { CatalogEditorTable } from './catalog-editor-table';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';
import { useCatalogEditor } from './use-catalog-editor';

export function CatalogEditorPage() {
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
  } = useCatalogEditor();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_EDITOR_FEATURE.testId}
    >
      <CatalogEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CompareDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CatalogEditorPage;
