import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsSummarySummary } from '../../recommendations/summary/recommendations-summary-summary';
import { PaymentsListFilters } from './payments-list-filters';
import { PaymentsListHeader } from './payments-list-header';
import { PaymentsListPanel } from './payments-list-panel';
import { PaymentsListTable } from './payments-list-table';
import { PAYMENTS_LIST_FEATURE } from './payments-list.routes';
import { usePaymentsList } from './use-payments-list';

export function PaymentsListPage() {
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
  } = usePaymentsList();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_LIST_FEATURE.testId}
    >
      <PaymentsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsListPanel selected={selected} onClear={() => select(null)} />
          <RecommendationsSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsListPage;
