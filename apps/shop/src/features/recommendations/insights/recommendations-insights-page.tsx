import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsInsightsFilters } from './recommendations-insights-filters';
import { RecommendationsInsightsHeader } from './recommendations-insights-header';
import { RecommendationsInsightsPanel } from './recommendations-insights-panel';
import { RecommendationsInsightsTable } from './recommendations-insights-table';
import { RECOMMENDATIONS_INSIGHTS_FEATURE } from './recommendations-insights.routes';
import { useRecommendationsInsights } from './use-recommendations-insights';

export function RecommendationsInsightsPage() {
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
  } = useRecommendationsInsights();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_INSIGHTS_FEATURE.testId}
    >
      <RecommendationsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsInsightsPage;
