import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartOverviewSummary } from '../overview/cart-overview-summary';
import { CartInsightsFilters } from './cart-insights-filters';
import { CartInsightsHeader } from './cart-insights-header';
import { CartInsightsPanel } from './cart-insights-panel';
import { CartInsightsTable } from './cart-insights-table';
import { CART_INSIGHTS_FEATURE } from './cart-insights.routes';
import { useCartInsights } from './use-cart-insights';

export function CartInsightsPage() {
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
  } = useCartInsights();

  return (
    <section
      className="feature-page"
      data-testid={CART_INSIGHTS_FEATURE.testId}
    >
      <CartInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartInsightsPanel selected={selected} onClear={() => select(null)} />
          <CartOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CartInsightsPage;
