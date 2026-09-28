import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersOverviewFilters } from './orders-overview-filters';
import { OrdersOverviewHeader } from './orders-overview-header';
import { OrdersOverviewPanel } from './orders-overview-panel';
import { OrdersOverviewTable } from './orders-overview-table';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';
import { useOrdersOverview } from './use-orders-overview';

export function OrdersOverviewPage() {
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
  } = useOrdersOverview();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_OVERVIEW_FEATURE.testId}
    >
      <OrdersOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default OrdersOverviewPage;
