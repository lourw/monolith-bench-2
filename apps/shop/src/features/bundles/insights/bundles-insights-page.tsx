import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesInsightsFilters } from './bundles-insights-filters';
import { BundlesInsightsHeader } from './bundles-insights-header';
import { BundlesInsightsPanel } from './bundles-insights-panel';
import { BundlesInsightsTable } from './bundles-insights-table';
import { BUNDLES_INSIGHTS_FEATURE } from './bundles-insights.routes';
import { useBundlesInsights } from './use-bundles-insights';

export function BundlesInsightsPage() {
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
  } = useBundlesInsights();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_INSIGHTS_FEATURE.testId}
    >
      <BundlesInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesInsightsPage;
