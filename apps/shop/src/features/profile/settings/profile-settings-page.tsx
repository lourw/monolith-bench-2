import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesListSummary } from '../../bundles/list/bundles-list-summary';
import { ProfileSettingsFilters } from './profile-settings-filters';
import { ProfileSettingsHeader } from './profile-settings-header';
import { ProfileSettingsPanel } from './profile-settings-panel';
import { ProfileSettingsTable } from './profile-settings-table';
import { PROFILE_SETTINGS_FEATURE } from './profile-settings.routes';
import { useProfileSettings } from './use-profile-settings';

export function ProfileSettingsPage() {
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
  } = useProfileSettings();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_SETTINGS_FEATURE.testId}
    >
      <ProfileSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <BundlesListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default ProfileSettingsPage;
