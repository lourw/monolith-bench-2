import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventoryInsightsFilters } from './inventory-insights-filters';
import { InventoryInsightsHeader } from './inventory-insights-header';
import { InventoryInsightsPanel } from './inventory-insights-panel';
import { InventoryInsightsTable } from './inventory-insights-table';
import { INVENTORY_INSIGHTS_FEATURE } from './inventory-insights.routes';
import { useInventoryInsights } from './use-inventory-insights';

export function InventoryInsightsPage() {
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
  } = useInventoryInsights();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_INSIGHTS_FEATURE.testId}
    >
      <InventoryInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventoryInsightsPage;
