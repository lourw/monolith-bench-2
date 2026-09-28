import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutEditorSummary } from '../../checkout/editor/checkout-editor-summary';
import { OrdersDetailsFilters } from './orders-details-filters';
import { OrdersDetailsHeader } from './orders-details-header';
import { OrdersDetailsPanel } from './orders-details-panel';
import { OrdersDetailsTable } from './orders-details-table';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';
import { useOrdersDetails } from './use-orders-details';

export function OrdersDetailsPage() {
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
  } = useOrdersDetails();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_DETAILS_FEATURE.testId}
    >
      <OrdersDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default OrdersDetailsPage;
