import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareSettingsFilters } from './compare-settings-filters';
import { CompareSettingsHeader } from './compare-settings-header';
import { CompareSettingsPanel } from './compare-settings-panel';
import { CompareSettingsTable } from './compare-settings-table';
import { COMPARE_SETTINGS_FEATURE } from './compare-settings.routes';
import { useCompareSettings } from './use-compare-settings';

export function CompareSettingsPage() {
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
  } = useCompareSettings();

  return (
    <section
      className="feature-page"
      data-testid={COMPARE_SETTINGS_FEATURE.testId}
    >
      <CompareSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CompareSettingsPage;
