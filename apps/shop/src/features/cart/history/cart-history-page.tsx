import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartHistoryFilters } from './cart-history-filters';
import { CartHistoryHeader } from './cart-history-header';
import { CartHistoryPanel } from './cart-history-panel';
import { CartHistoryTable } from './cart-history-table';
import { CART_HISTORY_FEATURE } from './cart-history.routes';
import { useCartHistory } from './use-cart-history';

export function CartHistoryPage() {
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
  } = useCartHistory();

  return (
    <section className="feature-page" data-testid={CART_HISTORY_FEATURE.testId}>
      <CartHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartHistoryPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartHistoryPage;
