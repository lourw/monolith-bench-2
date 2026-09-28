import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltySettingsSummary } from '../../loyalty/settings/loyalty-settings-summary';
import { AnalyticsOverviewFilters } from './analytics-overview-filters';
import { AnalyticsOverviewHeader } from './analytics-overview-header';
import { AnalyticsOverviewPanel } from './analytics-overview-panel';
import { AnalyticsOverviewTable } from './analytics-overview-table';
import { ANALYTICS_OVERVIEW_FEATURE } from './analytics-overview.routes';
import { useAnalyticsOverview } from './use-analytics-overview';

export function AnalyticsOverviewPage() {
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
  } = useAnalyticsOverview();

  return (
    <section
      className="feature-page"
      data-testid={ANALYTICS_OVERVIEW_FEATURE.testId}
    >
      <AnalyticsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AnalyticsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AnalyticsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AnalyticsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <LoyaltySettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default AnalyticsOverviewPage;
