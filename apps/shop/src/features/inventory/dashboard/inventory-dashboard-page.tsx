import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventoryDashboardFilters } from './inventory-dashboard-filters';
import { InventoryDashboardHeader } from './inventory-dashboard-header';
import { InventoryDashboardPanel } from './inventory-dashboard-panel';
import { InventoryDashboardTable } from './inventory-dashboard-table';
import { INVENTORY_DASHBOARD_FEATURE } from './inventory-dashboard.routes';
import { useInventoryDashboard } from './use-inventory-dashboard';

export function InventoryDashboardPage() {
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
  } = useInventoryDashboard();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_DASHBOARD_FEATURE.testId}
    >
      <InventoryDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventoryDashboardPage;
