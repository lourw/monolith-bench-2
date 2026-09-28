import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltyHistoryFilters } from './loyalty-history-filters';
import { LoyaltyHistoryHeader } from './loyalty-history-header';
import { LoyaltyHistoryPanel } from './loyalty-history-panel';
import { LoyaltyHistoryTable } from './loyalty-history-table';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';
import { useLoyaltyHistory } from './use-loyalty-history';

export function LoyaltyHistoryPage() {
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
  } = useLoyaltyHistory();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_HISTORY_FEATURE.testId}
    >
      <LoyaltyHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyHistoryPage;
