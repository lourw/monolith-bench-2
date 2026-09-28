import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventoryHistoryFilters } from './inventory-history-filters';
import { InventoryHistoryHeader } from './inventory-history-header';
import { InventoryHistoryPanel } from './inventory-history-panel';
import { InventoryHistoryTable } from './inventory-history-table';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';
import { useInventoryHistory } from './use-inventory-history';

export function InventoryHistoryPage() {
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
  } = useInventoryHistory();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_HISTORY_FEATURE.testId}
    >
      <InventoryHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventoryHistoryPage;
