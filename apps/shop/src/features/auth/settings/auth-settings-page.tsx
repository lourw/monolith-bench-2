import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthSettingsFilters } from './auth-settings-filters';
import { AuthSettingsHeader } from './auth-settings-header';
import { AuthSettingsPanel } from './auth-settings-panel';
import { AuthSettingsTable } from './auth-settings-table';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';
import { useAuthSettings } from './use-auth-settings';

export function AuthSettingsPage() {
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
  } = useAuthSettings();

  return (
    <section
      className="feature-page"
      data-testid={AUTH_SETTINGS_FEATURE.testId}
    >
      <AuthSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthSettingsPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthSettingsPage;
