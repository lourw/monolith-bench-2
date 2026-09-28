import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingSettingsSummary } from '../../shipping/settings/shipping-settings-summary';
import { PromotionsDashboardFilters } from './promotions-dashboard-filters';
import { PromotionsDashboardHeader } from './promotions-dashboard-header';
import { PromotionsDashboardPanel } from './promotions-dashboard-panel';
import { PromotionsDashboardTable } from './promotions-dashboard-table';
import { PROMOTIONS_DASHBOARD_FEATURE } from './promotions-dashboard.routes';
import { usePromotionsDashboard } from './use-promotions-dashboard';

export function PromotionsDashboardPage() {
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
  } = usePromotionsDashboard();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_DASHBOARD_FEATURE.testId}
    >
      <PromotionsDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ShippingSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PromotionsDashboardPage;
