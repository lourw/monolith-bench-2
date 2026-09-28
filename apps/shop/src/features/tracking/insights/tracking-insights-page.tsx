import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingInsightsFilters } from './tracking-insights-filters';
import { TrackingInsightsHeader } from './tracking-insights-header';
import { TrackingInsightsPanel } from './tracking-insights-panel';
import { TrackingInsightsTable } from './tracking-insights-table';
import { TRACKING_INSIGHTS_FEATURE } from './tracking-insights.routes';
import { useTrackingInsights } from './use-tracking-insights';

export function TrackingInsightsPage() {
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
  } = useTrackingInsights();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_INSIGHTS_FEATURE.testId}
    >
      <TrackingInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingInsightsPage;
