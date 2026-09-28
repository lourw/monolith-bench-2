import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { RecommendationsOverviewSummary } from '../../recommendations/overview/recommendations-overview-summary';
import { PaymentsEditorFilters } from './payments-editor-filters';
import { PaymentsEditorHeader } from './payments-editor-header';
import { PaymentsEditorPanel } from './payments-editor-panel';
import { PaymentsEditorTable } from './payments-editor-table';
import { PAYMENTS_EDITOR_FEATURE } from './payments-editor.routes';
import { usePaymentsEditor } from './use-payments-editor';

export function PaymentsEditorPage() {
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
  } = usePaymentsEditor();

  return (
    <section
      className="feature-page"
      data-testid={PAYMENTS_EDITOR_FEATURE.testId}
    >
      <PaymentsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PaymentsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PaymentsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PaymentsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <RecommendationsOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PaymentsEditorPage;
