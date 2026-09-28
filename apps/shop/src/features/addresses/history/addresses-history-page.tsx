import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesHistoryFilters } from './addresses-history-filters';
import { AddressesHistoryHeader } from './addresses-history-header';
import { AddressesHistoryPanel } from './addresses-history-panel';
import { AddressesHistoryTable } from './addresses-history-table';
import { ADDRESSES_HISTORY_FEATURE } from './addresses-history.routes';
import { useAddressesHistory } from './use-addresses-history';

export function AddressesHistoryPage() {
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
  } = useAddressesHistory();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_HISTORY_FEATURE.testId}
    >
      <AddressesHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesHistoryPage;
