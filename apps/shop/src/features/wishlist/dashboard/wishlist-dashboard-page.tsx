import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutOverviewSummary } from '../../checkout/overview/checkout-overview-summary';
import { WishlistDashboardFilters } from './wishlist-dashboard-filters';
import { WishlistDashboardHeader } from './wishlist-dashboard-header';
import { WishlistDashboardPanel } from './wishlist-dashboard-panel';
import { WishlistDashboardTable } from './wishlist-dashboard-table';
import { WISHLIST_DASHBOARD_FEATURE } from './wishlist-dashboard.routes';
import { useWishlistDashboard } from './use-wishlist-dashboard';

export function WishlistDashboardPage() {
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
  } = useWishlistDashboard();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_DASHBOARD_FEATURE.testId}
    >
      <WishlistDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default WishlistDashboardPage;
