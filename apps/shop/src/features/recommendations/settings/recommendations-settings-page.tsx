import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsSettingsFilters } from './recommendations-settings-filters';
import { RecommendationsSettingsHeader } from './recommendations-settings-header';
import { RecommendationsSettingsPanel } from './recommendations-settings-panel';
import { RecommendationsSettingsTable } from './recommendations-settings-table';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from './recommendations-settings.routes';
import { useRecommendationsSettings } from './use-recommendations-settings';

export function RecommendationsSettingsPage() {
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
  } = useRecommendationsSettings();

  return (
    <section
      className="feature-page"
      data-testid={RECOMMENDATIONS_SETTINGS_FEATURE.testId}
    >
      <RecommendationsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <RecommendationsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <RecommendationsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <RecommendationsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default RecommendationsSettingsPage;
