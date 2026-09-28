import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistHistorySummary } from '../history/wishlist-history-summary';
import { WishlistListFilters } from './wishlist-list-filters';
import { WishlistListHeader } from './wishlist-list-header';
import { WishlistListPanel } from './wishlist-list-panel';
import { WishlistListTable } from './wishlist-list-table';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';
import { useWishlistList } from './use-wishlist-list';

export function WishlistListPage() {
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
  } = useWishlistList();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_LIST_FEATURE.testId}
    >
      <WishlistListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistListPanel selected={selected} onClear={() => select(null)} />
          <WishlistHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default WishlistListPage;
