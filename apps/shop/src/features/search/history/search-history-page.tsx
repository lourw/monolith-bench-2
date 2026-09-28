import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchHistoryFilters } from './search-history-filters';
import { SearchHistoryHeader } from './search-history-header';
import { SearchHistoryPanel } from './search-history-panel';
import { SearchHistoryTable } from './search-history-table';
import { SEARCH_HISTORY_FEATURE } from './search-history.routes';
import { useSearchHistory } from './use-search-history';

export function SearchHistoryPage() {
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
  } = useSearchHistory();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_HISTORY_FEATURE.testId}
    >
      <SearchHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchHistoryPage;
