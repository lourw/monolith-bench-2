import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingListFilters } from './sizing-list-filters';
import { SizingListHeader } from './sizing-list-header';
import { SizingListPanel } from './sizing-list-panel';
import { SizingListTable } from './sizing-list-table';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';
import { useSizingList } from './use-sizing-list';

export function SizingListPage() {
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
  } = useSizingList();

  return (
    <section className="feature-page" data-testid={SIZING_LIST_FEATURE.testId}>
      <SizingListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default SizingListPage;
