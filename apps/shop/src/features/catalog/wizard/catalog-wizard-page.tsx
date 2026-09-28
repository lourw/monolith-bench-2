import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistEditorSummary } from '../../wishlist/editor/wishlist-editor-summary';
import { CatalogWizardFilters } from './catalog-wizard-filters';
import { CatalogWizardHeader } from './catalog-wizard-header';
import { CatalogWizardPanel } from './catalog-wizard-panel';
import { CatalogWizardTable } from './catalog-wizard-table';
import { CATALOG_WIZARD_FEATURE } from './catalog-wizard.routes';
import { useCatalogWizard } from './use-catalog-wizard';

export function CatalogWizardPage() {
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
  } = useCatalogWizard();

  return (
    <section
      className="feature-page"
      data-testid={CATALOG_WIZARD_FEATURE.testId}
    >
      <CatalogWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <CatalogWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <CatalogWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <CatalogWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default CatalogWizardPage;
