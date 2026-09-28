import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingSettingsFilters } from './sizing-settings-filters';
import { SizingSettingsHeader } from './sizing-settings-header';
import { SizingSettingsPanel } from './sizing-settings-panel';
import { SizingSettingsTable } from './sizing-settings-table';
import { SIZING_SETTINGS_FEATURE } from './sizing-settings.routes';
import { useSizingSettings } from './use-sizing-settings';

export function SizingSettingsPage() {
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
  } = useSizingSettings();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_SETTINGS_FEATURE.testId}
    >
      <SizingSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingSettingsPage;
