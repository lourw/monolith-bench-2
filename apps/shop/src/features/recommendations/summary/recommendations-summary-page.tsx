import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsSummaryFilters } from './recommendations-summary-filters';
import { RecommendationsSummaryHeader } from './recommendations-summary-header';
import { RecommendationsSummaryPanel } from './recommendations-summary-panel';
import { RecommendationsSummaryTable } from './recommendations-summary-table';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';
import { useRecommendationsSummary } from './use-recommendations-summary';

export function RecommendationsSummaryPage() {
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
  } = useRecommendationsSummary();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_SUMMARY_FEATURE.testId}
    >
      <RecommendationsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsSummaryPage;
