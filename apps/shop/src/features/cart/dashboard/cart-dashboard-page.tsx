import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartDashboardFilters } from './cart-dashboard-filters';
import { CartDashboardHeader } from './cart-dashboard-header';
import { CartDashboardPanel } from './cart-dashboard-panel';
import { CartDashboardTable } from './cart-dashboard-table';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';
import { useCartDashboard } from './use-cart-dashboard';

export function CartDashboardPage() {
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
  } = useCartDashboard();

  return (
    <section
      className="feature-page"
      data-testid={CART_DASHBOARD_FEATURE.testId}
    >
      <CartDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CartDashboardPage;
