import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountOverviewFilters } from './account-overview-filters';
import { AccountOverviewHeader } from './account-overview-header';
import { AccountOverviewPanel } from './account-overview-panel';
import { AccountOverviewTable } from './account-overview-table';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import { useAccountOverview } from './use-account-overview';

export function AccountOverviewPage() {
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
  } = useAccountOverview();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_OVERVIEW_FEATURE.testId}
    >
      <AccountOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountOverviewPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountOverviewPage;
