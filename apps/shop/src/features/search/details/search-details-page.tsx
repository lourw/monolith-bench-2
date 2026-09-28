import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchDetailsFilters } from './search-details-filters';
import { SearchDetailsHeader } from './search-details-header';
import { SearchDetailsPanel } from './search-details-panel';
import { SearchDetailsTable } from './search-details-table';
import { SEARCH_DETAILS_FEATURE } from './search-details.routes';
import { useSearchDetails } from './use-search-details';

export function SearchDetailsPage() {
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
  } = useSearchDetails();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_DETAILS_FEATURE.testId}
    >
      <SearchDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchDetailsPage;
