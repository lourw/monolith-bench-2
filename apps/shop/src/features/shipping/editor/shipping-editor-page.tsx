import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingEditorFilters } from './shipping-editor-filters';
import { ShippingEditorHeader } from './shipping-editor-header';
import { ShippingEditorPanel } from './shipping-editor-panel';
import { ShippingEditorTable } from './shipping-editor-table';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';
import { useShippingEditor } from './use-shipping-editor';

export function ShippingEditorPage() {
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
  } = useShippingEditor();

  return (
    <section
      className="feature-page"
      data-testid={SHIPPING_EDITOR_FEATURE.testId}
    >
      <ShippingEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ShippingEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ShippingEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ShippingEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ShippingEditorPage;
