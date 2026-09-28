import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackSummaryFilters } from './feedback-summary-filters';
import { FeedbackSummaryHeader } from './feedback-summary-header';
import { FeedbackSummaryPanel } from './feedback-summary-panel';
import { FeedbackSummaryTable } from './feedback-summary-table';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';
import { useFeedbackSummary } from './use-feedback-summary';

export function FeedbackSummaryPage() {
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
  } = useFeedbackSummary();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_SUMMARY_FEATURE.testId}
    >
      <FeedbackSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackSummaryPage;
