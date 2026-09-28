import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistSummaryFilters } from './wishlist-summary-filters';
import { WishlistSummaryHeader } from './wishlist-summary-header';
import { WishlistSummaryPanel } from './wishlist-summary-panel';
import { WishlistSummaryTable } from './wishlist-summary-table';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';
import { useWishlistSummary } from './use-wishlist-summary';

export function WishlistSummaryPage() {
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
  } = useWishlistSummary();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_SUMMARY_FEATURE.testId}
    >
      <WishlistSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistSummaryPage;
