import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsInsightsFilters } from './payments-insights-filters';
import { PaymentsInsightsHeader } from './payments-insights-header';
import { PaymentsInsightsPanel } from './payments-insights-panel';
import { PaymentsInsightsTable } from './payments-insights-table';
import { PAYMENTS_INSIGHTS_FEATURE } from './payments-insights.routes';
import { usePaymentsInsights } from './use-payments-insights';

export function PaymentsInsightsPage() {
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
  } = usePaymentsInsights();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_INSIGHTS_FEATURE.testId}
    >
      <PaymentsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentsInsightsPage;
