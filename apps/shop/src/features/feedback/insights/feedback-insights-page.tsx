import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingOverviewSummary } from '../../tracking/overview/tracking-overview-summary';
import { FeedbackInsightsFilters } from './feedback-insights-filters';
import { FeedbackInsightsHeader } from './feedback-insights-header';
import { FeedbackInsightsPanel } from './feedback-insights-panel';
import { FeedbackInsightsTable } from './feedback-insights-table';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';
import { useFeedbackInsights } from './use-feedback-insights';

export function FeedbackInsightsPage() {
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
  } = useFeedbackInsights();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_INSIGHTS_FEATURE.testId}
    >
      <FeedbackInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <TrackingOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default FeedbackInsightsPage;
