import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportSettingsFilters } from './support-settings-filters';
import { SupportSettingsHeader } from './support-settings-header';
import { SupportSettingsPanel } from './support-settings-panel';
import { SupportSettingsTable } from './support-settings-table';
import { SUPPORT_SETTINGS_FEATURE } from './support-settings.routes';
import { useSupportSettings } from './use-support-settings';

export function SupportSettingsPage() {
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
  } = useSupportSettings();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_SETTINGS_FEATURE.testId}
    >
      <SupportSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportSettingsPage;
