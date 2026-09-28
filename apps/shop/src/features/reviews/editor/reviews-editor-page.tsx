import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutWizardSummary } from '../../checkout/wizard/checkout-wizard-summary';
import { ReviewsEditorFilters } from './reviews-editor-filters';
import { ReviewsEditorHeader } from './reviews-editor-header';
import { ReviewsEditorPanel } from './reviews-editor-panel';
import { ReviewsEditorTable } from './reviews-editor-table';
import { REVIEWS_EDITOR_FEATURE } from './reviews-editor.routes';
import { useReviewsEditor } from './use-reviews-editor';

export function ReviewsEditorPage() {
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
  } = useReviewsEditor();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_EDITOR_FEATURE.testId}
    >
      <ReviewsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutWizardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReviewsEditorPage;
