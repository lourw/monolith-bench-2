import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { BundlesEditorFilters } from './bundles-editor-filters';
import { BundlesEditorHeader } from './bundles-editor-header';
import { BundlesEditorPanel } from './bundles-editor-panel';
import { BundlesEditorTable } from './bundles-editor-table';
import { BUNDLES_EDITOR_FEATURE } from './bundles-editor.routes';
import { useBundlesEditor } from './use-bundles-editor';

export function BundlesEditorPage() {
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
  } = useBundlesEditor();

  return (
    <section
      className="feature-page"
      data-testid={BUNDLES_EDITOR_FEATURE.testId}
    >
      <BundlesEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <BundlesEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <BundlesEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <BundlesEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default BundlesEditorPage;
