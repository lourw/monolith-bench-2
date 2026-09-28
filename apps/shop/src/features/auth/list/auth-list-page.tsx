import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthListFilters } from './auth-list-filters';
import { AuthListHeader } from './auth-list-header';
import { AuthListPanel } from './auth-list-panel';
import { AuthListTable } from './auth-list-table';
import { AUTH_LIST_FEATURE } from './auth-list.routes';
import { useAuthList } from './use-auth-list';

export function AuthListPage() {
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
  } = useAuthList();

  return (
    <section className="feature-page" data-testid={AUTH_LIST_FEATURE.testId}>
      <AuthListHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthListFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthListTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthListPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthListPage;
