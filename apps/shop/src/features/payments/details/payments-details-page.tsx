import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersListSummary } from '../../orders/list/orders-list-summary';
import { PaymentsDetailsFilters } from './payments-details-filters';
import { PaymentsDetailsHeader } from './payments-details-header';
import { PaymentsDetailsPanel } from './payments-details-panel';
import { PaymentsDetailsTable } from './payments-details-table';
import { PAYMENTS_DETAILS_FEATURE } from './payments-details.routes';
import { usePaymentsDetails } from './use-payments-details';

export function PaymentsDetailsPage() {
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
  } = usePaymentsDetails();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_DETAILS_FEATURE.testId}
    >
      <PaymentsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <OrdersListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsDetailsPage;
