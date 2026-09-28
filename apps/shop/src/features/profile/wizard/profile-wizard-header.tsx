import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';

export interface ProfileWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_WIZARD_FEATURE.domain} · {PROFILE_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackHeader label="Items" value={count} tone="info" />
        <FeedbackHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
