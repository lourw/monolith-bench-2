import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReturnsHistoryFilters } from './returns-history-filters';
import { ReturnsHistoryHeader } from './returns-history-header';
import { ReturnsHistoryPanel } from './returns-history-panel';
import { ReturnsHistoryTable } from './returns-history-table';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';
import { useReturnsHistory } from './use-returns-history';

export function ReturnsHistoryPage() {
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
  } = useReturnsHistory();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_HISTORY_FEATURE.testId}
    >
      <ReturnsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnsHistoryPage;
