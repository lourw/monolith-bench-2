import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesDashboardFilters } from './bundles-dashboard-filters';
import { BundlesDashboardHeader } from './bundles-dashboard-header';
import { BundlesDashboardPanel } from './bundles-dashboard-panel';
import { BundlesDashboardTable } from './bundles-dashboard-table';
import { BUNDLES_DASHBOARD_FEATURE } from './bundles-dashboard.routes';
import { useBundlesDashboard } from './use-bundles-dashboard';

export function BundlesDashboardPage() {
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
  } = useBundlesDashboard();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_DASHBOARD_FEATURE.testId}
    >
      <BundlesDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesDashboardPage;
