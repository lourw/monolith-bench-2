import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountOverviewSummary } from '../../account/overview/account-overview-summary';
import { LoyaltyListFilters } from './loyalty-list-filters';
import { LoyaltyListHeader } from './loyalty-list-header';
import { LoyaltyListPanel } from './loyalty-list-panel';
import { LoyaltyListTable } from './loyalty-list-table';
import { LOYALTY_LIST_FEATURE } from './loyalty-list.routes';
import { useLoyaltyList } from './use-loyalty-list';

export function LoyaltyListPage() {
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
  } = useLoyaltyList();

  return (
    <section className="feature-page" data-testid={LOYALTY_LIST_FEATURE.testId}>
      <LoyaltyListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyListPanel selected={selected} onClear={() => select(null)} />
          <AccountOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyListPage;
