import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistSettingsSummary } from '../../wishlist/settings/wishlist-settings-summary';
import { ReviewsSummaryFilters } from './reviews-summary-filters';
import { ReviewsSummaryHeader } from './reviews-summary-header';
import { ReviewsSummaryPanel } from './reviews-summary-panel';
import { ReviewsSummaryTable } from './reviews-summary-table';
import { REVIEWS_SUMMARY_FEATURE } from './reviews-summary.routes';
import { useReviewsSummary } from './use-reviews-summary';

export function ReviewsSummaryPage() {
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
  } = useReviewsSummary();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_SUMMARY_FEATURE.testId}
    >
      <ReviewsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReviewsSummaryPage;
