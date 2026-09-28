import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistSettingsFilters } from './wishlist-settings-filters';
import { WishlistSettingsHeader } from './wishlist-settings-header';
import { WishlistSettingsPanel } from './wishlist-settings-panel';
import { WishlistSettingsTable } from './wishlist-settings-table';
import { WISHLIST_SETTINGS_FEATURE } from './wishlist-settings.routes';
import { useWishlistSettings } from './use-wishlist-settings';

export function WishlistSettingsPage() {
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
  } = useWishlistSettings();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_SETTINGS_FEATURE.testId}
    >
      <WishlistSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistSettingsPage;
