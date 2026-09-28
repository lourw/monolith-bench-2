import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersListFilters } from './orders-list-filters';
import { OrdersListHeader } from './orders-list-header';
import { OrdersListPanel } from './orders-list-panel';
import { OrdersListTable } from './orders-list-table';
import { ORDERS_LIST_FEATURE } from './orders-list.routes';
import { useOrdersList } from './use-orders-list';

export function OrdersListPage() {
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
  } = useOrdersList();

  return (
    <section className="feature-page" data-testid={ORDERS_LIST_FEATURE.testId}>
      <OrdersListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default OrdersListPage;
