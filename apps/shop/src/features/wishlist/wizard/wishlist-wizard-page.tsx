import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { WishlistWizardFilters } from './wishlist-wizard-filters';
import { WishlistWizardHeader } from './wishlist-wizard-header';
import { WishlistWizardPanel } from './wishlist-wizard-panel';
import { WishlistWizardTable } from './wishlist-wizard-table';
import { WISHLIST_WIZARD_FEATURE } from './wishlist-wizard.routes';
import { useWishlistWizard } from './use-wishlist-wizard';

export function WishlistWizardPage() {
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
  } = useWishlistWizard();

  return (
    <section
      className="feature-page"
      data-testid={WISHLIST_WIZARD_FEATURE.testId}
    >
      <WishlistWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <WishlistWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <WishlistWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <WishlistWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default WishlistWizardPage;
