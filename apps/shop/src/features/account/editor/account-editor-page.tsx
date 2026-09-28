import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CheckoutListSummary } from '../../checkout/list/checkout-list-summary';
import { AccountEditorFilters } from './account-editor-filters';
import { AccountEditorHeader } from './account-editor-header';
import { AccountEditorPanel } from './account-editor-panel';
import { AccountEditorTable } from './account-editor-table';
import { ACCOUNT_EDITOR_FEATURE } from './account-editor.routes';
import { useAccountEditor } from './use-account-editor';

export function AccountEditorPage() {
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
  } = useAccountEditor();

  return (
    <section
      className="feature-page"
      data-testid={ACCOUNT_EDITOR_FEATURE.testId}
    >
      <AccountEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AccountEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AccountEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AccountEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CheckoutListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default AccountEditorPage;
