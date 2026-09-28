import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchListFilters } from './search-list-filters';
import { SearchListHeader } from './search-list-header';
import { SearchListPanel } from './search-list-panel';
import { SearchListTable } from './search-list-table';
import { SEARCH_LIST_FEATURE } from './search-list.routes';
import { useSearchList } from './use-search-list';

export function SearchListPage() {
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
  } = useSearchList();

  return (
    <section className="feature-page" data-testid={SEARCH_LIST_FEATURE.testId}>
      <SearchListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default SearchListPage;
