import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutInsightsSummary } from '../../checkout/insights/checkout-insights-summary';
import { SubscriptionsDetailsFilters } from './subscriptions-details-filters';
import { SubscriptionsDetailsHeader } from './subscriptions-details-header';
import { SubscriptionsDetailsPanel } from './subscriptions-details-panel';
import { SubscriptionsDetailsTable } from './subscriptions-details-table';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from './subscriptions-details.routes';
import { useSubscriptionsDetails } from './use-subscriptions-details';

export function SubscriptionsDetailsPage() {
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
  } = useSubscriptionsDetails();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_DETAILS_FEATURE.testId}
    >
      <SubscriptionsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsDetailsPage;
