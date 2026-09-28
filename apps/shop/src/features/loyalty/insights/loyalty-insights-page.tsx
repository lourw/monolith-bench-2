import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltyInsightsFilters } from './loyalty-insights-filters';
import { LoyaltyInsightsHeader } from './loyalty-insights-header';
import { LoyaltyInsightsPanel } from './loyalty-insights-panel';
import { LoyaltyInsightsTable } from './loyalty-insights-table';
import { LOYALTY_INSIGHTS_FEATURE } from './loyalty-insights.routes';
import { useLoyaltyInsights } from './use-loyalty-insights';

export function LoyaltyInsightsPage() {
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
  } = useLoyaltyInsights();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_INSIGHTS_FEATURE.testId}
    >
      <LoyaltyInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyInsightsPage;
