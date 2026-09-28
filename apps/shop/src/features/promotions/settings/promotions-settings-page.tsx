import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsSettingsFilters } from './promotions-settings-filters';
import { PromotionsSettingsHeader } from './promotions-settings-header';
import { PromotionsSettingsPanel } from './promotions-settings-panel';
import { PromotionsSettingsTable } from './promotions-settings-table';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';
import { usePromotionsSettings } from './use-promotions-settings';

export function PromotionsSettingsPage() {
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
  } = usePromotionsSettings();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_SETTINGS_FEATURE.testId}
    >
      <PromotionsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionsSettingsPage;
