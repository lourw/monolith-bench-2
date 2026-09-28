import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PaymentsHistorySummary } from '../../payments/history/payments-history-summary';
import { InventoryOverviewFilters } from './inventory-overview-filters';
import { InventoryOverviewHeader } from './inventory-overview-header';
import { InventoryOverviewPanel } from './inventory-overview-panel';
import { InventoryOverviewTable } from './inventory-overview-table';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';
import { useInventoryOverview } from './use-inventory-overview';

export function InventoryOverviewPage() {
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
  } = useInventoryOverview();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_OVERVIEW_FEATURE.testId}
    >
      <InventoryOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PaymentsHistorySummary compact />
        </div>
      </div>
    </section>
  );
}

export default InventoryOverviewPage;
