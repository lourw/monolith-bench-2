import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutWizardSummary } from '../../checkout/wizard/checkout-wizard-summary';
import { OrdersInsightsFilters } from './orders-insights-filters';
import { OrdersInsightsHeader } from './orders-insights-header';
import { OrdersInsightsPanel } from './orders-insights-panel';
import { OrdersInsightsTable } from './orders-insights-table';
import { ORDERS_INSIGHTS_FEATURE } from './orders-insights.routes';
import { useOrdersInsights } from './use-orders-insights';

export function OrdersInsightsPage() {
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
  } = useOrdersInsights();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_INSIGHTS_FEATURE.testId}
    >
      <OrdersInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutWizardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default OrdersInsightsPage;
