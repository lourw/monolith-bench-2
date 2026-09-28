import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartSummarySummary } from '../summary/cart-summary-summary';
import { CartDetailsFilters } from './cart-details-filters';
import { CartDetailsHeader } from './cart-details-header';
import { CartDetailsPanel } from './cart-details-panel';
import { CartDetailsTable } from './cart-details-table';
import { CART_DETAILS_FEATURE } from './cart-details.routes';
import { useCartDetails } from './use-cart-details';

export function CartDetailsPage() {
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
  } = useCartDetails();

  return (
    <section className="feature-page" data-testid={CART_DETAILS_FEATURE.testId}>
      <CartDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartDetailsPanel selected={selected} onClear={() => select(null)} />
          <CartSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default CartDetailsPage;
