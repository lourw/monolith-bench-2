import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportDashboardFilters } from './support-dashboard-filters';
import { SupportDashboardHeader } from './support-dashboard-header';
import { SupportDashboardPanel } from './support-dashboard-panel';
import { SupportDashboardTable } from './support-dashboard-table';
import { SUPPORT_DASHBOARD_FEATURE } from './support-dashboard.routes';
import { useSupportDashboard } from './use-support-dashboard';

export function SupportDashboardPage() {
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
  } = useSupportDashboard();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_DASHBOARD_FEATURE.testId}
    >
      <SupportDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportDashboardPage;
