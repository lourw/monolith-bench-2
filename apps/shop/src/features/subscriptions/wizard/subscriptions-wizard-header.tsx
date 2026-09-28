import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import { SUBSCRIPTIONS_WIZARD_FEATURE } from './subscriptions-wizard.routes';

export interface SubscriptionsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_WIZARD_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBadge label="Items" value={count} tone="info" />
        <FormsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
