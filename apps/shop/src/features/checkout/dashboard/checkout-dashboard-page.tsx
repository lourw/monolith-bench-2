import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutDashboardFilters } from './checkout-dashboard-filters';
import { CheckoutDashboardHeader } from './checkout-dashboard-header';
import { CheckoutDashboardPanel } from './checkout-dashboard-panel';
import { CheckoutDashboardTable } from './checkout-dashboard-table';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';
import { useCheckoutDashboard } from './use-checkout-dashboard';

export function CheckoutDashboardPage() {
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
  } = useCheckoutDashboard();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_DASHBOARD_FEATURE.testId}
    >
      <CheckoutDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CheckoutDashboardPage;
