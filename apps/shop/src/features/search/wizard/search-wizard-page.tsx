import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { SearchWizardFilters } from './search-wizard-filters';
import { SearchWizardHeader } from './search-wizard-header';
import { SearchWizardPanel } from './search-wizard-panel';
import { SearchWizardTable } from './search-wizard-table';
import { SEARCH_WIZARD_FEATURE } from './search-wizard.routes';
import { useSearchWizard } from './use-search-wizard';

export function SearchWizardPage() {
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
  } = useSearchWizard();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_WIZARD_FEATURE.testId}
    >
      <SearchWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchWizardPanel selected={selected} onClear={() => select(null)} />
        </div>
      </div>
    </section>
  );
}

export default SearchWizardPage;
