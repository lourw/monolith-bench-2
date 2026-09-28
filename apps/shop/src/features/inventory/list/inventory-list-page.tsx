import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventoryListFilters } from './inventory-list-filters';
import { InventoryListHeader } from './inventory-list-header';
import { InventoryListPanel } from './inventory-list-panel';
import { InventoryListTable } from './inventory-list-table';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';
import { useInventoryList } from './use-inventory-list';

export function InventoryListPage() {
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
  } = useInventoryList();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_LIST_FEATURE.testId}
    >
      <InventoryListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventoryListPage;
