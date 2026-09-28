import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { InventoryWizardFilters } from './inventory-wizard-filters';
import { InventoryWizardHeader } from './inventory-wizard-header';
import { InventoryWizardPanel } from './inventory-wizard-panel';
import { InventoryWizardTable } from './inventory-wizard-table';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';
import { useInventoryWizard } from './use-inventory-wizard';

export function InventoryWizardPage() {
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
  } = useInventoryWizard();

  return (
    <section
      className="feature-page"
      data-testid={INVENTORY_WIZARD_FEATURE.testId}
    >
      <InventoryWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <InventoryWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <InventoryWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <InventoryWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default InventoryWizardPage;
