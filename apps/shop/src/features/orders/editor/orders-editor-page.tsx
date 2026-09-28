import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersEditorFilters } from './orders-editor-filters';
import { OrdersEditorHeader } from './orders-editor-header';
import { OrdersEditorPanel } from './orders-editor-panel';
import { OrdersEditorTable } from './orders-editor-table';
import { ORDERS_EDITOR_FEATURE } from './orders-editor.routes';
import { useOrdersEditor } from './use-orders-editor';

export function OrdersEditorPage() {
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
  } = useOrdersEditor();

  return (
    <section
      className="feature-page"
      data-testid={ORDERS_EDITOR_FEATURE.testId}
    >
      <OrdersEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <OrdersEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <OrdersEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <OrdersEditorPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default OrdersEditorPage;
