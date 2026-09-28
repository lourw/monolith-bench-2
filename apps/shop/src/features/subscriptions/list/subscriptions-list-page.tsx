import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SubscriptionsListFilters } from './subscriptions-list-filters';
import { SubscriptionsListHeader } from './subscriptions-list-header';
import { SubscriptionsListPanel } from './subscriptions-list-panel';
import { SubscriptionsListTable } from './subscriptions-list-table';
import { SUBSCRIPTIONS_LIST_FEATURE } from './subscriptions-list.routes';
import { useSubscriptionsList } from './use-subscriptions-list';

export function SubscriptionsListPage() {
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
  } = useSubscriptionsList();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_LIST_FEATURE.testId}
    >
      <SubscriptionsListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsListPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsListPage;
