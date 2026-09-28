import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsSummaryFilters } from './subscriptions-summary-filters';
import { SubscriptionsSummaryHeader } from './subscriptions-summary-header';
import { SubscriptionsSummaryPanel } from './subscriptions-summary-panel';
import { SubscriptionsSummaryTable } from './subscriptions-summary-table';
import { SUBSCRIPTIONS_SUMMARY_FEATURE } from './subscriptions-summary.routes';
import { useSubscriptionsSummary } from './use-subscriptions-summary';

export function SubscriptionsSummaryPage() {
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
  } = useSubscriptionsSummary();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_SUMMARY_FEATURE.testId}
    >
      <SubscriptionsSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsSummaryPage;
