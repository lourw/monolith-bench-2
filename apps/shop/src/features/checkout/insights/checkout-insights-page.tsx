import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutSettingsSummary } from '../settings/checkout-settings-summary';
import { CheckoutInsightsFilters } from './checkout-insights-filters';
import { CheckoutInsightsHeader } from './checkout-insights-header';
import { CheckoutInsightsPanel } from './checkout-insights-panel';
import { CheckoutInsightsTable } from './checkout-insights-table';
import { CHECKOUT_INSIGHTS_FEATURE } from './checkout-insights.routes';
import { useCheckoutInsights } from './use-checkout-insights';

export function CheckoutInsightsPage() {
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
  } = useCheckoutInsights();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_INSIGHTS_FEATURE.testId}
    >
      <CheckoutInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutInsightsPage;
