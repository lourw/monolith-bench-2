import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import { AUTH_WIZARD_FEATURE } from './auth-wizard.routes';

export interface AuthWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_WIZARD_FEATURE.domain} · {AUTH_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackTile label="Items" value={count} tone="info" />
        <FeedbackTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
