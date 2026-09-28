import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsSettingsFilters } from './payments-settings-filters';
import { PaymentsSettingsHeader } from './payments-settings-header';
import { PaymentsSettingsPanel } from './payments-settings-panel';
import { PaymentsSettingsTable } from './payments-settings-table';
import { PAYMENTS_SETTINGS_FEATURE } from './payments-settings.routes';
import { usePaymentsSettings } from './use-payments-settings';

export function PaymentsSettingsPage() {
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
  } = usePaymentsSettings();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_SETTINGS_FEATURE.testId}
    >
      <PaymentsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentsSettingsPage;
