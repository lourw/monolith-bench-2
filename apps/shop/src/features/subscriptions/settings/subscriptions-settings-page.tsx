import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsHistorySummary } from '../history/subscriptions-history-summary';
import { SubscriptionsSettingsFilters } from './subscriptions-settings-filters';
import { SubscriptionsSettingsHeader } from './subscriptions-settings-header';
import { SubscriptionsSettingsPanel } from './subscriptions-settings-panel';
import { SubscriptionsSettingsTable } from './subscriptions-settings-table';
import { SUBSCRIPTIONS_SETTINGS_FEATURE } from './subscriptions-settings.routes';
import { useSubscriptionsSettings } from './use-subscriptions-settings';

export function SubscriptionsSettingsPage() {
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
  } = useSubscriptionsSettings();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_SETTINGS_FEATURE.testId}
    >
      <SubscriptionsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SubscriptionsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsSettingsPage;
