import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchInsightsFilters } from './search-insights-filters';
import { SearchInsightsHeader } from './search-insights-header';
import { SearchInsightsPanel } from './search-insights-panel';
import { SearchInsightsTable } from './search-insights-table';
import { SEARCH_INSIGHTS_FEATURE } from './search-insights.routes';
import { useSearchInsights } from './use-search-insights';

export function SearchInsightsPage() {
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
  } = useSearchInsights();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_INSIGHTS_FEATURE.testId}
    >
      <SearchInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchInsightsPage;
