import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesSettingsFilters } from './addresses-settings-filters';
import { AddressesSettingsHeader } from './addresses-settings-header';
import { AddressesSettingsPanel } from './addresses-settings-panel';
import { AddressesSettingsTable } from './addresses-settings-table';
import { ADDRESSES_SETTINGS_FEATURE } from './addresses-settings.routes';
import { useAddressesSettings } from './use-addresses-settings';

export function AddressesSettingsPage() {
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
  } = useAddressesSettings();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_SETTINGS_FEATURE.testId}
    >
      <AddressesSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesSettingsPage;
