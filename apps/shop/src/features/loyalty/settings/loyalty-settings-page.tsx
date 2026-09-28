import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltySettingsFilters } from './loyalty-settings-filters';
import { LoyaltySettingsHeader } from './loyalty-settings-header';
import { LoyaltySettingsPanel } from './loyalty-settings-panel';
import { LoyaltySettingsTable } from './loyalty-settings-table';
import { LOYALTY_SETTINGS_FEATURE } from './loyalty-settings.routes';
import { useLoyaltySettings } from './use-loyalty-settings';

export function LoyaltySettingsPage() {
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
  } = useLoyaltySettings();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_SETTINGS_FEATURE.testId}
    >
      <LoyaltySettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltySettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltySettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltySettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltySettingsPage;
