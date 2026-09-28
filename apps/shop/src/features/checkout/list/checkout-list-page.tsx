import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutSettingsSummary } from '../settings/checkout-settings-summary';
import { CheckoutListFilters } from './checkout-list-filters';
import { CheckoutListHeader } from './checkout-list-header';
import { CheckoutListPanel } from './checkout-list-panel';
import { CheckoutListTable } from './checkout-list-table';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';
import { useCheckoutList } from './use-checkout-list';

export function CheckoutListPage() {
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
  } = useCheckoutList();

  return (
    <section
      className="feature-page"
      data-testid={CHECKOUT_LIST_FEATURE.testId}
    >
      <CheckoutListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CheckoutListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CheckoutListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CheckoutListPanel selected={selected} onClear={() => select(null)} />
          <CheckoutSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CheckoutListPage;
