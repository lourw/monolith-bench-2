import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsInsightsFilters } from './promotions-insights-filters';
import { PromotionsInsightsHeader } from './promotions-insights-header';
import { PromotionsInsightsPanel } from './promotions-insights-panel';
import { PromotionsInsightsTable } from './promotions-insights-table';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';
import { usePromotionsInsights } from './use-promotions-insights';

export function PromotionsInsightsPage() {
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
  } = usePromotionsInsights();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_INSIGHTS_FEATURE.testId}
    >
      <PromotionsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsInsightsPage;
