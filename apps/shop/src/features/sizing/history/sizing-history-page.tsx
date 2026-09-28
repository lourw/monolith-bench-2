import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SizingHistoryFilters } from './sizing-history-filters';
import { SizingHistoryHeader } from './sizing-history-header';
import { SizingHistoryPanel } from './sizing-history-panel';
import { SizingHistoryTable } from './sizing-history-table';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';
import { useSizingHistory } from './use-sizing-history';

export function SizingHistoryPage() {
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
  } = useSizingHistory();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_HISTORY_FEATURE.testId}
    >
      <SizingHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SizingHistoryPage;
