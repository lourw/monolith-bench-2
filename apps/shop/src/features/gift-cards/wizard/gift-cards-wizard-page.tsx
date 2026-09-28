import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsWizardFilters } from './gift-cards-wizard-filters';
import { GiftCardsWizardHeader } from './gift-cards-wizard-header';
import { GiftCardsWizardPanel } from './gift-cards-wizard-panel';
import { GiftCardsWizardTable } from './gift-cards-wizard-table';
import { GIFT_CARDS_WIZARD_FEATURE } from './gift-cards-wizard.routes';
import { useGiftCardsWizard } from './use-gift-cards-wizard';

export function GiftCardsWizardPage() {
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
  } = useGiftCardsWizard();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_WIZARD_FEATURE.testId}
    >
      <GiftCardsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsWizardPage;
