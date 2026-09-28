import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingDashboardFilters } from './shipping-dashboard-filters';
import { ShippingDashboardHeader } from './shipping-dashboard-header';
import { ShippingDashboardPanel } from './shipping-dashboard-panel';
import { ShippingDashboardTable } from './shipping-dashboard-table';
import { SHIPPING_DASHBOARD_FEATURE } from './shipping-dashboard.routes';
import { useShippingDashboard } from './use-shipping-dashboard';

export function ShippingDashboardPage() {
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
  } = useShippingDashboard();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_DASHBOARD_FEATURE.testId}
    >
      <ShippingDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingDashboardPage;
