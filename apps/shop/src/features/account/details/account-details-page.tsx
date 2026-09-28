import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountDetailsFilters } from './account-details-filters';
import { AccountDetailsHeader } from './account-details-header';
import { AccountDetailsPanel } from './account-details-panel';
import { AccountDetailsTable } from './account-details-table';
import { ACCOUNT_DETAILS_FEATURE } from './account-details.routes';
import { useAccountDetails } from './use-account-details';

export function AccountDetailsPage() {
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
  } = useAccountDetails();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_DETAILS_FEATURE.testId}
    >
      <AccountDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountDetailsPage;
