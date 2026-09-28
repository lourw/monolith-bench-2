import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthHistoryFilters } from './auth-history-filters';
import { AuthHistoryHeader } from './auth-history-header';
import { AuthHistoryPanel } from './auth-history-panel';
import { AuthHistoryTable } from './auth-history-table';
import { AUTH_HISTORY_FEATURE } from './auth-history.routes';
import { useAuthHistory } from './use-auth-history';

export function AuthHistoryPage() {
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
  } = useAuthHistory();

  return (
    <section className="feature-page" data-testid={AUTH_HISTORY_FEATURE.testId}>
      <AuthHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthHistoryPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthHistoryPage;
