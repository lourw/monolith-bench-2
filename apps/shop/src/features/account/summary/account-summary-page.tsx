import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountSummaryFilters } from './account-summary-filters';
import { AccountSummaryHeader } from './account-summary-header';
import { AccountSummaryPanel } from './account-summary-panel';
import { AccountSummaryTable } from './account-summary-table';
import { ACCOUNT_SUMMARY_FEATURE } from './account-summary.routes';
import { useAccountSummary } from './use-account-summary';

export function AccountSummaryPage() {
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
  } = useAccountSummary();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_SUMMARY_FEATURE.testId}
    >
      <AccountSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountSummaryPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountSummaryPage;
