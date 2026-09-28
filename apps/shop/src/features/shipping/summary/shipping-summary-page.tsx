import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingSummaryFilters } from './shipping-summary-filters';
import { ShippingSummaryHeader } from './shipping-summary-header';
import { ShippingSummaryPanel } from './shipping-summary-panel';
import { ShippingSummaryTable } from './shipping-summary-table';
import { SHIPPING_SUMMARY_FEATURE } from './shipping-summary.routes';
import { useShippingSummary } from './use-shipping-summary';

export function ShippingSummaryPage() {
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
  } = useShippingSummary();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_SUMMARY_FEATURE.testId}
    >
      <ShippingSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingSummaryPage;
