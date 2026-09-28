import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchSettingsFilters } from './search-settings-filters';
import { SearchSettingsHeader } from './search-settings-header';
import { SearchSettingsPanel } from './search-settings-panel';
import { SearchSettingsTable } from './search-settings-table';
import { SEARCH_SETTINGS_FEATURE } from './search-settings.routes';
import { useSearchSettings } from './use-search-settings';

export function SearchSettingsPage() {
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
  } = useSearchSettings();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_SETTINGS_FEATURE.testId}
    >
      <SearchSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchSettingsPage;
