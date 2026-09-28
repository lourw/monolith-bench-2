import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersDashboardFilters } from './orders-dashboard-filters';
import { OrdersDashboardHeader } from './orders-dashboard-header';
import { OrdersDashboardPanel } from './orders-dashboard-panel';
import { OrdersDashboardTable } from './orders-dashboard-table';
import { ORDERS_DASHBOARD_FEATURE } from './orders-dashboard.routes';
import { useOrdersDashboard } from './use-orders-dashboard';

export function OrdersDashboardPage() {
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
  } = useOrdersDashboard();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_DASHBOARD_FEATURE.testId}
    >
      <OrdersDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default OrdersDashboardPage;
