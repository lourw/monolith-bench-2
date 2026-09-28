import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AnalyticsDashboardFilters } from './analytics-dashboard-filters';
import { AnalyticsDashboardHeader } from './analytics-dashboard-header';
import { AnalyticsDashboardPanel } from './analytics-dashboard-panel';
import { AnalyticsDashboardTable } from './analytics-dashboard-table';
import { ANALYTICS_DASHBOARD_FEATURE } from './analytics-dashboard.routes';
import { useAnalyticsDashboard } from './use-analytics-dashboard';

export function AnalyticsDashboardPage() {
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
  } = useAnalyticsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_DASHBOARD_FEATURE.testId}
    >
      <AnalyticsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDashboardPage;
