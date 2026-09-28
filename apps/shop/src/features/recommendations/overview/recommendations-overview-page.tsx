import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsOverviewFilters } from './recommendations-overview-filters';
import { RecommendationsOverviewHeader } from './recommendations-overview-header';
import { RecommendationsOverviewPanel } from './recommendations-overview-panel';
import { RecommendationsOverviewTable } from './recommendations-overview-table';
import { RECOMMENDATIONS_OVERVIEW_FEATURE } from './recommendations-overview.routes';
import { useRecommendationsOverview } from './use-recommendations-overview';

export function RecommendationsOverviewPage() {
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
  } = useRecommendationsOverview();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_OVERVIEW_FEATURE.testId}
    >
      <RecommendationsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsOverviewPage;
