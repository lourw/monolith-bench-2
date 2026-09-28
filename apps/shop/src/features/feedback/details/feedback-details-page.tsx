import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackDetailsFilters } from './feedback-details-filters';
import { FeedbackDetailsHeader } from './feedback-details-header';
import { FeedbackDetailsPanel } from './feedback-details-panel';
import { FeedbackDetailsTable } from './feedback-details-table';
import { FEEDBACK_DETAILS_FEATURE } from './feedback-details.routes';
import { useFeedbackDetails } from './use-feedback-details';

export function FeedbackDetailsPage() {
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
  } = useFeedbackDetails();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_DETAILS_FEATURE.testId}
    >
      <FeedbackDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackDetailsPage;
