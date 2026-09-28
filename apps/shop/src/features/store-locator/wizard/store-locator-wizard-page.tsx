import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistOverviewSummary } from '../../wishlist/overview/wishlist-overview-summary';
import { StoreLocatorWizardFilters } from './store-locator-wizard-filters';
import { StoreLocatorWizardHeader } from './store-locator-wizard-header';
import { StoreLocatorWizardPanel } from './store-locator-wizard-panel';
import { StoreLocatorWizardTable } from './store-locator-wizard-table';
import { STORE_LOCATOR_WIZARD_FEATURE } from './store-locator-wizard.routes';
import { useStoreLocatorWizard } from './use-store-locator-wizard';

export function StoreLocatorWizardPage() {
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
  } = useStoreLocatorWizard();

  return (
    <section
      className="feature-page"
      data-testid={STORE_LOCATOR_WIZARD_FEATURE.testId}
    >
      <StoreLocatorWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <StoreLocatorWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <StoreLocatorWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <StoreLocatorWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <WishlistOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default StoreLocatorWizardPage;
