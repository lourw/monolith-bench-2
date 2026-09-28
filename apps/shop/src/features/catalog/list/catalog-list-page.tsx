import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogListFilters } from './catalog-list-filters';
import { CatalogListHeader } from './catalog-list-header';
import { CatalogListPanel } from './catalog-list-panel';
import { CatalogListTable } from './catalog-list-table';
import { CATALOG_LIST_FEATURE } from './catalog-list.routes';
import { useCatalogList } from './use-catalog-list';

export function CatalogListPage() {
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
  } = useCatalogList();

  return (
    <section className="feature-page" data-testid={CATALOG_LIST_FEATURE.testId}>
      <CatalogListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CatalogListPage;
