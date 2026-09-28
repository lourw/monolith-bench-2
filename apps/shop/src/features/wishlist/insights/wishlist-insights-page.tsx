import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistInsightsFilters } from './wishlist-insights-filters';
import { WishlistInsightsHeader } from './wishlist-insights-header';
import { WishlistInsightsPanel } from './wishlist-insights-panel';
import { WishlistInsightsTable } from './wishlist-insights-table';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';
import { useWishlistInsights } from './use-wishlist-insights';

export function WishlistInsightsPage() {
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
  } = useWishlistInsights();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_INSIGHTS_FEATURE.testId}
    >
      <WishlistInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistInsightsPage;
