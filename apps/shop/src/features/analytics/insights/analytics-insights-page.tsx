import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsInsightsFilters } from './analytics-insights-filters';
import { AnalyticsInsightsHeader } from './analytics-insights-header';
import { AnalyticsInsightsPanel } from './analytics-insights-panel';
import { AnalyticsInsightsTable } from './analytics-insights-table';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';
import { useAnalyticsInsights } from './use-analytics-insights';

export function AnalyticsInsightsPage() {
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
  } = useAnalyticsInsights();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_INSIGHTS_FEATURE.testId}
    >
      <AnalyticsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsInsightsPage;
