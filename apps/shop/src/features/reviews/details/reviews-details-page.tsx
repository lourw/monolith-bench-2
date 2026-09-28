import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistEditorSummary } from '../../wishlist/editor/wishlist-editor-summary';
import { ReviewsDetailsFilters } from './reviews-details-filters';
import { ReviewsDetailsHeader } from './reviews-details-header';
import { ReviewsDetailsPanel } from './reviews-details-panel';
import { ReviewsDetailsTable } from './reviews-details-table';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';
import { useReviewsDetails } from './use-reviews-details';

export function ReviewsDetailsPage() {
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
  } = useReviewsDetails();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_DETAILS_FEATURE.testId}
    >
      <ReviewsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReviewsDetailsPage;
