import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsSettingsFilters } from './notifications-settings-filters';
import { NotificationsSettingsHeader } from './notifications-settings-header';
import { NotificationsSettingsPanel } from './notifications-settings-panel';
import { NotificationsSettingsTable } from './notifications-settings-table';
import { NOTIFICATIONS_SETTINGS_FEATURE } from './notifications-settings.routes';
import { useNotificationsSettings } from './use-notifications-settings';

export function NotificationsSettingsPage() {
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
  } = useNotificationsSettings();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_SETTINGS_FEATURE.testId}
    >
      <NotificationsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default NotificationsSettingsPage;
