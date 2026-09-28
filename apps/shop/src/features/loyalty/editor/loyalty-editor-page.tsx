import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { LoyaltyEditorFilters } from './loyalty-editor-filters';
import { LoyaltyEditorHeader } from './loyalty-editor-header';
import { LoyaltyEditorPanel } from './loyalty-editor-panel';
import { LoyaltyEditorTable } from './loyalty-editor-table';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';
import { useLoyaltyEditor } from './use-loyalty-editor';

export function LoyaltyEditorPage() {
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
  } = useLoyaltyEditor();

  return (
    <section
      className="feature-page"
      data-testid={LOYALTY_EDITOR_FEATURE.testId}
    >
      <LoyaltyEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <LoyaltyEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <LoyaltyEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <LoyaltyEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default LoyaltyEditorPage;
