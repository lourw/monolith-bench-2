import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthDetailsFilters } from './auth-details-filters';
import { AuthDetailsHeader } from './auth-details-header';
import { AuthDetailsPanel } from './auth-details-panel';
import { AuthDetailsTable } from './auth-details-table';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';
import { useAuthDetails } from './use-auth-details';

export function AuthDetailsPage() {
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
  } = useAuthDetails();

  return (
    <section className="feature-page" data-testid={AUTH_DETAILS_FEATURE.testId}>
      <AuthDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthDetailsPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthDetailsPage;
