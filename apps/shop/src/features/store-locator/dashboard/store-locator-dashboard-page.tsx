import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { StoreLocatorDashboardFilters } from './store-locator-dashboard-filters';
import { StoreLocatorDashboardHeader } from './store-locator-dashboard-header';
import { StoreLocatorDashboardPanel } from './store-locator-dashboard-panel';
import { StoreLocatorDashboardTable } from './store-locator-dashboard-table';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';
import { useStoreLocatorDashboard } from './use-store-locator-dashboard';

export function StoreLocatorDashboardPage() {
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
  } = useStoreLocatorDashboard();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_DASHBOARD_FEATURE.testId}
    >
      <StoreLocatorDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorDashboardPage;
