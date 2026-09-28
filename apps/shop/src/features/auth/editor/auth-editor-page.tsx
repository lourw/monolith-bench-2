import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AuthEditorFilters } from './auth-editor-filters';
import { AuthEditorHeader } from './auth-editor-header';
import { AuthEditorPanel } from './auth-editor-panel';
import { AuthEditorTable } from './auth-editor-table';
import { AUTH_EDITOR_FEATURE } from './auth-editor.routes';
import { useAuthEditor } from './use-auth-editor';

export function AuthEditorPage() {
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
  } = useAuthEditor();

  return (
    <section className="feature-page" data-testid={AUTH_EDITOR_FEATURE.testId}>
      <AuthEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthEditorPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default AuthEditorPage;
