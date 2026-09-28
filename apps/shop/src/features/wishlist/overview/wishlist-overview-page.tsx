import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistOverviewFilters } from './wishlist-overview-filters';
import { WishlistOverviewHeader } from './wishlist-overview-header';
import { WishlistOverviewPanel } from './wishlist-overview-panel';
import { WishlistOverviewTable } from './wishlist-overview-table';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';
import { useWishlistOverview } from './use-wishlist-overview';

export function WishlistOverviewPage() {
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
  } = useWishlistOverview();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_OVERVIEW_FEATURE.testId}
    >
      <WishlistOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistOverviewPage;
