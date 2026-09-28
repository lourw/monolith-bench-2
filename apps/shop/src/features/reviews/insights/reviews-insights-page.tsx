import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutDetailsSummary } from '../../checkout/details/checkout-details-summary';
import { ReviewsInsightsFilters } from './reviews-insights-filters';
import { ReviewsInsightsHeader } from './reviews-insights-header';
import { ReviewsInsightsPanel } from './reviews-insights-panel';
import { ReviewsInsightsTable } from './reviews-insights-table';
import { REVIEWS_INSIGHTS_FEATURE } from './reviews-insights.routes';
import { useReviewsInsights } from './use-reviews-insights';

export function ReviewsInsightsPage() {
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
  } = useReviewsInsights();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_INSIGHTS_FEATURE.testId}
    >
      <ReviewsInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReviewsInsightsPage;
