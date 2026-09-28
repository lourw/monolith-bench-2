import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { StoreLocatorEditorFilters } from './store-locator-editor-filters';
import { StoreLocatorEditorHeader } from './store-locator-editor-header';
import { StoreLocatorEditorPanel } from './store-locator-editor-panel';
import { StoreLocatorEditorTable } from './store-locator-editor-table';
import { STORE_LOCATOR_EDITOR_FEATURE } from './store-locator-editor.routes';
import { useStoreLocatorEditor } from './use-store-locator-editor';

export function StoreLocatorEditorPage() {
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
  } = useStoreLocatorEditor();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_EDITOR_FEATURE.testId}
    >
      <StoreLocatorEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorEditorPage;
