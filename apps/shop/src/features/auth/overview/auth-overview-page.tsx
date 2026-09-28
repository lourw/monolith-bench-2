import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthOverviewFilters } from './auth-overview-filters';
import { AuthOverviewHeader } from './auth-overview-header';
import { AuthOverviewPanel } from './auth-overview-panel';
import { AuthOverviewTable } from './auth-overview-table';
import { AUTH_OVERVIEW_FEATURE } from './auth-overview.routes';
import { useAuthOverview } from './use-auth-overview';

export function AuthOverviewPage() {
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
  } = useAuthOverview();

  return (
    <section
      className="feature-page"
      data-testid={AUTH_OVERVIEW_FEATURE.testId}
    >
      <AuthOverviewHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthOverviewFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthOverviewTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthOverviewPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthOverviewPage;
