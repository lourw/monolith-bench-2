import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchDetailsSummary } from '../../search/details/search-details-summary';
import { NotificationsEditorFilters } from './notifications-editor-filters';
import { NotificationsEditorHeader } from './notifications-editor-header';
import { NotificationsEditorPanel } from './notifications-editor-panel';
import { NotificationsEditorTable } from './notifications-editor-table';
import { NOTIFICATIONS_EDITOR_FEATURE } from './notifications-editor.routes';
import { useNotificationsEditor } from './use-notifications-editor';

export function NotificationsEditorPage() {
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
  } = useNotificationsEditor();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_EDITOR_FEATURE.testId}
    >
      <NotificationsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SearchDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default NotificationsEditorPage;
