import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutHistorySummary } from '../../checkout/history/checkout-history-summary';
import { ReviewsWizardFilters } from './reviews-wizard-filters';
import { ReviewsWizardHeader } from './reviews-wizard-header';
import { ReviewsWizardPanel } from './reviews-wizard-panel';
import { ReviewsWizardTable } from './reviews-wizard-table';
import { REVIEWS_WIZARD_FEATURE } from './reviews-wizard.routes';
import { useReviewsWizard } from './use-reviews-wizard';

export function ReviewsWizardPage() {
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
  } = useReviewsWizard();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_WIZARD_FEATURE.testId}
    >
      <ReviewsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReviewsWizardPage;
