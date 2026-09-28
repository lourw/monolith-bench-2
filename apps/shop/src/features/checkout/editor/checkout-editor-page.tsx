import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutEditorFilters } from './checkout-editor-filters';
import { CheckoutEditorHeader } from './checkout-editor-header';
import { CheckoutEditorPanel } from './checkout-editor-panel';
import { CheckoutEditorTable } from './checkout-editor-table';
import { CHECKOUT_EDITOR_FEATURE } from './checkout-editor.routes';
import { useCheckoutEditor } from './use-checkout-editor';

export function CheckoutEditorPage() {
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
  } = useCheckoutEditor();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_EDITOR_FEATURE.testId}
    >
      <CheckoutEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CheckoutEditorPage;
