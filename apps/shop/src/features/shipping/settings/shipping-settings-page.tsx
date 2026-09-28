import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingSettingsFilters } from './shipping-settings-filters';
import { ShippingSettingsHeader } from './shipping-settings-header';
import { ShippingSettingsPanel } from './shipping-settings-panel';
import { ShippingSettingsTable } from './shipping-settings-table';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';
import { useShippingSettings } from './use-shipping-settings';

export function ShippingSettingsPage() {
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
  } = useShippingSettings();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_SETTINGS_FEATURE.testId}
    >
      <ShippingSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingSettingsPage;
