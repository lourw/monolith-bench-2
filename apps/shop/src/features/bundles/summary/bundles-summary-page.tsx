import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesSummaryFilters } from './bundles-summary-filters';
import { BundlesSummaryHeader } from './bundles-summary-header';
import { BundlesSummaryPanel } from './bundles-summary-panel';
import { BundlesSummaryTable } from './bundles-summary-table';
import { BUNDLES_SUMMARY_FEATURE } from './bundles-summary.routes';
import { useBundlesSummary } from './use-bundles-summary';

export function BundlesSummaryPage() {
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
  } = useBundlesSummary();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_SUMMARY_FEATURE.testId}
    >
      <BundlesSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesSummaryPage;
