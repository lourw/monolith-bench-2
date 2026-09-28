import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingInsightsFilters } from './shipping-insights-filters';
import { ShippingInsightsHeader } from './shipping-insights-header';
import { ShippingInsightsPanel } from './shipping-insights-panel';
import { ShippingInsightsTable } from './shipping-insights-table';
import { SHIPPING_INSIGHTS_FEATURE } from './shipping-insights.routes';
import { useShippingInsights } from './use-shipping-insights';

export function ShippingInsightsPage() {
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
  } = useShippingInsights();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_INSIGHTS_FEATURE.testId}
    >
      <ShippingInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingInsightsPage;
