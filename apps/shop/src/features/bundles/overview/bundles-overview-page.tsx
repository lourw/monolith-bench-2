import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesOverviewFilters } from './bundles-overview-filters';
import { BundlesOverviewHeader } from './bundles-overview-header';
import { BundlesOverviewPanel } from './bundles-overview-panel';
import { BundlesOverviewTable } from './bundles-overview-table';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';
import { useBundlesOverview } from './use-bundles-overview';

export function BundlesOverviewPage() {
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
  } = useBundlesOverview();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_OVERVIEW_FEATURE.testId}
    >
      <BundlesOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesOverviewPage;
