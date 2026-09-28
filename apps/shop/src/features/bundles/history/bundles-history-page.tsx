import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesHistoryFilters } from './bundles-history-filters';
import { BundlesHistoryHeader } from './bundles-history-header';
import { BundlesHistoryPanel } from './bundles-history-panel';
import { BundlesHistoryTable } from './bundles-history-table';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';
import { useBundlesHistory } from './use-bundles-history';

export function BundlesHistoryPage() {
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
  } = useBundlesHistory();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_HISTORY_FEATURE.testId}
    >
      <BundlesHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesHistoryPage;
