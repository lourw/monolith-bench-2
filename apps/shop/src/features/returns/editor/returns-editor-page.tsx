import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsEditorFilters } from './returns-editor-filters';
import { ReturnsEditorHeader } from './returns-editor-header';
import { ReturnsEditorPanel } from './returns-editor-panel';
import { ReturnsEditorTable } from './returns-editor-table';
import { RETURNS_EDITOR_FEATURE } from './returns-editor.routes';
import { useReturnsEditor } from './use-returns-editor';

export function ReturnsEditorPage() {
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
  } = useReturnsEditor();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_EDITOR_FEATURE.testId}
    >
      <ReturnsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnsEditorPage;
