import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AccountSummarySummary } from '../../account/summary/account-summary-summary';
import { AddressesEditorFilters } from './addresses-editor-filters';
import { AddressesEditorHeader } from './addresses-editor-header';
import { AddressesEditorPanel } from './addresses-editor-panel';
import { AddressesEditorTable } from './addresses-editor-table';
import { ADDRESSES_EDITOR_FEATURE } from './addresses-editor.routes';
import { useAddressesEditor } from './use-addresses-editor';

export function AddressesEditorPage() {
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
  } = useAddressesEditor();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_EDITOR_FEATURE.testId}
    >
      <AddressesEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AccountSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default AddressesEditorPage;
