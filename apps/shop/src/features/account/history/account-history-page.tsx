import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { OrdersSummarySummary } from '../../orders/summary/orders-summary-summary';
import { AccountHistoryFilters } from './account-history-filters';
import { AccountHistoryHeader } from './account-history-header';
import { AccountHistoryPanel } from './account-history-panel';
import { AccountHistoryTable } from './account-history-table';
import { ACCOUNT_HISTORY_FEATURE } from './account-history.routes';
import { useAccountHistory } from './use-account-history';

export function AccountHistoryPage() {
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
  } = useAccountHistory();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_HISTORY_FEATURE.testId}
    >
      <AccountHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <OrdersSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default AccountHistoryPage;
