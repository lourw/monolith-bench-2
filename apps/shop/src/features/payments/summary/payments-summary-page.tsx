import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartInsightsSummary } from '../../cart/insights/cart-insights-summary';
import { PaymentsSummaryFilters } from './payments-summary-filters';
import { PaymentsSummaryHeader } from './payments-summary-header';
import { PaymentsSummaryPanel } from './payments-summary-panel';
import { PaymentsSummaryTable } from './payments-summary-table';
import { PAYMENTS_SUMMARY_FEATURE } from './payments-summary.routes';
import { usePaymentsSummary } from './use-payments-summary';

export function PaymentsSummaryPage() {
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
  } = usePaymentsSummary();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_SUMMARY_FEATURE.testId}
    >
      <PaymentsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsSummaryPage;
