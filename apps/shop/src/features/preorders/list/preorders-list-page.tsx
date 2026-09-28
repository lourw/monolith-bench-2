import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersListFilters } from './preorders-list-filters';
import { PreordersListHeader } from './preorders-list-header';
import { PreordersListPanel } from './preorders-list-panel';
import { PreordersListTable } from './preorders-list-table';
import { PREORDERS_LIST_FEATURE } from './preorders-list.routes';
import { usePreordersList } from './use-preorders-list';

export function PreordersListPage() {
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
  } = usePreordersList();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_LIST_FEATURE.testId}
    >
      <PreordersListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersListPage;
