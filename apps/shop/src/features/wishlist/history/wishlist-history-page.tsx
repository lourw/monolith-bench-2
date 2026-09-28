import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistHistoryFilters } from './wishlist-history-filters';
import { WishlistHistoryHeader } from './wishlist-history-header';
import { WishlistHistoryPanel } from './wishlist-history-panel';
import { WishlistHistoryTable } from './wishlist-history-table';
import { WISHLIST_HISTORY_FEATURE } from './wishlist-history.routes';
import { useWishlistHistory } from './use-wishlist-history';

export function WishlistHistoryPage() {
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
  } = useWishlistHistory();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_HISTORY_FEATURE.testId}
    >
      <WishlistHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistHistoryPage;
