import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsDashboardFilters } from './reviews-dashboard-filters';
import { ReviewsDashboardHeader } from './reviews-dashboard-header';
import { ReviewsDashboardPanel } from './reviews-dashboard-panel';
import { ReviewsDashboardTable } from './reviews-dashboard-table';
import { REVIEWS_DASHBOARD_FEATURE } from './reviews-dashboard.routes';
import { useReviewsDashboard } from './use-reviews-dashboard';

export function ReviewsDashboardPage() {
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
  } = useReviewsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_DASHBOARD_FEATURE.testId}
    >
      <ReviewsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReviewsDashboardPage;
