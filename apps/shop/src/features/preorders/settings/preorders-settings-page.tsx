import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsListSummary } from '../../promotions/list/promotions-list-summary';
import { PreordersSettingsFilters } from './preorders-settings-filters';
import { PreordersSettingsHeader } from './preorders-settings-header';
import { PreordersSettingsPanel } from './preorders-settings-panel';
import { PreordersSettingsTable } from './preorders-settings-table';
import { PREORDERS_SETTINGS_FEATURE } from './preorders-settings.routes';
import { usePreordersSettings } from './use-preorders-settings';

export function PreordersSettingsPage() {
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
  } = usePreordersSettings();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_SETTINGS_FEATURE.testId}
    >
      <PreordersSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PromotionsListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PreordersSettingsPage;
