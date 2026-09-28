import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AddressesDetailsSummary } from '../../addresses/details/addresses-details-summary';
import { GiftCardsSettingsFilters } from './gift-cards-settings-filters';
import { GiftCardsSettingsHeader } from './gift-cards-settings-header';
import { GiftCardsSettingsPanel } from './gift-cards-settings-panel';
import { GiftCardsSettingsTable } from './gift-cards-settings-table';
import { GIFT_CARDS_SETTINGS_FEATURE } from './gift-cards-settings.routes';
import { useGiftCardsSettings } from './use-gift-cards-settings';

export function GiftCardsSettingsPage() {
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
  } = useGiftCardsSettings();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_SETTINGS_FEATURE.testId}
    >
      <GiftCardsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AddressesDetailsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsSettingsPage;
