import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartOverviewSummary } from '../../cart/overview/cart-overview-summary';
import { WishlistDetailsFilters } from './wishlist-details-filters';
import { WishlistDetailsHeader } from './wishlist-details-header';
import { WishlistDetailsPanel } from './wishlist-details-panel';
import { WishlistDetailsTable } from './wishlist-details-table';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';
import { useWishlistDetails } from './use-wishlist-details';

export function WishlistDetailsPage() {
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
  } = useWishlistDetails();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_DETAILS_FEATURE.testId}
    >
      <WishlistDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default WishlistDetailsPage;
