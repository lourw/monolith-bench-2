import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartSettingsFilters } from './cart-settings-filters';
import { CartSettingsHeader } from './cart-settings-header';
import { CartSettingsPanel } from './cart-settings-panel';
import { CartSettingsTable } from './cart-settings-table';
import { CART_SETTINGS_FEATURE } from './cart-settings.routes';
import { useCartSettings } from './use-cart-settings';

export function CartSettingsPage() {
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
  } = useCartSettings();

  return (
    <section
      className="feature-page"
      data-testid={CART_SETTINGS_FEATURE.testId}
    >
      <CartSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartSettingsPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartSettingsPage;
