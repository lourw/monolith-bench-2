import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutInsightsSummary } from '../../checkout/insights/checkout-insights-summary';
import { OrdersSettingsFilters } from './orders-settings-filters';
import { OrdersSettingsHeader } from './orders-settings-header';
import { OrdersSettingsPanel } from './orders-settings-panel';
import { OrdersSettingsTable } from './orders-settings-table';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';
import { useOrdersSettings } from './use-orders-settings';

export function OrdersSettingsPage() {
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
  } = useOrdersSettings();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_SETTINGS_FEATURE.testId}
    >
      <OrdersSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default OrdersSettingsPage;
