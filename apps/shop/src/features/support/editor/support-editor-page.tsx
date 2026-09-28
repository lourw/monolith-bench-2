import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SupportEditorFilters } from './support-editor-filters';
import { SupportEditorHeader } from './support-editor-header';
import { SupportEditorPanel } from './support-editor-panel';
import { SupportEditorTable } from './support-editor-table';
import { SUPPORT_EDITOR_FEATURE } from './support-editor.routes';
import { useSupportEditor } from './use-support-editor';

export function SupportEditorPage() {
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
  } = useSupportEditor();

  return (
    <section
      className="feature-page"
      data-testid={SUPPORT_EDITOR_FEATURE.testId}
    >
      <SupportEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SupportEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SupportEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SupportEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SupportEditorPage;
