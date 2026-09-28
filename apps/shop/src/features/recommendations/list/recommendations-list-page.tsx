import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchListSummary } from '../../search/list/search-list-summary';
import { RecommendationsListFilters } from './recommendations-list-filters';
import { RecommendationsListHeader } from './recommendations-list-header';
import { RecommendationsListPanel } from './recommendations-list-panel';
import { RecommendationsListTable } from './recommendations-list-table';
import { RECOMMENDATIONS_LIST_FEATURE } from './recommendations-list.routes';
import { useRecommendationsList } from './use-recommendations-list';

export function RecommendationsListPage() {
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
  } = useRecommendationsList();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_LIST_FEATURE.testId}
    >
      <RecommendationsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SearchListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsListPage;
