import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistSummarySummary } from '../../wishlist/summary/wishlist-summary-summary';
import { RecommendationsHistoryFilters } from './recommendations-history-filters';
import { RecommendationsHistoryHeader } from './recommendations-history-header';
import { RecommendationsHistoryPanel } from './recommendations-history-panel';
import { RecommendationsHistoryTable } from './recommendations-history-table';
import { RECOMMENDATIONS_HISTORY_FEATURE } from './recommendations-history.routes';
import { useRecommendationsHistory } from './use-recommendations-history';

export function RecommendationsHistoryPage() {
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
  } = useRecommendationsHistory();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_HISTORY_FEATURE.testId}
    >
      <RecommendationsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsHistoryPage;
