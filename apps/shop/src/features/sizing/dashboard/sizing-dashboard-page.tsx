import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingDashboardFilters } from './sizing-dashboard-filters';
import { SizingDashboardHeader } from './sizing-dashboard-header';
import { SizingDashboardPanel } from './sizing-dashboard-panel';
import { SizingDashboardTable } from './sizing-dashboard-table';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';
import { useSizingDashboard } from './use-sizing-dashboard';

export function SizingDashboardPage() {
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
  } = useSizingDashboard();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_DASHBOARD_FEATURE.testId}
    >
      <SizingDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingDashboardPage;
