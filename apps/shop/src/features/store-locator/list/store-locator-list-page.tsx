import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsEditorSummary } from '../../promotions/editor/promotions-editor-summary';
import { StoreLocatorListFilters } from './store-locator-list-filters';
import { StoreLocatorListHeader } from './store-locator-list-header';
import { StoreLocatorListPanel } from './store-locator-list-panel';
import { StoreLocatorListTable } from './store-locator-list-table';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';
import { useStoreLocatorList } from './use-store-locator-list';

export function StoreLocatorListPage() {
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
  } = useStoreLocatorList();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_LIST_FEATURE.testId}
    >
      <StoreLocatorListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorListPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PromotionsEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorListPage;
