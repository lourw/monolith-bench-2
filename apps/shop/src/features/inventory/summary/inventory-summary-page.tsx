import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistSummarySummary } from '../../wishlist/summary/wishlist-summary-summary';
import { InventorySummaryFilters } from './inventory-summary-filters';
import { InventorySummaryHeader } from './inventory-summary-header';
import { InventorySummaryPanel } from './inventory-summary-panel';
import { InventorySummaryTable } from './inventory-summary-table';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';
import { useInventorySummary } from './use-inventory-summary';

export function InventorySummaryPage() {
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
  } = useInventorySummary();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_SUMMARY_FEATURE.testId}
    >
      <InventorySummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventorySummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventorySummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventorySummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default InventorySummaryPage;
