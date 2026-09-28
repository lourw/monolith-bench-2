import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsEditorFilters } from './recommendations-editor-filters';
import { RecommendationsEditorHeader } from './recommendations-editor-header';
import { RecommendationsEditorPanel } from './recommendations-editor-panel';
import { RecommendationsEditorTable } from './recommendations-editor-table';
import { RECOMMENDATIONS_EDITOR_FEATURE } from './recommendations-editor.routes';
import { useRecommendationsEditor } from './use-recommendations-editor';

export function RecommendationsEditorPage() {
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
  } = useRecommendationsEditor();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_EDITOR_FEATURE.testId}
    >
      <RecommendationsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsEditorPage;
