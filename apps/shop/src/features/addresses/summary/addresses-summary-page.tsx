import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesSummaryFilters } from './addresses-summary-filters';
import { AddressesSummaryHeader } from './addresses-summary-header';
import { AddressesSummaryPanel } from './addresses-summary-panel';
import { AddressesSummaryTable } from './addresses-summary-table';
import { ADDRESSES_SUMMARY_FEATURE } from './addresses-summary.routes';
import { useAddressesSummary } from './use-addresses-summary';

export function AddressesSummaryPage() {
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
  } = useAddressesSummary();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_SUMMARY_FEATURE.testId}
    >
      <AddressesSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesSummaryPage;
