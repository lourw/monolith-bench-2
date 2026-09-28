import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ReviewsSettingsFilters } from './reviews-settings-filters';
import { ReviewsSettingsHeader } from './reviews-settings-header';
import { ReviewsSettingsPanel } from './reviews-settings-panel';
import { ReviewsSettingsTable } from './reviews-settings-table';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';
import { useReviewsSettings } from './use-reviews-settings';

export function ReviewsSettingsPage() {
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
  } = useReviewsSettings();

  return (
    <section
      className="feature-page"
      data-testid={REVIEWS_SETTINGS_FEATURE.testId}
    >
      <ReviewsSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <ReviewsSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <ReviewsSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <ReviewsSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReviewsSettingsPage;
