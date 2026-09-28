import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersSummaryFilters } from './orders-summary-filters';
import { OrdersSummaryHeader } from './orders-summary-header';
import { OrdersSummaryPanel } from './orders-summary-panel';
import { OrdersSummaryTable } from './orders-summary-table';
import { ORDERS_SUMMARY_FEATURE } from './orders-summary.routes';
import { useOrdersSummary } from './use-orders-summary';

export function OrdersSummaryPage() {
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
  } = useOrdersSummary();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_SUMMARY_FEATURE.testId}
    >
      <OrdersSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default OrdersSummaryPage;
