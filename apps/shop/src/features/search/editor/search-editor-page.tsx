import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsSettingsSummary } from '../../reviews/settings/reviews-settings-summary';
import { SearchEditorFilters } from './search-editor-filters';
import { SearchEditorHeader } from './search-editor-header';
import { SearchEditorPanel } from './search-editor-panel';
import { SearchEditorTable } from './search-editor-table';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';
import { useSearchEditor } from './use-search-editor';

export function SearchEditorPage() {
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
  } = useSearchEditor();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_EDITOR_FEATURE.testId}
    >
      <SearchEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchEditorPanel selected={selected} onClear={() => select(null)} />
          <ReviewsSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SearchEditorPage;
