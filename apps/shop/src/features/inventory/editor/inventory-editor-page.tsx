import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingDetailsSummary } from '../../shipping/details/shipping-details-summary';
import { InventoryEditorFilters } from './inventory-editor-filters';
import { InventoryEditorHeader } from './inventory-editor-header';
import { InventoryEditorPanel } from './inventory-editor-panel';
import { InventoryEditorTable } from './inventory-editor-table';
import { INVENTORY_EDITOR_FEATURE } from './inventory-editor.routes';
import { useInventoryEditor } from './use-inventory-editor';

export function InventoryEditorPage() {
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
  } = useInventoryEditor();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_EDITOR_FEATURE.testId}
    >
      <InventoryEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ShippingDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default InventoryEditorPage;
