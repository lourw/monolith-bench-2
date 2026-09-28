import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsOverviewFilters } from './subscriptions-overview-filters';
import { SubscriptionsOverviewHeader } from './subscriptions-overview-header';
import { SubscriptionsOverviewPanel } from './subscriptions-overview-panel';
import { SubscriptionsOverviewTable } from './subscriptions-overview-table';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';
import { useSubscriptionsOverview } from './use-subscriptions-overview';

export function SubscriptionsOverviewPage() {
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
  } = useSubscriptionsOverview();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}
    >
      <SubscriptionsOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsOverviewPage;
