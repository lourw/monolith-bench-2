import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ShippingDetailsSummary } from '../../shipping/details/shipping-details-summary';
import { SizingEditorFilters } from './sizing-editor-filters';
import { SizingEditorHeader } from './sizing-editor-header';
import { SizingEditorPanel } from './sizing-editor-panel';
import { SizingEditorTable } from './sizing-editor-table';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';
import { useSizingEditor } from './use-sizing-editor';

export function SizingEditorPage() {
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
  } = useSizingEditor();

  return (
    <section
      className="feature-page"
      data-testid={SIZING_EDITOR_FEATURE.testId}
    >
      <SizingEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SizingEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SizingEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SizingEditorPanel selected={selected} onClear={() => select(null)} />
          <ShippingDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SizingEditorPage;
