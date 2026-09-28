import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesListFilters } from './addresses-list-filters';
import { AddressesListHeader } from './addresses-list-header';
import { AddressesListPanel } from './addresses-list-panel';
import { AddressesListTable } from './addresses-list-table';
import { ADDRESSES_LIST_FEATURE } from './addresses-list.routes';
import { useAddressesList } from './use-addresses-list';

export function AddressesListPage() {
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
  } = useAddressesList();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_LIST_FEATURE.testId}
    >
      <AddressesListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AddressesListPage;
