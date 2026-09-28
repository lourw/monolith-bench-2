import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { FeedbackSettingsFilters } from './feedback-settings-filters';
import { FeedbackSettingsHeader } from './feedback-settings-header';
import { FeedbackSettingsPanel } from './feedback-settings-panel';
import { FeedbackSettingsTable } from './feedback-settings-table';
import { FEEDBACK_SETTINGS_FEATURE } from './feedback-settings.routes';
import { useFeedbackSettings } from './use-feedback-settings';

export function FeedbackSettingsPage() {
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
  } = useFeedbackSettings();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_SETTINGS_FEATURE.testId}
    >
      <FeedbackSettingsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackSettingsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackSettingsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackSettingsPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedbackSettingsPage;
