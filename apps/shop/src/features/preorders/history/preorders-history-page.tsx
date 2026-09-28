import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PreordersHistoryFilters } from './preorders-history-filters';
import { PreordersHistoryHeader } from './preorders-history-header';
import { PreordersHistoryPanel } from './preorders-history-panel';
import { PreordersHistoryTable } from './preorders-history-table';
import { PREORDERS_HISTORY_FEATURE } from './preorders-history.routes';
import { usePreordersHistory } from './use-preorders-history';

export function PreordersHistoryPage() {
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
  } = usePreordersHistory();

  return (
    <section
      className="feature-page"
      data-testid={PREORDERS_HISTORY_FEATURE.testId}
    >
      <PreordersHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PreordersHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PreordersHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PreordersHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default PreordersHistoryPage;
