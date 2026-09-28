import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchOverviewFilters } from './search-overview-filters';
import { SearchOverviewHeader } from './search-overview-header';
import { SearchOverviewPanel } from './search-overview-panel';
import { SearchOverviewTable } from './search-overview-table';
import { SEARCH_OVERVIEW_FEATURE } from './search-overview.routes';
import { useSearchOverview } from './use-search-overview';

export function SearchOverviewPage() {
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
  } = useSearchOverview();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_OVERVIEW_FEATURE.testId}
    >
      <SearchOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchOverviewPage;
