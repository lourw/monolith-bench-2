import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthSummaryFilters } from './auth-summary-filters';
import { AuthSummaryHeader } from './auth-summary-header';
import { AuthSummaryPanel } from './auth-summary-panel';
import { AuthSummaryTable } from './auth-summary-table';
import { AUTH_SUMMARY_FEATURE } from './auth-summary.routes';
import { useAuthSummary } from './use-auth-summary';

export function AuthSummaryPage() {
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
  } = useAuthSummary();

  return (
    <section className="feature-page" data-testid={AUTH_SUMMARY_FEATURE.testId}>
      <AuthSummaryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthSummaryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthSummaryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthSummaryPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthSummaryPage;
