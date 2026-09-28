import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsEditorFilters } from './analytics-editor-filters';
import { AnalyticsEditorHeader } from './analytics-editor-header';
import { AnalyticsEditorPanel } from './analytics-editor-panel';
import { AnalyticsEditorTable } from './analytics-editor-table';
import { ANALYTICS_EDITOR_FEATURE } from './analytics-editor.routes';
import { useAnalyticsEditor } from './use-analytics-editor';

export function AnalyticsEditorPage() {
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
  } = useAnalyticsEditor();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_EDITOR_FEATURE.testId}
    >
      <AnalyticsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsEditorPage;
