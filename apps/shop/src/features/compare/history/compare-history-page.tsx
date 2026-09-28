import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsHistorySummary } from '../../reviews/history/reviews-history-summary';
import { CompareHistoryFilters } from './compare-history-filters';
import { CompareHistoryHeader } from './compare-history-header';
import { CompareHistoryPanel } from './compare-history-panel';
import { CompareHistoryTable } from './compare-history-table';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';
import { useCompareHistory } from './use-compare-history';

export function CompareHistoryPage() {
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
  } = useCompareHistory();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_HISTORY_FEATURE.testId}
    >
      <CompareHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default CompareHistoryPage;
