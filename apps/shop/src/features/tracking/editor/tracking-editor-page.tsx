import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingEditorFilters } from './tracking-editor-filters';
import { TrackingEditorHeader } from './tracking-editor-header';
import { TrackingEditorPanel } from './tracking-editor-panel';
import { TrackingEditorTable } from './tracking-editor-table';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';
import { useTrackingEditor } from './use-tracking-editor';

export function TrackingEditorPage() {
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
  } = useTrackingEditor();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_EDITOR_FEATURE.testId}
    >
      <TrackingEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingEditorPage;
