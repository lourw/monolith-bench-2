import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartInsightsSummary } from '../../cart/insights/cart-insights-summary';
import { TrackingSettingsFilters } from './tracking-settings-filters';
import { TrackingSettingsHeader } from './tracking-settings-header';
import { TrackingSettingsPanel } from './tracking-settings-panel';
import { TrackingSettingsTable } from './tracking-settings-table';
import { TRACKING_SETTINGS_FEATURE } from './tracking-settings.routes';
import { useTrackingSettings } from './use-tracking-settings';

export function TrackingSettingsPage() {
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
  } = useTrackingSettings();

  return (
    <section
      className="feature-page"
      data-testid={TRACKING_SETTINGS_FEATURE.testId}
    >
      <TrackingSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <TrackingSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <TrackingSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <TrackingSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default TrackingSettingsPage;
