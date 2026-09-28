import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersHistoryFilters } from './orders-history-filters';
import { OrdersHistoryHeader } from './orders-history-header';
import { OrdersHistoryPanel } from './orders-history-panel';
import { OrdersHistoryTable } from './orders-history-table';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';
import { useOrdersHistory } from './use-orders-history';

export function OrdersHistoryPage() {
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
  } = useOrdersHistory();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_HISTORY_FEATURE.testId}
    >
      <OrdersHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default OrdersHistoryPage;
