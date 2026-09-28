import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesSummarySummary } from '../../addresses/summary/addresses-summary-summary';
import { PaymentsHistoryFilters } from './payments-history-filters';
import { PaymentsHistoryHeader } from './payments-history-header';
import { PaymentsHistoryPanel } from './payments-history-panel';
import { PaymentsHistoryTable } from './payments-history-table';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';
import { usePaymentsHistory } from './use-payments-history';

export function PaymentsHistoryPage() {
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
  } = usePaymentsHistory();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_HISTORY_FEATURE.testId}
    >
      <PaymentsHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AddressesSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsHistoryPage;
