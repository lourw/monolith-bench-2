import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingInsightsSummary } from '../../shipping/insights/shipping-insights-summary';
import { SupportInsightsFilters } from './support-insights-filters';
import { SupportInsightsHeader } from './support-insights-header';
import { SupportInsightsPanel } from './support-insights-panel';
import { SupportInsightsTable } from './support-insights-table';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';
import { useSupportInsights } from './use-support-insights';

export function SupportInsightsPage() {
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
  } = useSupportInsights();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_INSIGHTS_FEATURE.testId}
    >
      <SupportInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ShippingInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SupportInsightsPage;
