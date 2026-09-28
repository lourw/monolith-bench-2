import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsListFilters } from './returns-list-filters';
import { ReturnsListHeader } from './returns-list-header';
import { ReturnsListPanel } from './returns-list-panel';
import { ReturnsListTable } from './returns-list-table';
import { RETURNS_LIST_FEATURE } from './returns-list.routes';
import { useReturnsList } from './use-returns-list';

export function ReturnsListPage() {
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
  } = useReturnsList();

  return (
    <section className="feature-page" data-testid={RETURNS_LIST_FEATURE.testId}>
      <ReturnsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default ReturnsListPage;
