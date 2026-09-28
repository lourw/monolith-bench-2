import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackEditorFilters } from './feedback-editor-filters';
import { FeedbackEditorHeader } from './feedback-editor-header';
import { FeedbackEditorPanel } from './feedback-editor-panel';
import { FeedbackEditorTable } from './feedback-editor-table';
import { FEEDBACK_EDITOR_FEATURE } from './feedback-editor.routes';
import { useFeedbackEditor } from './use-feedback-editor';

export function FeedbackEditorPage() {
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
  } = useFeedbackEditor();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_EDITOR_FEATURE.testId}
    >
      <FeedbackEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackEditorPage;
