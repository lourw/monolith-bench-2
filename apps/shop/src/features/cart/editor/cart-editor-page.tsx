import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CartEditorFilters } from './cart-editor-filters';
import { CartEditorHeader } from './cart-editor-header';
import { CartEditorPanel } from './cart-editor-panel';
import { CartEditorTable } from './cart-editor-table';
import { CART_EDITOR_FEATURE } from './cart-editor.routes';
import { useCartEditor } from './use-cart-editor';

export function CartEditorPage() {
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
  } = useCartEditor();

  return (
    <section className="feature-page" data-testid={CART_EDITOR_FEATURE.testId}>
      <CartEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CartEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CartEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CartEditorPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CartEditorPage;
