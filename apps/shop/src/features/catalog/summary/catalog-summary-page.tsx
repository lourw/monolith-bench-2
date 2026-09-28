import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PromotionsListSummary } from '../../promotions/list/promotions-list-summary';
import { CatalogSummaryFilters } from './catalog-summary-filters';
import { CatalogSummaryHeader } from './catalog-summary-header';
import { CatalogSummaryPanel } from './catalog-summary-panel';
import { CatalogSummaryTable } from './catalog-summary-table';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';
import { useCatalogSummary } from './use-catalog-summary';

export function CatalogSummaryPage() {
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
  } = useCatalogSummary();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_SUMMARY_FEATURE.testId}
    >
      <CatalogSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <PromotionsListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CatalogSummaryPage;
