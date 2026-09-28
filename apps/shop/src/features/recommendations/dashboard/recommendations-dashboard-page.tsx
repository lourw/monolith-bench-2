import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsSummarySummary } from '../summary/recommendations-summary-summary';
import { RecommendationsDashboardFilters } from './recommendations-dashboard-filters';
import { RecommendationsDashboardHeader } from './recommendations-dashboard-header';
import { RecommendationsDashboardPanel } from './recommendations-dashboard-panel';
import { RecommendationsDashboardTable } from './recommendations-dashboard-table';
import { RECOMMENDATIONS_DASHBOARD_FEATURE } from './recommendations-dashboard.routes';
import { useRecommendationsDashboard } from './use-recommendations-dashboard';

export function RecommendationsDashboardPage() {
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
  } = useRecommendationsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_DASHBOARD_FEATURE.testId}
    >
      <RecommendationsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <RecommendationsSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsDashboardPage;
