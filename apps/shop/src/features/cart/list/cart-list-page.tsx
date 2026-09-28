import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartListFilters } from './cart-list-filters';
import { CartListHeader } from './cart-list-header';
import { CartListPanel } from './cart-list-panel';
import { CartListTable } from './cart-list-table';
import { CART_LIST_FEATURE } from './cart-list.routes';
import { useCartList } from './use-cart-list';

export function CartListPage() {
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
  } = useCartList();

  return (
    <section className="feature-page" data-testid={CART_LIST_FEATURE.testId}>
      <CartListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartListPage;
