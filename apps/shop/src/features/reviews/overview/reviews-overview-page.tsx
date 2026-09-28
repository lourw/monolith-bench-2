import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsOverviewFilters } from './reviews-overview-filters';
import { ReviewsOverviewHeader } from './reviews-overview-header';
import { ReviewsOverviewPanel } from './reviews-overview-panel';
import { ReviewsOverviewTable } from './reviews-overview-table';
import { REVIEWS_OVERVIEW_FEATURE } from './reviews-overview.routes';
import { useReviewsOverview } from './use-reviews-overview';

export function ReviewsOverviewPage() {
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
  } = useReviewsOverview();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_OVERVIEW_FEATURE.testId}
    >
      <ReviewsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReviewsOverviewPage;
