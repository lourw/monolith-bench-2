import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { CompareListSummary } from '../../compare/list/compare-list-summary';
import { SubscriptionsEditorFilters } from './subscriptions-editor-filters';
import { SubscriptionsEditorHeader } from './subscriptions-editor-header';
import { SubscriptionsEditorPanel } from './subscriptions-editor-panel';
import { SubscriptionsEditorTable } from './subscriptions-editor-table';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';
import { useSubscriptionsEditor } from './use-subscriptions-editor';

export function SubscriptionsEditorPage() {
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
  } = useSubscriptionsEditor();

  return (
    <section
      className="feature-page"
      data-testid={SUBSCRIPTIONS_EDITOR_FEATURE.testId}
    >
      <SubscriptionsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SubscriptionsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SubscriptionsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SubscriptionsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CompareListSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsEditorPage;
