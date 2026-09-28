import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartHistorySummary } from '../../cart/history/cart-history-summary';
import { SearchSummaryFilters } from './search-summary-filters';
import { SearchSummaryHeader } from './search-summary-header';
import { SearchSummaryPanel } from './search-summary-panel';
import { SearchSummaryTable } from './search-summary-table';
import { SEARCH_SUMMARY_FEATURE } from './search-summary.routes';
import { useSearchSummary } from './use-search-summary';

export function SearchSummaryPage() {
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
  } = useSearchSummary();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_SUMMARY_FEATURE.testId}
    >
      <SearchSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default SearchSummaryPage;
