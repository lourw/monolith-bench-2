import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { NotificationsSummarySummary } from '../summary/notifications-summary-summary';
import { NotificationsWizardFilters } from './notifications-wizard-filters';
import { NotificationsWizardHeader } from './notifications-wizard-header';
import { NotificationsWizardPanel } from './notifications-wizard-panel';
import { NotificationsWizardTable } from './notifications-wizard-table';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';
import { useNotificationsWizard } from './use-notifications-wizard';

export function NotificationsWizardPage() {
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
  } = useNotificationsWizard();

  return (
    <section
      className="feature-page"
      data-testid={NOTIFICATIONS_WIZARD_FEATURE.testId}
    >
      <NotificationsWizardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <NotificationsWizardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <NotificationsWizardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <NotificationsWizardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <NotificationsSummarySummary compact />
        </div>
      </div>
    </section>
  );
}

export default NotificationsWizardPage;
