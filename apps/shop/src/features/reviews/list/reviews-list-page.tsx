import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsListFilters } from './reviews-list-filters';
import { ReviewsListHeader } from './reviews-list-header';
import { ReviewsListPanel } from './reviews-list-panel';
import { ReviewsListTable } from './reviews-list-table';
import { REVIEWS_LIST_FEATURE } from './reviews-list.routes';
import { useReviewsList } from './use-reviews-list';

export function ReviewsListPage() {
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
  } = useReviewsList();

  return (
    <section className="feature-page" data-testid={REVIEWS_LIST_FEATURE.testId}>
      <ReviewsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default ReviewsListPage;
