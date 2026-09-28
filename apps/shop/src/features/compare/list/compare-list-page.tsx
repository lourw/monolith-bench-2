import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareListFilters } from './compare-list-filters';
import { CompareListHeader } from './compare-list-header';
import { CompareListPanel } from './compare-list-panel';
import { CompareListTable } from './compare-list-table';
import { COMPARE_LIST_FEATURE } from './compare-list.routes';
import { useCompareList } from './use-compare-list';

export function CompareListPage() {
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
  } = useCompareList();

  return (
    <section className="feature-page" data-testid={COMPARE_LIST_FEATURE.testId}>
      <CompareListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CompareListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CompareListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CompareListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default CompareListPage;
