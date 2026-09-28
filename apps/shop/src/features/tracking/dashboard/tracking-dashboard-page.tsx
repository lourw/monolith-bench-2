import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { TrackingDashboardFilters } from './tracking-dashboard-filters';
import { TrackingDashboardHeader } from './tracking-dashboard-header';
import { TrackingDashboardPanel } from './tracking-dashboard-panel';
import { TrackingDashboardTable } from './tracking-dashboard-table';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';
import { useTrackingDashboard } from './use-tracking-dashboard';

export function TrackingDashboardPage() {
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
  } = useTrackingDashboard();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_DASHBOARD_FEATURE.testId}
    >
      <TrackingDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default TrackingDashboardPage;
