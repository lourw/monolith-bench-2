import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountInsightsFilters } from './account-insights-filters';
import { AccountInsightsHeader } from './account-insights-header';
import { AccountInsightsPanel } from './account-insights-panel';
import { AccountInsightsTable } from './account-insights-table';
import { ACCOUNT_INSIGHTS_FEATURE } from './account-insights.routes';
import { useAccountInsights } from './use-account-insights';

export function AccountInsightsPage() {
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
  } = useAccountInsights();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_INSIGHTS_FEATURE.testId}
    >
      <AccountInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountInsightsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountInsightsPage;
