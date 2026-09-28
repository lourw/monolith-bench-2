import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsInsightsSummary } from '../../reviews/insights/reviews-insights-summary';
import { SearchDashboardFilters } from './search-dashboard-filters';
import { SearchDashboardHeader } from './search-dashboard-header';
import { SearchDashboardPanel } from './search-dashboard-panel';
import { SearchDashboardTable } from './search-dashboard-table';
import { SEARCH_DASHBOARD_FEATURE } from './search-dashboard.routes';
import { useSearchDashboard } from './use-search-dashboard';

export function SearchDashboardPage() {
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
  } = useSearchDashboard();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_DASHBOARD_FEATURE.testId}
    >
      <SearchDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SearchDashboardPage;
