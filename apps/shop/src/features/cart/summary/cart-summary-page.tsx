import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartSummaryFilters } from './cart-summary-filters';
import { CartSummaryHeader } from './cart-summary-header';
import { CartSummaryPanel } from './cart-summary-panel';
import { CartSummaryTable } from './cart-summary-table';
import { CART_SUMMARY_FEATURE } from './cart-summary.routes';
import { useCartSummary } from './use-cart-summary';

export function CartSummaryPage() {
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
  } = useCartSummary();

  return (
    <section className="feature-page" data-testid={CART_SUMMARY_FEATURE.testId}>
      <CartSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartSummaryPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartSummaryPage;
