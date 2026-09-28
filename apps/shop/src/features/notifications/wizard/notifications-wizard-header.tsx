import { FormsCard } from '../../../components/forms/card/forms-card';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';

export interface NotificationsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{NOTIFICATIONS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_WIZARD_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsCard label="Items" value={count} tone="info" />
        <FormsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
