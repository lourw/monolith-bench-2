import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartDashboardSummary } from '../../cart/dashboard/cart-dashboard-summary';
import { CheckoutSettingsFilters } from './checkout-settings-filters';
import { CheckoutSettingsHeader } from './checkout-settings-header';
import { CheckoutSettingsPanel } from './checkout-settings-panel';
import { CheckoutSettingsTable } from './checkout-settings-table';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';
import { useCheckoutSettings } from './use-checkout-settings';

export function CheckoutSettingsPage() {
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
  } = useCheckoutSettings();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_SETTINGS_FEATURE.testId}
    >
      <CheckoutSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartDashboardSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutSettingsPage;
