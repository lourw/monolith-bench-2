import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareEditorFilters } from './compare-editor-filters';
import { CompareEditorHeader } from './compare-editor-header';
import { CompareEditorPanel } from './compare-editor-panel';
import { CompareEditorTable } from './compare-editor-table';
import { COMPARE_EDITOR_FEATURE } from './compare-editor.routes';
import { useCompareEditor } from './use-compare-editor';

export function CompareEditorPage() {
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
  } = useCompareEditor();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_EDITOR_FEATURE.testId}
    >
      <CompareEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareEditorPage;
