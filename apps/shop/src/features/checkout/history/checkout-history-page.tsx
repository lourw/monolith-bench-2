import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutHistoryFilters } from './checkout-history-filters';
import { CheckoutHistoryHeader } from './checkout-history-header';
import { CheckoutHistoryPanel } from './checkout-history-panel';
import { CheckoutHistoryTable } from './checkout-history-table';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';
import { useCheckoutHistory } from './use-checkout-history';

export function CheckoutHistoryPage() {
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
  } = useCheckoutHistory();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_HISTORY_FEATURE.testId}
    >
      <CheckoutHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CheckoutHistoryPage;
