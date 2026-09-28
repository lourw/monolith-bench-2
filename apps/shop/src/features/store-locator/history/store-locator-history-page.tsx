import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersHistorySummary } from '../../orders/history/orders-history-summary';
import { StoreLocatorHistoryFilters } from './store-locator-history-filters';
import { StoreLocatorHistoryHeader } from './store-locator-history-header';
import { StoreLocatorHistoryPanel } from './store-locator-history-panel';
import { StoreLocatorHistoryTable } from './store-locator-history-table';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';
import { useStoreLocatorHistory } from './use-store-locator-history';

export function StoreLocatorHistoryPage() {
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
  } = useStoreLocatorHistory();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_HISTORY_FEATURE.testId}
    >
      <StoreLocatorHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <OrdersHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorHistoryPage;
