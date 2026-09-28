import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsHistoryFilters } from './reviews-history-filters';
import { ReviewsHistoryHeader } from './reviews-history-header';
import { ReviewsHistoryPanel } from './reviews-history-panel';
import { ReviewsHistoryTable } from './reviews-history-table';
import { REVIEWS_HISTORY_FEATURE } from './reviews-history.routes';
import { useReviewsHistory } from './use-reviews-history';

export function ReviewsHistoryPage() {
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
  } = useReviewsHistory();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_HISTORY_FEATURE.testId}
    >
      <ReviewsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReviewsHistoryPage;
