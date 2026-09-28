import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsDashboardSummary } from '../dashboard/returns-dashboard-summary';
import { ReturnsInsightsFilters } from './returns-insights-filters';
import { ReturnsInsightsHeader } from './returns-insights-header';
import { ReturnsInsightsPanel } from './returns-insights-panel';
import { ReturnsInsightsTable } from './returns-insights-table';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';
import { useReturnsInsights } from './use-returns-insights';

export function ReturnsInsightsPage() {
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
  } = useReturnsInsights();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_INSIGHTS_FEATURE.testId}
    >
      <ReturnsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReturnsDashboardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReturnsInsightsPage;
