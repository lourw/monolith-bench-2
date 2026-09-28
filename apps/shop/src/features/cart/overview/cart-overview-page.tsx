import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartOverviewFilters } from './cart-overview-filters';
import { CartOverviewHeader } from './cart-overview-header';
import { CartOverviewPanel } from './cart-overview-panel';
import { CartOverviewTable } from './cart-overview-table';
import { CART_OVERVIEW_FEATURE } from './cart-overview.routes';
import { useCartOverview } from './use-cart-overview';

export function CartOverviewPage() {
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
  } = useCartOverview();

  return (
    <section
      className="feature-page"
      data-testid={CART_OVERVIEW_FEATURE.testId}
    >
      <CartOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartOverviewPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartOverviewPage;
