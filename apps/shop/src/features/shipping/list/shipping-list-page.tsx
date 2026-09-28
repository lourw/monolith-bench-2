import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartHistorySummary } from '../../cart/history/cart-history-summary';
import { ShippingListFilters } from './shipping-list-filters';
import { ShippingListHeader } from './shipping-list-header';
import { ShippingListPanel } from './shipping-list-panel';
import { ShippingListTable } from './shipping-list-table';
import { SHIPPING_LIST_FEATURE } from './shipping-list.routes';
import { useShippingList } from './use-shipping-list';

export function ShippingListPage() {
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
  } = useShippingList();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_LIST_FEATURE.testId}
    >
      <ShippingListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingListPanel selected={selected} onClear={() => select(null)} />
          <CartHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default ShippingListPage;
