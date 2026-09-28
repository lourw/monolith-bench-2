import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackListFilters } from './feedback-list-filters';
import { FeedbackListHeader } from './feedback-list-header';
import { FeedbackListPanel } from './feedback-list-panel';
import { FeedbackListTable } from './feedback-list-table';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';
import { useFeedbackList } from './use-feedback-list';

export function FeedbackListPage() {
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
  } = useFeedbackList();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_LIST_FEATURE.testId}
    >
      <FeedbackListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default FeedbackListPage;
