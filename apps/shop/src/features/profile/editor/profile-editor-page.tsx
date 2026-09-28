import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ProfileEditorFilters } from './profile-editor-filters';
import { ProfileEditorHeader } from './profile-editor-header';
import { ProfileEditorPanel } from './profile-editor-panel';
import { ProfileEditorTable } from './profile-editor-table';
import { PROFILE_EDITOR_FEATURE } from './profile-editor.routes';
import { useProfileEditor } from './use-profile-editor';

export function ProfileEditorPage() {
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
  } = useProfileEditor();

  return (
    <section
      className="feature-page"
      data-testid={PROFILE_EDITOR_FEATURE.testId}
    >
      <ProfileEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ProfileEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ProfileEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ProfileEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileEditorPage;
