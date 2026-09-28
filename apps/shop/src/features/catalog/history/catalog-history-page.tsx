import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CatalogHistoryFilters } from './catalog-history-filters';
import { CatalogHistoryHeader } from './catalog-history-header';
import { CatalogHistoryPanel } from './catalog-history-panel';
import { CatalogHistoryTable } from './catalog-history-table';
import { CATALOG_HISTORY_FEATURE } from './catalog-history.routes';
import { useCatalogHistory } from './use-catalog-history';

export function CatalogHistoryPage() {
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
  } = useCatalogHistory();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_HISTORY_FEATURE.testId}
    >
      <CatalogHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default CatalogHistoryPage;
