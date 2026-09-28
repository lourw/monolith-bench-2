import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthInsightsFilters } from './auth-insights-filters';
import { AuthInsightsHeader } from './auth-insights-header';
import { AuthInsightsPanel } from './auth-insights-panel';
import { AuthInsightsTable } from './auth-insights-table';
import { AUTH_INSIGHTS_FEATURE } from './auth-insights.routes';
import { useAuthInsights } from './use-auth-insights';

export function AuthInsightsPage() {
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
  } = useAuthInsights();

  return (
    <section
      className="feature-page"
      data-testid={AUTH_INSIGHTS_FEATURE.testId}
    >
      <AuthInsightsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthInsightsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthInsightsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthInsightsPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthInsightsPage;
