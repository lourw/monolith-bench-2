import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackOverviewFilters } from './feedback-overview-filters';
import { FeedbackOverviewHeader } from './feedback-overview-header';
import { FeedbackOverviewPanel } from './feedback-overview-panel';
import { FeedbackOverviewTable } from './feedback-overview-table';
import { FEEDBACK_OVERVIEW_FEATURE } from './feedback-overview.routes';
import { useFeedbackOverview } from './use-feedback-overview';

export function FeedbackOverviewPage() {
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
  } = useFeedbackOverview();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_OVERVIEW_FEATURE.testId}
    >
      <FeedbackOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackOverviewPage;
