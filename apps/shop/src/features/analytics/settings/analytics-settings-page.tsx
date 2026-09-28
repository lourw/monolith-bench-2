import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareHistorySummary } from '../../compare/history/compare-history-summary';
import { AnalyticsSettingsFilters } from './analytics-settings-filters';
import { AnalyticsSettingsHeader } from './analytics-settings-header';
import { AnalyticsSettingsPanel } from './analytics-settings-panel';
import { AnalyticsSettingsTable } from './analytics-settings-table';
import { ANALYTICS_SETTINGS_FEATURE } from './analytics-settings.routes';
import { useAnalyticsSettings } from './use-analytics-settings';

export function AnalyticsSettingsPage() {
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
  } = useAnalyticsSettings();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_SETTINGS_FEATURE.testId}
    >
      <AnalyticsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CompareHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsSettingsPage;
