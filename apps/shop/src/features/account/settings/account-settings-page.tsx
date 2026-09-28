import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountSettingsFilters } from './account-settings-filters';
import { AccountSettingsHeader } from './account-settings-header';
import { AccountSettingsPanel } from './account-settings-panel';
import { AccountSettingsTable } from './account-settings-table';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';
import { useAccountSettings } from './use-account-settings';

export function AccountSettingsPage() {
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
  } = useAccountSettings();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_SETTINGS_FEATURE.testId}
    >
      <AccountSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountSettingsPage;
