import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsSummarySummary } from '../../reviews/summary/reviews-summary-summary';
import { ReturnsSettingsFilters } from './returns-settings-filters';
import { ReturnsSettingsHeader } from './returns-settings-header';
import { ReturnsSettingsPanel } from './returns-settings-panel';
import { ReturnsSettingsTable } from './returns-settings-table';
import { RETURNS_SETTINGS_FEATURE } from './returns-settings.routes';
import { useReturnsSettings } from './use-returns-settings';

export function ReturnsSettingsPage() {
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
  } = useReturnsSettings();

  return (
    <section
      className="feature-page"
      data-testid={RETURNS_SETTINGS_FEATURE.testId}
    >
      <ReturnsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReturnsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReturnsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReturnsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default ReturnsSettingsPage;
