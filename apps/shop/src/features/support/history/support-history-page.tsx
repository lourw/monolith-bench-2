import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportHistoryFilters } from './support-history-filters';
import { SupportHistoryHeader } from './support-history-header';
import { SupportHistoryPanel } from './support-history-panel';
import { SupportHistoryTable } from './support-history-table';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';
import { useSupportHistory } from './use-support-history';

export function SupportHistoryPage() {
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
  } = useSupportHistory();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_HISTORY_FEATURE.testId}
    >
      <SupportHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportHistoryPage;
