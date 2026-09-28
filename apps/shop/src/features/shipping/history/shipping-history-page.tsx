import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingHistoryFilters } from './shipping-history-filters';
import { ShippingHistoryHeader } from './shipping-history-header';
import { ShippingHistoryPanel } from './shipping-history-panel';
import { ShippingHistoryTable } from './shipping-history-table';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';
import { useShippingHistory } from './use-shipping-history';

export function ShippingHistoryPage() {
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
  } = useShippingHistory();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_HISTORY_FEATURE.testId}
    >
      <ShippingHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingHistoryPage;
